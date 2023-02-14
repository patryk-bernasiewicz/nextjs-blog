import { Post } from "@types";
import axios from "@utils/axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export type GetPostsParams = {
  page: number;
  perPage: number;
  category?: null | string[];
  searchText?: string;
};

const QUERY_KEY = "posts";

export const getPostsQueryKey = (params: GetPostsParams) => {
  const { page, perPage, category, searchText } = params;
  return [QUERY_KEY, page, perPage, category, searchText];
};

export const fetchPosts = (params: GetPostsParams) => async () => {
  const { data: posts } = await axios.get(QUERY_KEY, { params });
  return posts;
};

export const usePaginatedPosts = (params: GetPostsParams) => {
  const [totalPages, setTotalPages] = useState(1);

  const { data, ...rest } = useQuery<{
    posts: Post[];
    next: boolean;
    prev: boolean;
    totalPages: number;
  }>(getPostsQueryKey(params), fetchPosts(params), {
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    setTotalPages(data?.totalPages ?? 1);
  }, [totalPages, data]);

  return {
    data,
    totalPages,
    ...rest,
  };
};
