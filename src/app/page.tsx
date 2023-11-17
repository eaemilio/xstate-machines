import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-6 p-24">
      <h1 className="text-4xl font-bold">Driving Pure UI Componets Using XState</h1>
      <p className="text-center text-xl text-muted-foreground">
        Design state machines for UI logic, manage component states, handle complex user interactions, and create
        delightful user experiences
      </p>
      <div className="flex gap-6 py-6">
        <Link href="https://stately.ai/docs/xstate">
          <Button variant="secondary">Learn More</Button>
        </Link>
        <Link href="search">
          <Button>Run My First Machine</Button>
        </Link>
      </div>
    </section>
  )
}
