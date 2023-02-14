import { Category } from '@types';
import axios from '@utils/axios';
import { useQuery } from 'react-query';

const CATEGORIES_ENDPOINT = 'categories';

export const getCategoriesQueryKey = () => [CATEGORIES_ENDPOINT];

export const fetchCategories = async () => {
  const { data: categories } = await axios.get(CATEGORIES_ENDPOINT);
  return categories;
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: getCategoriesQueryKey(),
    queryFn: fetchCategories,
  });
};
