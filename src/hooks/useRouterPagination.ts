import { useRouter } from "next/router";
import { useCallback } from "react";

export const useRouterPagination = (basePath = "") => {
  const router = useRouter();
  const {
    query: { page: _page, perPage: _perPage },
  } = router;
  const page = Number(_page) ?? 1;
  const perPage = Number(_perPage) ?? 10;

  const getPaginationPath = useCallback((page: number) => {
    const { search } = router.query;
    const params = new URLSearchParams(
      Array.isArray(search) ? [search] : search
    );
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  }, []);

  return { getPaginationPath, page, perPage };
};
