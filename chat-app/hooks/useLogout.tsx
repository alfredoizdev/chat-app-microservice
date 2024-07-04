import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/authActions";
import { useUserStore } from "@/store/userStore";

const useLogout = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setUiLoading = useUIStore((state) => state.setUiLoading);

  const router = useRouter();

  const handleLogout = async () => {
    setUiLoading(true);
    try {
      await logoutAction();
      localStorage.removeItem("token");
      setCurrentUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("error ====>", error);
    } finally {
      setUiLoading(false);
    }
  };

  return {
    handleLogout,
  };
};

export default useLogout;
