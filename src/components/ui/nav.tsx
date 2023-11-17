'use client'

import React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

import { ModeToggle } from './mode-toggle'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Search',
    href: '/search',
    description: 'A simple search bar state.',
  },
  {
    title: 'Feedback form',
    href: '/feedback-form',
    description: 'Loving our app? Rate your experience.',
  },
  {
    title: 'Todos',
    href: '/todos',
    description: 'A state machine to get things done.',
  },
]

export default function Nav() {
  return (
    <header className="w-full py-12">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">xstate</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              JavaScript state machines and statecharts
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="https://xstate.js.org/docs/guides/start.html" title="Getting Started">
                        Build your first machine and run it.
                      </ListItem>
                      <ListItem
                        href="https://xstate.js.org/docs/about/concepts.html#finite-state-machines"
                        title="Finite State Machines"
                      >
                        What is a state machine?
                      </ListItem>
                      <ListItem href="/docs/primitives/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
          <li>
            <ModeToggle></ModeToggle>
          </li>
        </ul>
      </nav>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
