import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Category, ErrorResponse, Post } from "@types";
import { APIPost } from "./types";

const filePath = path.join(process.cwd(), "blog.json");

type PostsResponse = {
  posts: Post[];
  next: boolean;
  prev: boolean;
  totalPages: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse | ErrorResponse>
) {
  const queryCategories =
    typeof req.query["category[]"] === "string"
      ? [req.query["category[]"]]
      : (req.query["category[]"] as string[]) ?? [];
  const searchText = req.query.searchText;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(fileContents);

    const categories: Category[] = json.categories ?? [];

    // We use category slugs in query params for more friendly URLs
    const categoryIds = categories
      .filter((category) => queryCategories.includes(category.slug))
      .map((category) => category.id);

    let posts: APIPost[] = json.posts ?? [];
    if (queryCategories.length > 0) {
      posts = posts.filter((post) =>
        post.categories.every((category) => categoryIds.includes(category))
      );
    }

    if (searchText?.length) {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toString().toLowerCase())
      );
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedPosts = posts.slice(start, end);

    const paginatedMappedPosts = paginatedPosts.map((apiPost) => {
      const postCategories = categories.filter((category) =>
        apiPost.categories.includes(category.id)
      );
      return {
        ...apiPost,
        categories: postCategories,
      };
    });

    return res.status(200).json({
      posts: paginatedMappedPosts,
      next: page * perPage < posts.length,
      prev: start > 0,
      totalPages: Math.ceil(posts.length / perPage),
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
