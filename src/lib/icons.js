/**
 * Explicit icon registry.
 *
 * Data files reference icons by name (e.g. icon: 'ShieldCheck'), so components
 * need a name -> component lookup. Doing that with `import * as Icons from
 * 'lucide-react'` defeats tree-shaking and pulls the whole icon set into the
 * bundle (~800 kB). Every icon the site uses is imported by name here instead.
 *
 * Adding an icon to a data file? Add it to this map too, or it falls back to Zap.
 */
import {
  Aperture,
  Blocks,
  BookOpen,
  Building2,
  CalendarDays,
  CircleDashed,
  CircleHelp,
  Cloud,
  Code2,
  Compass,
  Component,
  Eye,
  Globe,
  Headphones,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  MonitorPlay,
  MousePointer2,
  Network,
  Rocket,
  Send,
  Server,
  Settings,
  Settings2,
  ShieldCheck,
  Siren,
  Smile,
  Sparkle,
  Sparkles,
  Star,
  Target,
  Timer,
  UserCheck,
  Users,
  UsersRound,
  Webhook,
  Wrench,
  Zap,
} from 'lucide-react'

export const iconMap = {
  Aperture,
  Blocks,
  BookOpen,
  Building2,
  CalendarDays,
  CircleDashed,
  CircleHelp,
  Cloud,
  Code2,
  Compass,
  Component,
  Eye,
  Globe,
  Headphones,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  MonitorPlay,
  MousePointer2,
  Network,
  Rocket,
  Send,
  Server,
  Settings,
  Settings2,
  ShieldCheck,
  Siren,
  Smile,
  Sparkle,
  Sparkles,
  Star,
  Target,
  Timer,
  UserCheck,
  Users,
  UsersRound,
  Webhook,
  Wrench,
  Zap,
}

/** Resolve an icon name to a component, falling back to Zap. */
export function getIcon(name) {
  return iconMap[name] ?? Zap
}

export default getIcon
