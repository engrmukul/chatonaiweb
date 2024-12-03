"use client";
import { Container } from "@mui/system";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import axios from "../library/axios/axios";
import { endpoints } from "../library/share/endpoints";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });
  const router = useRouter();
  const password = watch("password");

  const handleSignup = async (data: FormData) => {
    try {
      const response = await axios.post(endpoints.signUp, data);
      localStorage.setItem("authToken", response.data.authToken);
      router.push("/app/chats");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSignup)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("firstName", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoComplete="given-name"
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName && "First Name is required"}
          />
          <TextField
            {...register("lastName", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            error={!!errors.lastName}
            helperText={errors.lastName && "Last Name is required"}
          />
          <TextField
            {...register("phoneNumber")}
            variant="outlined"
            margin="normal"
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            autoComplete="tel"
          />
          <TextField
            {...register("email", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email && "Email is required"}
          />
          <TextField
            {...register("password", { required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && "Password is required"}
          />
          <TextField
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isValid}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link href={"/"}>{"Already have an account? Sign In"}</Link>
        </Box>
      </Box>
    </Container>
  );
}
