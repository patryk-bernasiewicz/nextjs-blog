import path from 'path';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category, ErrorResponse } from '@types';

const filePath = path.join(process.cwd(), 'blog.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[] | ErrorResponse>
) {
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const { categories } = JSON.parse(fileContents);

    res.status(200).json(categories as Category[]);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
