import History, { IHistory } from "../models/History";

const storeMsgController = async (message: IHistory): Promise<void> => {
  try {
    const newMessage = new History(message);
    await newMessage.save();
  } catch (error) {
    console.error("Failed to store message in the database", error);
  }
};

export default storeMsgController;
