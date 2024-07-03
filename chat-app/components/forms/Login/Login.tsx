"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import Button from "@/components/shared/Button/Button";

import styles from "./Login.module.scss";
import useLogin from "@/hooks/useLogin";
import { AuthValues } from "@/types/auth";

const Login = () => {
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { onSubmit, loading } = useLogin();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="formGroup">
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <span className={styles.error}>Email is required</span>
            )}
          </div>
          <div className="formGroup">
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <span className={styles.error}>Password is required</span>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Link className={styles.link} href="/auth/register">
              Don't have an account? Register
            </Link>
          </div>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
