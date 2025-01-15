"use client";

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";


interface AuthProviderProps {
    children: ReactNode
};

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default AuthProvider;