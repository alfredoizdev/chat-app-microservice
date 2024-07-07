export type Chat = {
  senderId: string;
  receiverId: string;
  lastSenderId: string;
  message: string;
  type: string;
  createdAt?: string;
};

export type Unread = {
  senderId: string;
  receiverId: string;
  unreadReceived: number;
  unreadSender: number;
  createdAt?: string;
  id?: string;
};
