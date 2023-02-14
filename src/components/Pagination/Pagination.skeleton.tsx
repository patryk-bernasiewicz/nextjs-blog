import clsx from 'clsx';

export type PaginationSkeletonProps = {
  className?: string;
};

export const PaginationSkeleton = ({ className }: PaginationSkeletonProps) => (
  <div className={clsx('my-2 flex justify-center animate-pulse', className)}>
    <div className="w-1/2 h-6 min-w-[100px] ma-w-[450px] bg-gray-200" />
  </div>
);
