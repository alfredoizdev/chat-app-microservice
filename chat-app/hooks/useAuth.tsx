import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URI}/verify`,
          {
            token,
          }
        );

        if (response.status !== 200) {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error(error);
        router.push("/auth/login");
      }
    };

    verifyToken();
  }, []);
};

export default useAuth;
