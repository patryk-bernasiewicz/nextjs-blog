import { Post } from '@types';

export type APIPost = Omit<Post, 'categories'> & {
  categories: number[];
};
