import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch search results
const fetchSearchResults = async (value: string) => {
  const { data } = await axios.get(`/api/search?value=${value}`);
  return data;
};

// Hook to use the search query
export const useSearch = (searchValue: string) => {
  return useQuery({
    queryKey: [ searchValue],
    queryFn: () => fetchSearchResults(searchValue),
    enabled: searchValue.length > 0, // More specific condition
    // Don't run query if searchValue is empty or too short
    initialData: [], // Provide initial empty array
    refetchOnWindowFocus: false,
  });
};
