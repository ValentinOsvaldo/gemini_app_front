import { vueMiniApi } from '@/api';
import type { Chat } from '../interfaces/chat.interface';

export const getChatsActions = async () => {
  const { data } = await vueMiniApi.get<Chat[]>('/chat');

  return data;
};
