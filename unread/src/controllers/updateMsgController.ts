import Unread, { IUnread } from "../models/Unread";

const updateUnreadController = async (
  receiverId: string,
  senderId: string
): Promise<void> => {
  try {
    const response = await Unread.findOneAndUpdate(
      { senderId, receiverId },
      { $inc: { unreadReceived: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Failed to store message in the database", error);
  }
};

export default updateUnreadController;
