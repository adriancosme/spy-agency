import { Client } from 'pg';
import { data } from './data/hitmen.data';
import { config } from 'dotenv';
config();
async function initialSeed() {
  const client = new Client({
    user: process.env.TYPEORM_USERNAME,
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    password: process.env.TYPEORM_PASSWORD,
    port: Number(process.env.TYPEORM_PORT),
  });
  await client.connect();
  try {
    await client.query('BEGIN');
    for (const hitman of data) {
      const query = `INSERT INTO hitman (id, name, email, password, role, status, "managedById") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [
        hitman.id,
        hitman.name,
        hitman.email,
        hitman.password,
        hitman.role,
        hitman.status,
        hitman.managedBy?.id,
      ];
      await client.query(query, values);
    }
    await client.query('COMMIT');
    console.log('Seed completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    await client.end();
  }
}
initialSeed();
