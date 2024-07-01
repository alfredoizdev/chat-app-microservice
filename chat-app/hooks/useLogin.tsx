import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

type FormValues = {
  email: string;
  password: string;
};

const useLogin = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        toast.error("Invalid email or password", {
          position: "top-right",
          duration: 5000,
          richColors: true,
        });
      }
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    }
  };

  return {
    onSubmit,
  };
};

export default useLogin;
