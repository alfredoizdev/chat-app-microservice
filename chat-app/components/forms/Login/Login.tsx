"use client";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import Button from "@/components/shared/Button/Button";

import styles from "./Login.module.scss";
import useLogin from "@/hooks/useLogin";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { onSubmit } = useLogin();

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
              <span className={styles.error}>Email is required</span>
            )}
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;