'use client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import {Container} from "@mui/system";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {useState} from "react";
import {useForm} from 'react-hook-form';
import axios from "../../library/axios/axios";

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const [loginError, setLoginError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();

    const handleLogin = async (data: FormData) => {
        try {
            console.log('hello')
            const response = await axios.post('http://185.164.111.200:3001/api/auth/signin', data);
            localStorage.setItem('authToken', response.data.token);

            router.push('app/chats');
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Login failed. Please check your email and password.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height:'100vh'
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
                <TextField
                    {...register('email', { required: true })}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    error={!!errors.email}
                    helperText={errors.email && "Email is required"}
                />
                <TextField
                    {...register('password', { required: true })}
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
                {loginError && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {loginError}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Link href={'/signup'}  >
                    {"You dont have an account? Sign Up"}
                </Link>
            </Box>
        </Box>
        </Container>
    );
}
