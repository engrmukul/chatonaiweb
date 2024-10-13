"use client";
import theme from "@/app/src/theme";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "../app/globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className + " parent-layout"}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}> {children} </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
