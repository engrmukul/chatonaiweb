// app/page.js
'use client';
import Login from "./components/auth/Login";
import AuthLayout from "./components/shared/AuthLayout";

export default function Home() {

    return (
        <AuthLayout authRequire={false} >
            <Login />
        </AuthLayout>

    );
}
