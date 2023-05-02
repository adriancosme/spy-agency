import { FC, ReactNode } from "react";
import Head from 'next/head';
import styles from '../../styles/auth-layout.module.css'
import Navbar from "../ui/Navbar";

interface Props {
  title: string;
  children: ReactNode
}

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>

      <nav>
        <Navbar />
      </nav>

      <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
        <div className={styles.layoutContainer}>
          { children }
        </div>
      </main>

    </>
  )
}
