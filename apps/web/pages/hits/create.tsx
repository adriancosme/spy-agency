import { Box, Button, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import styles from "../../styles/login.module.css";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { useRouter } from "next/router";
interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}
export default function CreateHitPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitHandler = (data: FormData) => {
    console.log(data);
  };

  const router = useRouter();

  return (
    <AuthLayout title="Create new hit">
      <Box className={styles.pageContainer}>
        <Typography variant="h1" component="h1">
          Create new hit
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
          <Select
            name="role"
            placeholder="Select your role"
            error={!!errors.role}
            defaultValue={"HITMAN"}
            {...register("role", {
              required: "This field is required",
            })}
          >
            <MenuItem value={"HITMAN"}>Hitman</MenuItem>
            <MenuItem value={"MANAGER"}>Manager</MenuItem>
            <MenuItem value={"BOSS"}>Boss</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ "&:hover": { color: "black" } }}
          >
            Create
          </Button>
          <Button
            onClick={() => {
              router.push("/hits");
            }}
            variant="contained"
            color="secondary"
            type="button"
            sx={{ "&:hover": { color: "black" } }}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
}
