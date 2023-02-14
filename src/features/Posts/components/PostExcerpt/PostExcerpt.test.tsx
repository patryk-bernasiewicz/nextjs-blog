import { fireEvent, render, screen } from '@testing-library/react';
import { Category, Post } from '@types';
import { PostExcerpt, PostExcerptProps } from './PostExcerpt';

describe('PostExcerpt component', () => {
  const category: Category = {
    id: 1,
    name: 'Fake category',
    slug: 'fake-category',
  };
  const post: Post = {
    id: 1,
    title: 'Lorem ipsum',
    slug: 'lorem-ipsum',
    imageUrl: 'https://picsum.photos/id/238/800/600',
    excerpt: 'Dolor sit amet',
    categories: [category],
  };
  const onCategoryChange = jest.fn();
  const defaultProps: PostExcerptProps = {
    post,
    onCategoryChange,
  };

  it('renders without crashing', () => {
    render(<PostExcerpt {...defaultProps} />);
  });

  it('renders valid title, excerpt and category name', () => {
    render(<PostExcerpt {...defaultProps} />);

    screen.getByText(post.title, { selector: 'a' });
    screen.getByText(post.excerpt);
    screen.getByText(category.name, { selector: 'button' });
  });

  it('invokes `onCategoryChange` on category click', () => {
    render(<PostExcerpt {...defaultProps} />);

    const categoryLink = screen.getByText(category.name);
    fireEvent.click(categoryLink);

    expect(onCategoryChange).toHaveBeenCalledWith(category.slug);
  });
});
