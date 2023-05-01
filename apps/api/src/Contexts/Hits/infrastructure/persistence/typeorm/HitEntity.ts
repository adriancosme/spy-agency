import { EntitySchema } from "typeorm";
import { Hit, HitId } from "../../../domain";
import { ValueObjectTransformer } from "../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer";

export const HitEntity = new EntitySchema<Hit>({
  name: 'Hit',
  tableName: 'hits',
  target: Hit,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(HitId),
    },
    description: {
      type: String
    },
    target: {
      type: String
    },
    status: {
      type: String
    }
  },
  relations: {
    assignedTo: {
      type: "many-to-one",
      target: "hitmen",
    },
    createdBy: {
      type: "many-to-one",
      target: "hitmen"
    }
  }
})
