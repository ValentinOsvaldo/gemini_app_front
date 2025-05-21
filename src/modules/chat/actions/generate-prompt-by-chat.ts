import { vueMiniApi } from '@/api';

export interface GeneratePromptResponse {
  text: string;
}

export const generatePromptById = async (id: string, prompt: string) => {
  const { data } = await vueMiniApi.post<GeneratePromptResponse>(`/chat/${id}`, {
    prompt,
  });

  return data;
};
