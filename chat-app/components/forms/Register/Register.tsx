"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import Button from "@/components/shared/Button/Button";

import { RegisterValues } from "@/types/auth";

import useRegister from "@/hooks/useRegister";

import styles from "./Register.module.scss";

const Register = () => {
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { onSubmit, loading } = useRegister();

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
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Sing Up</h1>
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
            {errors?.password && (
              <span className={styles.error}>Email is required</span>
            )}
          </div>
          <div className="formGroup">
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
            />
            {errors?.username && (
              <span className={styles.error}>Username is required</span>
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
            <Link className={styles.link} href="/auth/login">
              Already have an account? Login
            </Link>
          </div>
          <Button loading={loading} type="submit">
            Sing Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
