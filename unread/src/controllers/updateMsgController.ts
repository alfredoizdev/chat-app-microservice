import Unread from "../models/Unread";

const updateUnreadController = async (
  receiverId: string,
  senderId: string
): Promise<void> => {
  try {
    await Unread.findOneAndUpdate(
      { userId: receiverId, conversationWithId: senderId },
      { $inc: { unreadReceived: 1 } },
      { upsert: true, new: true }
    );

    // Update unread sent count for the sender
    await Unread.findOneAndUpdate(
      { userId: senderId, conversationWithId: receiverId },
      { $inc: { unreadSent: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Failed to store message in the database", error);
  }
};

export default updateUnreadController;
