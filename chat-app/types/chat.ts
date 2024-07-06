export type Chat = {
  senderId: string;
  receiverId: string;
  lastSenderId: string;
  message: string;
  type: string;
  createdAt?: string;
};
