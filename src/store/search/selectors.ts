import { useSearchSelector } from '@/context/search-context'

export const useResultsSelect = () => useSearchSelector((state) => state.context.results)
