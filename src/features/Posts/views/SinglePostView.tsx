import { Post } from "@types";
import Image from "next/image";
import { useRouter } from "next/router";
import { PostExcerptSkeleton } from "../components/PostExcerpt/PostExcerpt.skeleton";

const classes = {
  image: "object-cover object-center w-full aspect-video",
  button:
    "inline-flex justify-center items-center my-2 px-4 py-2 border border-cyan-500 font-bold text-cyan-500 hover:text-cyan-600 hover:border-cyan-600",
  title: "text-xl font-bold",
  excerpt: "text-lg",
};

type SinglePostViewProps = {
  isLoading?: boolean;
  post?: Post;
};

export const SinglePostView = ({ isLoading, post }: SinglePostViewProps) => {
  const router = useRouter();

  if (!post && isLoading) {
    return <PostExcerptSkeleton />;
  }

  if (!post) {
    router.push("/posts");
    return null;
  }

  return (
    <div>
      <Image
        alt={post.title}
        src={post.imageUrl}
        width={800}
        height={600}
        className={classes.image}
      />
      <button
        type="button"
        className={classes.button}
        onClick={() => history.back()}
      >
        Go back
      </button>
      <h1 className={classes.title}>{post.title}</h1>
      <p className={classes.excerpt}>{post.excerpt}</p>
    </div>
  );
};
