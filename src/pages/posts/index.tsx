import { SearchForm } from "@components/SearchForm/SearchForm";
import { CategoriesMenu } from "@features/Posts/components/CategoriesMenu/CategoriesMenu";
import { CategoriesMenuSkeleton } from "@features/Posts/components/CategoriesMenu/CategoriesMenu.skeleton";
import { useCategories } from "@features/Posts/hooks/useCategories";
import {
  fetchPosts,
  GetPostsParams,
  getPostsQueryKey,
  usePaginatedPosts,
} from "@features/Posts/hooks/usePaginatedPosts";
import { PostsView } from "@features/Posts/views/PostsView";
import { useRouterPagination } from "@hooks/useRouterPagination";
import { Post } from "@types";
import { normalizeQuery } from "@utils/normalizeQuery";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";

export default function Posts() {
  const router = useRouter();
  const searchText = (router.query.searchText as string) ?? undefined;
  const category = (router.query.category as string[]) ?? [];
  const { page, perPage } = useRouterPagination(`/posts/${category.join("/")}`);
  const { data, totalPages, isLoading } = usePaginatedPosts({
    page,
    perPage,
    category,
    searchText,
  });
  const posts = data?.posts ?? [];

  const { data: availableCategories, isLoading: areCategoriesLoading } =
    useCategories();

  const handleSearch = (inputText: string) => {
    if (router.query.searchText === inputText) {
      return;
    }

    router.replace({
      query: normalizeQuery({
        ...router.query,
        searchText: inputText,
      }),
    });
  };

  const pushCategoryRoute = (categories: string[]) => {
    router.push(`/posts/${categories.join("/")}${window.location.search}`);
  };

  const handleCategoryToggle = (categorySlug: string) => {
    const existingIndex = category.indexOf(categorySlug);
    if (existingIndex > -1) {
      pushCategoryRoute([
        ...category.slice(0, existingIndex),
        ...category.slice(existingIndex + 1),
      ]);
    } else {
      pushCategoryRoute([...category, categorySlug]);
    }
  };

  const handleCategoryUpdate = (categorySlug: string) => {
    const updatedCategories = Array.from(new Set([...category, categorySlug]));
    pushCategoryRoute(updatedCategories);
  };

  return (
    <>
      <Head>
        <title>Browse posts | Blog</title>
        <meta name="description" content="Browse posts available to read" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto">
        <aside className="p-4 w-full md:w-[250px] shrink-0">
          <SearchForm onSearch={handleSearch} />

          {areCategoriesLoading && !availableCategories && (
            <CategoriesMenuSkeleton />
          )}
          {!areCategoriesLoading && availableCategories && (
            <CategoriesMenu
              categories={availableCategories}
              onToggleCategory={handleCategoryToggle}
            />
          )}
        </aside>

        <div className="p-4">
          <h1 className="text-center text-2xl font-bold my-2">From the blog</h1>
          <p className="text-lg mb-8">
            Lorem ipsum, dolor sit ameat consectetur adipisicing elit.
            Consequuntur eius quas cumque accusamus labore.
          </p>
          <PostsView
            posts={posts}
            category={category}
            postsPages={totalPages}
            onCategoryUpdate={handleCategoryUpdate}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) ?? 1;
  const perPage = Number(context.query.perPage) ?? 10;
  const searchText = (context.query.searchText as string) ?? "";
  const category = (context.query.category as string[]) ?? [];
  const queryClient = new QueryClient();

  const params: GetPostsParams = { page, perPage, category, searchText };
  await queryClient.fetchQuery<{
    posts: Post[];
    next: boolean;
    prev: boolean;
    totalPages: number;
  }>(getPostsQueryKey(params), fetchPosts(params), {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
