'use client'

import { createActorContext } from '@xstate/react'

import { searchMachine } from '@/store/search/search.machine'

export const SearchMachineContext = createActorContext(searchMachine)
export const SearchMachineProvider = SearchMachineContext.Provider
export const useSearchActor = SearchMachineContext.useActor
export const useSearchSelector = SearchMachineContext.useSelector
