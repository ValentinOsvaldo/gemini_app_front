import { vueMiniApi } from '@/api';
import type { Message } from '../interfaces/message.interface';

export const getMessagesById = async (id: string) => {
  const { data } = await vueMiniApi.get<Message[]>(`/chat/messages/${id}`);

  return data;
};
