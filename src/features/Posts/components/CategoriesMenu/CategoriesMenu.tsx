import { Category } from "@types";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

const buttonClasses = {
  default:
    "text-green-700 hover:text-green-600 focus:text-green-600 bg-green-500/20 hover:bg-green-500/10 focus:bg-green-500/10 border-green-400",
  active:
    "text-red-700 hover:text-red-400 focus:text-red-400 bg-red-500/20 hover:bg-red-500/10 focus:bg-red-500/10 border-red-400 hover:border-red-300 focus:border-red-300",
};

const classes = {
  list: "my-2 space-y-1",
  toggle:
    "ml-2 w-4 h-4 pb-1 font-bold inline-flex justify-center items-center border rounded",
  link: "text-cyan-600 hover:text-cyan-500 focus:text-cyan-500 font-bold",
};

export type CategoriesMenuProps = {
  categories: Category[];
  onToggleCategory?: (slug: string) => void;
};

export const CategoriesMenu = ({
  categories,
  onToggleCategory,
}: CategoriesMenuProps) => {
  const router = useRouter();
  const { category } = router.query;
  const queryCategories = (category as string[]) ?? [];

  return (
    <ul className={classes.list}>
      {categories.map((category) => {
        const isActive = queryCategories.indexOf(category.slug) > -1;

        return (
          <li key={category.id}>
            <Link className={classes.link} href={`/posts/${category.slug}`}>
              {category.name}
            </Link>
            {onToggleCategory && queryCategories.length > 0 && (
              <button
                type="button"
                onClick={() => onToggleCategory(category.slug)}
                className={twMerge(
                  buttonClasses.default,
                  isActive && buttonClasses.active,
                  classes.toggle
                )}
              >
                {isActive ? "-" : "+"}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
