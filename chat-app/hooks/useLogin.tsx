import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import axios from "axios";
import { loginAction } from "@/actions/authActions";

type FormValues = {
  email: string;
  password: string;
};

const useLogin = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await loginAction(data);

    const { error, token } = response;

    if (error) {
      console.log("error", error);

      toast.error(error, {
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    }

    if (token && token !== null) {
      console.log("token", token);
      localStorage.setItem("token", token);
      router.push("/");
    }
  };

  return {
    onSubmit,
  };
};

export default useLogin;
