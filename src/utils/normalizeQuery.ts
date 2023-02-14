export const normalizeQuery = (query: Record<string, unknown>) => {
  const normalizedQuery = Object.entries(query).reduce(
    (currentQuery, [key, value]) => {
      if (!value || (typeof value === "string" && !value.length)) {
        return currentQuery;
      }
      return {
        ...currentQuery,
        [key]: value,
      };
    },
    {}
  );
  return normalizedQuery;
};
