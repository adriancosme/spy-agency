import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/Auth";
import styles from "../styles/login.module.css";
import { validations } from "../utils";
import Link from "next/link";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = async ({ name, email, password }: FormData) => {
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    toast.success("Successfully registered");
    toast.loading("Login with your credentials...");
    setTimeout(async () => {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/hits",
      });
      toast.dismiss();
      toast.success("Successfully logged in");
      toast.dismiss();
      toast.success("Redirecting to home page");
      toast.dismiss();
      return;
    }, 3000);
  };
  return (
    <Box className={styles.pageContainer}>
      <Typography variant="h1" component="h1">
        Register Page
      </Typography>
      <form
        noValidate
        className={styles.formContainer}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          name="name"
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: "This field is required",
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        ></TextField>
        <TextField
          name="email"
          type="email"
          placeholder="Enter your email address"
          {...register("email", {
            required: "This field is required",
            validate: validations.isEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        ></TextField>
        <TextField
          name="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 6, message: "Minimum 8 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ "&:hover": { color: "black" } }}
        >
          Register
        </Button>
        <Link href="/">Already have an account?</Link>
      </form>
    </Box>
  );
}
