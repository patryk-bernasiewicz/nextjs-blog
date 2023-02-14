import { Post } from "@types";
import axios from "@utils/axios";
import { useQuery } from "react-query";

export const getPostQueryKey = (slug: string) => ["post", slug];

export const fetchPost = async (slug: string) => {
  const res = await axios.get<Post>("post", {
    params: {
      slug,
    },
  });

  console.log("=== res.data: ", res.data);

  return res.data;
};

export const usePost = (slug: string) => {
  return useQuery<any>(getPostQueryKey(slug), () => fetchPost(slug));
};
