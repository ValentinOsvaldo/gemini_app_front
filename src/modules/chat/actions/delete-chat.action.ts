import { vueMiniApi } from '@/api';

export const deleteChatAction = async (chatId: string) => {
  const { data } = await vueMiniApi.delete(`/chat/${chatId}`);

  return data;
};
