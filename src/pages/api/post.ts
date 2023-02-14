import path from 'path';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category, ErrorResponse, Post } from '@types';
import { APIPost } from './types';

const filePath = path.join(process.cwd(), 'blog.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorResponse>
) {
  const { slug } = req.query;

  if (!slug) {
    throw new Error('Invalid slug');
  }

  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(fileContents);

    const posts: APIPost[] = json.posts ?? [];
    const categories: Category[] = json.categories ?? [];

    const postBySlug = posts.find(
      (post) => post.slug.toLowerCase() === slug.toString().toLowerCase()
    );

    if (!postBySlug) {
      return res.status(404).json({ message: 'Not found' });
    }

    const categoryIds = postBySlug.categories?.filter((categoryId) =>
      postBySlug.categories.includes(categoryId)
    );
    const postCategories = categories.filter((category) =>
      categoryIds.includes(category.id)
    );

    const post: Post = {
      ...postBySlug,
      categories: postCategories,
    };

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
