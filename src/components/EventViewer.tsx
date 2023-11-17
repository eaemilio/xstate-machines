import React from 'react'

import { useResultsSelect } from '@/store/search/selectors'

export default function EventViewer() {
  const results = useResultsSelect()
  return <div>{JSON.stringify(results)}</div>
}
