import { Landmark, Receipt } from 'lucide-react'

import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Landmark className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2 space-x-4 lg:space-x-6">
          <Receipt className="h-4 w-4" />
          Faturas
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
