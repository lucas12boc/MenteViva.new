import {
  type LucideIcon,
  Moon,
  SunMedium,
  Heart,
  BrainCircuit,
  Bot,
  MessageSquare,
  Mic,
  Smile,
  Users,
  AlertTriangle,
  Menu,
  X,
  User,
  PanelLeft,
  Search,
  BookOpen,
  Headphones,
  Wind,
  Sparkles,
  Play,
  Loader,
  LogOut,
  Mail,
  Palette,
  Settings,
  Globe,
  Pause,
  RotateCw,
  Sprout,
  Flower2,
  Leaf,
  Sun,
  CloudRain,
  Gem,
  Trash2,
  ShieldCheck,
  Shield,
  Phone,
  Ambulance,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
      <path d="M12 5a.9.9 0 0 0-1 .8v.2a4 4 0 0 0 1.6 3.2 1 1 0 0 0 .4.2 1 1 0 0 0 .6-.2 1 1 0 0 0 .4-1.4A4.9 4.9 0 0 0 13 6v-.2a1 1 0 0 0-1-1zm3.4 3.4a1 1 0 0 0-1.4 0 4.9 4.9 0 0 0-2 4.2v.4a1 1 0 1 0 2 0v-.4a3 3 0 0 1 1.4-2.6 1 1 0 0 0 0-1.6zM8.6 8.4a1 1 0 0 0 0 1.6A3 3 0 0 1 10 12.6v.4a1 1 0 1 0 2 0v-.4a4.9 4.9 0 0 0-2-4.2 1 1 0 0 0-1.4 0zM15 13a1 1 0 0 0-1 1v.2a3 3 0 0 1-3.6 2.5 1 1 0 1 0 .8 1.8 5 5 0 0 0 4.8-4.3v-.2a1 1 0 0 0-1-1z"/>
    </svg>
  ),
  heart: Heart,
  brain: BrainCircuit,
  bot: Bot,
  message: MessageSquare,
  mic: Mic,
  smile: Smile,
  users: Users,
  alert: AlertTriangle,
  menu: Menu,
  close: X,
  user: User,
  panelLeft: PanelLeft,
  search: Search,
  book: BookOpen,
  headphones: Headphones,
  wind: Wind,
  sparkles: Sparkles,
  play: Play,
  loader: Loader,
  logout: LogOut,
  mail: Mail,
  palette: Palette,
  settings: Settings,
  globe: Globe,
  pause: Pause,
  restart: RotateCw,
  sprout: Sprout,
  flower: Flower2,
  leaf: Leaf,
  cloudRain: CloudRain,
  sun: Sun,
  gem: Gem,
  trash: Trash2,
  shield: Shield,
  phone: Phone,
  ambulance: Ambulance,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  arrowRight: ArrowRight,
  whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      {...props}
    >
      <path d="M16.75 13.96c.25.25.25.66 0 .91l-1.55 1.54c-.25.25-.66.25-.91 0s-.25-.66 0-.91l1.55-1.54c.25-.25.66-.25.91 0zM19.34 11.36l-1.54-1.54c-.25-.25-.66-.25-.91 0s-.25-.66 0-.91l1.54-1.54c.25-.25.66-.25.91 0s.25.66 0 .91zM12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.43 1.28 4.94L2 22l5.06-1.28C8.57 21.54 10.24 22 12 22h.01c5.52 0 9.99-4.47 9.99-9.99S17.52 2 12.01 2H12zm0 18.01h-.01c-1.6 0-3.14-.4-4.5-1.15l-.32-.19-3.34.84.86-3.27-.22-.34C4.19 14.99 3.99 13.5 3.99 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8 8.01z"/>
    </svg>
  ),
}
