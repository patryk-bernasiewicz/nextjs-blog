import { render, screen } from '@testing-library/react';
import { Category } from '@types';
import { CategoriesMenu, CategoriesMenuProps } from './CategoriesMenu';

jest.mock('next/router', () => ({
  userRouter: jest.fn(),
}));

describe('CategoriesMenu component', () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Fake category',
      slug: 'fake-category',
    },
    {
      id: 2,
      name: 'Other category',
      slug: 'other-category',
    },
  ];
  const onToggleCategory = jest.fn();
  const defaultProps: CategoriesMenuProps = {
    categories,
    onToggleCategory,
  };

  it('renders without crashing', () => {
    render(<CategoriesMenu {...defaultProps} />);
  });

  it('renders available categories as links', () => {
    render(<CategoriesMenu {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(categories.length);
  });
});
