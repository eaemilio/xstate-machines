'use client'

import { useRef } from 'react'

import EventViewer from '@/components/EventViewer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchActor } from '@/context/search-context'

export default function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [state, send] = useSearchActor()

  return (
    <div className="flex w-full max-w-sm flex-col">
      <Input
        type="text"
        placeholder="Search for your name"
        ref={searchInputRef}
        value={state.context.searchText}
        onChange={(e) => send({ type: 'typing', searchText: e.target.value })}
      />
      <Button
        disabled={!state.can({ type: 'search' })}
        onClick={() => send({ type: 'search', searchText: searchInputRef.current?.value ?? '' })}
      >
        Search
      </Button>
      {state.can('cancel') && (
        <Button variant="ghost" onClick={() => send({ type: 'cancel' })}>
          Cancel
        </Button>
      )}
      {state.can('reset') && (
        <Button variant="ghost" onClick={() => send({ type: 'reset' })}>
          Reset
        </Button>
      )}
      <EventViewer></EventViewer>
    </div>
  )
}
