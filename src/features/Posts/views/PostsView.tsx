import { Pagination } from "@components/Pagination/Pagination";
import { PaginationSkeleton } from "@components/Pagination/Pagination.skeleton";
import { useRouterPagination } from "@hooks/useRouterPagination";
import { Post } from "@types";
import { PostExcerpt } from "../components/PostExcerpt/PostExcerpt";
import { PostExcerptSkeleton } from "../components/PostExcerpt/PostExcerpt.skeleton";

const classes = {
  info: "text-lg",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
};

export type PostsViewProps = {
  category: string[];
  posts?: Post[];
  isLoading?: boolean;
  postsPages: number;
  onCategoryUpdate: (category: string) => void;
};

export const PostsView = ({
  category,
  posts,
  isLoading,
  postsPages,
  onCategoryUpdate,
}: PostsViewProps) => {
  const { page, getPaginationPath } = useRouterPagination(
    `/posts/${category.join("/")}`
  );

  if (!posts && isLoading) {
    return (
      <>
        <PaginationSkeleton />
        <div>
          {[...new Array(6)].map((_, index) => (
            <PostExcerptSkeleton key={index} />
          ))}
        </div>
        <PaginationSkeleton />
      </>
    );
  }

  if (!posts) {
    return <div className={classes.info}>No posts found.</div>;
  }

  return (
    <>
      <Pagination
        currentPage={page}
        totalPages={postsPages}
        getPathFn={getPaginationPath}
      />
      <div className={classes.grid}>
        {posts.map((post) => (
          <PostExcerpt
            key={post.id}
            post={post}
            onCategoryChange={onCategoryUpdate}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={postsPages}
        getPathFn={getPaginationPath}
      />
    </>
  );
};
