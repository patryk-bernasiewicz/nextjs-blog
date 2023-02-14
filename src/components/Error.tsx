import { ReactNode } from "react";

const classes = {
  wrapper: "text-2xl font-bold text-red-500",
};

export type ErrorProps = {
  children?: ReactNode;
};

export const Error = ({ children }: ErrorProps) => (
  <div className={classes.wrapper}>{children ?? "Unknown error."}</div>
);
