"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import { Switch } from "@/components/ui/switch"
import { useDictionary } from "@/lib/i18n/dictionary-provider"


export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const { dictionary } = useDictionary()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Evita el desajuste de hidratación renderizando el switch solo en el cliente
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
       <Icons.sun className="h-5 w-5" />
       <Switch
        id="theme-switch"
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        aria-label={dictionary.settings.themeSwitcher.changeTheme}
      />
       <Icons.moon className="h-5 w-5" />
    </div>
  )
}
