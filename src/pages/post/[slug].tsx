import { Error } from "@components/Error";
import { CategoriesMenu } from "@features/Posts/components/CategoriesMenu/CategoriesMenu";
import { CategoriesMenuSkeleton } from "@features/Posts/components/CategoriesMenu/CategoriesMenu.skeleton";
import { useCategories } from "@features/Posts/hooks/useCategories";
import { SinglePostView } from "@features/Posts/views/SinglePostView";
import { fetchPost, getPostQueryKey, usePost } from "@hooks/usePost";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";

export default function PostPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { data: post, isLoading } = usePost(slug);

  const {
    data: availableCategories,
    isLoading: areCategoriesLoading,
    isError,
  } = useCategories();

  if (!post && isError) {
    return <div className="text-red-500">{isError}</div>;
  }

  if (!post) {
    return (
      <Error>
        Post does not exist.
        <br />
        <Link href="/posts">Return to browse posts</Link>
      </Error>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={`Blog post: ${post.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="flex flex-col md:flex-row max-w-[1200px] mx-auto">
          <aside className="p-4 w-full md:w-[250px] shrink-0">
            {areCategoriesLoading && !availableCategories && (
              <CategoriesMenuSkeleton />
            )}
            {!areCategoriesLoading && availableCategories && (
              <CategoriesMenu categories={availableCategories} />
            )}
          </aside>

          <div className="p-4">
            <SinglePostView post={post} isLoading={isLoading} />
          </div>
        </div>
      </>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  const queryClient = new QueryClient();

  if (typeof slug === "string") {
    await queryClient.prefetchQuery(getPostQueryKey(slug), () =>
      fetchPost(slug)
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
