"use client";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/actions/authActions";
import { useUserStore } from "@/store/userStore";

type FormValues = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    try {
      const response = await loginAction(data);

      const { error, token, user } = response;

      if (user) {
        setCurrentUser(user);
      }

      if (error) {
        console.log("error", error);

        toast.error(error, {
          position: "top-right",
          duration: 5000,
          richColors: true,
        });
      }

      if (token && token !== null) {
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      console.error("error ====>", error);
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
  };
};

export default useLogin;
