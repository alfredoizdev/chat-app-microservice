import InputMessage from "@/components/Chat/InputMessage";
import Messages from "@/components/Chat/Messages";
import MainLayout from "@/components/shared/Layout/MainLayout";

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MainLayout>
        <Messages />
        <InputMessage />
      </MainLayout>
    </div>
  );
};

export default RoomPage;
