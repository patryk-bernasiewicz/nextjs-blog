import clsx from "clsx";
import Link from "next/link";

const classes = {
  list: "flex justify-center items-center space-x-2 my-3",
  link: "bg-gray-50/70 hover:bg-gray-50 focus:bg-gray-50 rounded-sm text-gray-800 hover:text-gray-600 focus:text-gray-600 w-8 h-8 inline-flex items-center justify-center cursor-pointer",
  linkActive: "bg-gray-50 font-bold text-gray-800",
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPathFn: (page: number) => string;
};

export const Pagination = ({
  currentPage,
  totalPages,
  getPathFn,
}: PaginationProps) => {
  const pages = [...new Array(totalPages)].map((_, index) => index + 1);

  return (
    <ul className={classes.list}>
      {pages.map((page) => {
        const path = getPathFn(page);
        return (
          <li key={page}>
            <Link
              href={path}
              className={clsx(
                classes.link,
                currentPage === page && classes.linkActive
              )}
              shallow
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
