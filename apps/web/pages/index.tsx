import { Box, Button, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Simulate } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";
import { validations } from "../utils";
import error = Simulate.error;

interface FormData {
  email: string;
  password: string;
}

export default function ({ hasInvalidCredentials }) {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmitHandler = async ({ email, password }: FormData) => {
    try {
      setShowError(false);
      await signIn("credentials", { email, password, callbackUrl: "/hits" });
      await router.push("hits");
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <Box className={styles.pageContainer}>
      <Typography variant="h1" component="h1">
        Login Page
      </Typography>
      <form
        noValidate
        className={styles.formContainer}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          name="email"
          type="email"
          placeholder="Enter your email address"
          {...register("email", {
            required: "This field is required",
            validate: validations.isEmail,
          })}
        ></TextField>
        <TextField
          name="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Minimum 8 characters" },
          })}
        ></TextField>
        {hasInvalidCredentials && (
          <span className="error">Invalid credentials</span>
        )}
        <Button variant="contained" color="primary" type="submit" sx={{ '&:hover': {color: 'black'}}}>
          Login
        </Button>
        <Link href="/register">Dont have an account?</Link>
      </form>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  if (query.error?.includes("CredentialsSignin")) {
    return {
      props: {
        hasInvalidCredentials: true,
      },
    };
  }
  const session = await getSession({ req });
  // console.log({session});

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
