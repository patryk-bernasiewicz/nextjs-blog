import { render, screen } from '@testing-library/react';
import { Pagination, PaginationProps } from './Pagination';

describe('Pagination component', () => {
  const getPathFn = jest.fn(() => '/fake-path');
  const defaultProps: PaginationProps = {
    totalPages: 5,
    currentPage: 1,
    getPathFn,
  };

  it('renders without crashing', () => {
    render(<Pagination {...defaultProps} />);
  });

  it('renders valid amount of links', () => {
    render(<Pagination {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(5);
  });

  it('renders links with valid href', () => {
    render(<Pagination {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/fake-path');
  });
});
