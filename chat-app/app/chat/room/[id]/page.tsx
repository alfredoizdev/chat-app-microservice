import { historyAction } from "@/actions/historyAction";
import InputMessage from "@/components/Chat/InputMessage";
import Messages from "@/components/Chat/Messages";
import MainLayout from "@/components/shared/Layout/MainLayout";

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const receivedId = params.id;
  const history = await historyAction(receivedId);

  return (
    <div>
      <MainLayout>
        <Messages history={history} />
        <InputMessage />
      </MainLayout>
    </div>
  );
};

export default RoomPage;
