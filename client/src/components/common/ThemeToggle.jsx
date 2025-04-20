import { useTheme } from '../../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

import { Button } from '../ui/button'

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      {darkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-180 dark:scale-0" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  )
}

export default ThemeToggle
