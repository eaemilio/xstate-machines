import { assign, createMachine } from 'xstate'

import { searchByName } from '@/services/nationalize'

export type SearchMachineContext = {
  searchText: string
  results: string[]
  error: string
}

export type SearchMachineEvents =
  | { type: 'search'; searchText?: string }
  | { type: 'reset' }
  | { type: 'cancel' }
  | { type: 'typing'; searchText: string }

export const searchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAQwE4GMAWA6AlhADZgDEKGOA2gAwC6ioADgPaz4Au+LAdoyAA9EAFgCco3KICsUgOzCAHADZZAZmErVAGhABPRAoCMuVQCZTow0uGzxCmlNEBfJzopY8hEqQ66m+HihaBiQQVnYuXn4hBFkjXGEaUyVrJXNRGkNtPUQzWVwpC1lkhVFZByVDKRc3NA9cdxwAqFIIXjACHgA3FgBrDsa8QeaEAJ7MVEieYOD+cM5uPlCY0yrcc1kpFJpxTYVs-QRTVQlVE4VhM1MpG1EFatcQQYa6psDSMHR0FnRcJiJJgAzH4AWxelCGr2wIzGLAmUxm9DmbAWUWWiFWUlwpSMGiUW0M93xOkOhgsCVUUiSUgU9mEx2UNSeUPBHmapAmPEwYCIs1C8ym0VySgk10cFxo8kMNFUsiUJMQWLJMn2SnUVWshlkTOew3eAlgHEmHVQgI4nwAFKoaDaAJTkFl6oJI-kowXoo7CYxVC5WFVJLKyBUIWXGGhe8Q0mRieQ6lmfb7oUjoOBgDh85huxZChBiCTSOSKTQaNTB0yZAoqcrKTWEqxxiG4No8MgplDpl2ZiLZj1F7FxQxlJQKNT4uRlpQ0ApyUz3dQaS6GBv1LggsAsACuHGTqY7IS7qKWoBiUlUSmxhkHcsMYlMNmEwcpU+u0rVKiqD0ePBYEDg-EGyLdmix6IAAtPKOQIKBCimLgV5nKUxyXGYy44AQxBgIBh45viEjSuU4bCDIlQOGW4YFKIarmLSMpnNqjy6lCzRYe6IG5qYwYwXBIqmLIZK4VqqioXgCY-CxPZsSc+RyjBlJxI4SQHIgg5TioFgnKIlJEcOwlNu04nAYIuRlOsqxnrS+KqDBMoTs+hKbIORjmOYumruuW4GUeRkhiOBTFJpw5JEYqSPiKcGRmehQRqIxwuC4QA */
    id: 'search',
    initial: 'idle',
    tsTypes: {} as import('./search.machine.typegen').Typegen0,
    context: {
      searchText: '',
      error: '',
      results: [],
    },

    schema: {
      context: {} as SearchMachineContext,
      events: {} as SearchMachineEvents,
    },

    states: {
      idle: {
        entry: assign({ results: [], searchText: '' }),
        on: {
          search: {
            target: 'searching',
          },

          typing: {
            target: 'idle',
            internal: true,
            actions: assign({ searchText: (context, event) => event.searchText }),
          },
        },
      },

      searching: {
        invoke: {
          src: 'search',
          onError: [
            {
              target: 'error',
              actions: assign({ error: (_, event) => event.data, results: [] }),
            },
          ],
          onDone: [
            {
              target: 'done',
              actions: assign({ results: (_, event) => event.data }),
            },
          ],
        },

        after: {
          '3000': 'timeout',
        },

        on: {
          cancel: 'idle',
        },
      },

      error: {
        on: {
          reset: 'idle',
        },
      },

      done: {
        on: {
          reset: {
            target: 'idle',
          },
        },
      },

      timeout: {
        on: {
          reset: 'idle',
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    services: {
      search: async (context) => await searchByName(context.searchText),
    },
  },
)
