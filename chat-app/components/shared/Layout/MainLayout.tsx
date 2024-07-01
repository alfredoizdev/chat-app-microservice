import useAuth from "@/hooks/useAuth";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
  useAuth();

  return <div>{children}</div>;
};

export default MainLayout;
