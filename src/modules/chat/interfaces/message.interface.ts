export interface Message {
  id: string;
  content: string;
  type: From;
}

export enum From {
  USER = 'user',
  AI = 'ai',
}
