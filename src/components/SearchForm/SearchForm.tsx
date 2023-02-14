import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import SearchIcon from "./search.svg";

const classes = {
  wrapper: "flex flex-col space-y-1",
  inputWrapper: "relative",
  input: "w-full h-10 py-2 px-4 appearance-none",
  icon: "absolute pointer-events-none fill-gray-300 right-4 w-5 h-5 top-[50%] -translate-y-[50%]",
  heading: "font-bold color-gray-500",
};

export type SearchFormProps = {
  debounce?: number;
  onSearch: (searchText: string) => void;
};

export const SearchForm = ({ debounce = 400, onSearch }: SearchFormProps) => {
  const { query, push } = useRouter();
  const [initialText] = Array.isArray(query.searchText)
    ? query.searchText
    : [query.searchText];
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => onSearch(value), debounce);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (immediate) {
      event.preventDefault();
      return;
    }
  };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <label htmlFor="search" className={classes.heading}>
        Search
      </label>
      <div className={classes.inputWrapper}>
        <input
          type="search"
          name="search"
          onChange={handleChange}
          className={classes.input}
          placeholder="Eg. books"
          defaultValue={initialText}
        />
        <SearchIcon className={classes.icon} />
      </div>
    </form>
  );
};
