import { vueMiniApi } from '@/api';

export interface NewChatResponse {
  text: string;
  chat_id: string;
}

export const createChatAction = async (prompt: string) => {
  const { data } = await vueMiniApi.post<NewChatResponse>('/chat/new-chat', {
    prompt,
  });

  return data;
};
