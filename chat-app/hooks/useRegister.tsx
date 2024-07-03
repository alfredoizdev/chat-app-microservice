import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { registerAction } from "@/actions/authActions";

import { RegisterValues } from "@/types/auth";

import { SubmitHandler } from "react-hook-form";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    setLoading(true);

    try {
      const response = await registerAction(data);

      const { error, newUser } = response;

      if (newUser) {
        toast.success("User created successfully you can login now");
        router.push("/auth/login");
      }

      if (error) {
        toast.error(error);
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

export default useRegister;
