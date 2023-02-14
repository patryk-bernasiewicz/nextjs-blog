import clsx from 'clsx';

export type PostExcerptSkeletonProps = {
  className?: string;
};

export const PostExcerptSkeleton = ({
  className,
}: PostExcerptSkeletonProps) => (
  <div className={clsx('w-full animate-pulse space-y-2', className)}>
    <div className="h-32 bg-gray-200" />
    <div className="h-7 w-[70%] bg-gray-200" />
    <div className="h-5 w-1/3 bg-gray-200" />
    <div className="h-12 bg-gray-200" />
    <div className="sr-only">Loading post...</div>
  </div>
);
