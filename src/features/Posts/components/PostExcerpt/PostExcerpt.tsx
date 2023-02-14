import Image from "next/image";
import { Post } from "@types";
import clsx from "clsx";
import Link from "next/link";

const classes = {
  wrapper:
    "bg-gray-50 hover:bg-white focus:bg-white shadow-lg hover:shadow-2xl focus:shadow-2xl rounded-lg overflow-hidden",
  content: "p-4 pb-6",
  title: "font-bold text-lg",
  categories: "text-gray-600 text-sm font-medium my-2 space-x-2",
  category: "text-cyan-600 hover:text-cyan-500 focus:text-cyan-500",
};

export type PostExcerptProps = {
  className?: string;
  post: Post;
  onCategoryChange: (category: string) => void;
};

export const PostExcerpt = ({
  className,
  post,
  onCategoryChange,
}: PostExcerptProps) => {
  const { title, excerpt, imageUrl, categories, slug } = post;
  const postPath = `/post/${slug}`;

  return (
    <article className={clsx(classes.wrapper, className)}>
      <Link href={postPath}>
        <Image alt={title} src={imageUrl} width={800} height={600} />
      </Link>
      <div className={classes.content}>
        <h1 className={classes.title}>
          <Link href={postPath}>{title}</Link>
        </h1>
        <div className={classes.categories}>
          {categories.map((category) => (
            <button
              type="button"
              className={classes.category}
              onClick={() => onCategoryChange(category.slug)}
              key={category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
        <p>{excerpt}</p>
      </div>
    </article>
  );
};
