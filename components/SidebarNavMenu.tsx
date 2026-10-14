'use client'

import { type Role, useUser } from '@/contexts/UserContext'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import HakimaIcon from '@/icons/balance.svg'
import ManagementIcon from '@/icons/building.svg'
import NamliyaIcon from '@/icons/circles.svg'
import MaktabIcon from '@/icons/gate.svg'
import GennyIcon from '@/icons/genny.svg'
import EtabatIcon from '@/icons/hand.svg'
import ShbeikLbeikIcon from '@/icons/message.svg'
import KhalliKhalesIcon from '@/icons/plant.svg'
import FahsMahsIcon from '@/icons/star-2.svg'
import HomeIcon from '@/icons/star.svg'
import AlaeshIcon from '@/icons/target.svg'
import { useLogoutMutation } from '@/services'
import { cn } from 'cn'
import { isEmpty } from 'lodash'
import { LogOutIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from './ui/button'

type NavLink = {
  href: string
  label: string
  icon: typeof MaktabIcon
  roles?: Role[]
}

const navLinks: NavLink[] = [
  { href: '/maktab', label: 'maktab', icon: MaktabIcon },
  {
    href: '/namliya',
    label: 'namliya',
    icon: NamliyaIcon,
    roles: ['org_admin', 'team_worker', 'emtedad_admin'],
  },
  { href: '/khalli-khales', label: 'khalis', icon: KhalliKhalesIcon },
  { href: '/alaesh-andak', label: 'have_qalish', icon: AlaeshIcon },
  {
    href: '/hakima',
    label: 'hakima',
    icon: HakimaIcon,
    roles: ['org_admin', 'team_worker', 'emtedad_admin'],
  },
  {
    href: '/genny',
    label: 'genny',
    icon: GennyIcon,
    roles: ['org_admin', 'team_worker', 'emtedad_admin'],
  },
  {
    href: '/shbeik-lbeik',
    label: 'shbeik-lbeik',
    icon: ShbeikLbeikIcon,
    roles: ['community_member', 'emtedad_admin'],
  },
  { href: '/managment', label: 'managment', icon: ManagementIcon, roles: ['emtedad_admin'] },
  { href: '/etabat', label: 'etabat', icon: EtabatIcon },
  {
    href: '/fahs-mahs',
    label: 'fahs-mahs',
    icon: FahsMahsIcon,
    roles: ['org_admin', 'team_worker', 'community_member'],
  },
]

const itemClass =
  'group/item flex h-14 shrink-0 items-center justify-center rounded-[14px] border-[2.5px] border-transparent px-3 text-[15.5px] font-body font-bold whitespace-nowrap text-ink no-underline transition-[background-color,border-color,box-shadow] hover:border-ink hover:bg-paper focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue min-[821px]:group-hover/sidebar:justify-start min-[821px]:group-focus-within/sidebar:justify-start max-[820px]:h-12 max-[820px]:justify-start'

const labelClass =
  'm-0 max-w-0 overflow-hidden opacity-0 transition-[opacity,max-width,margin] duration-200 min-[821px]:group-hover/sidebar:ms-3.5 min-[821px]:group-hover/sidebar:max-w-[170px] min-[821px]:group-hover/sidebar:opacity-100 min-[821px]:group-focus-within/sidebar:ms-3.5 min-[821px]:group-focus-within/sidebar:max-w-[170px] min-[821px]:group-focus-within/sidebar:opacity-100 max-[820px]:ms-3.5 max-[820px]:max-w-none max-[820px]:opacity-100'

export function SidebarNavMenu({ requireUser = false }: { requireUser?: boolean }) {
  const pathname = usePathname()
  const tNav = useTranslations('navigation')
  const tSidebar = useTranslations('sidebar')
  const tLanding = useTranslations('landing')
  const { user } = useUser()
  const router = useRouter()
  const logout = useLogoutMutation()

  if (requireUser && !user) {
    return null
  }

  return (
    <nav
      className="group/sidebar sticky top-0 z-30 flex h-screen w-21 shrink-0 flex-col gap-1.5 overflow-hidden border-e-[3px] border-ink bg-surface px-3 py-4.5 transition-[width] duration-250 hover:w-56 focus-within:w-56 max-[820px]:static max-[820px]:h-auto max-[820px]:w-full max-[820px]:flex-row max-[820px]:gap-2 max-[820px]:overflow-x-auto max-[820px]:border-e-0 max-[820px]:border-b-[3px] max-[820px]:p-3 max-[820px]:transition-none max-[820px]:hover:w-full max-[820px]:focus-within:w-full"
      aria-label={tSidebar('mainNavAriaLabel')}
    >
      {navLinks.map((link, index) => {
        if (link.roles && (!user || !link.roles.includes(user.role))) {
          return null
        }

        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              itemClass,
              isActive && 'border-ink bg-gold shadow-[3px_3px_0_var(--color-ink)]',
              index === 7 && 'mt-2.5 max-[820px]:mt-0',
            )}
          >
            <span
              className={cn(
                'flex size-8.5 shrink-0 items-center justify-center transition-[opacity,transform] group-hover/item:-rotate-6 group-hover/item:scale-[1.06] group-hover/item:opacity-100',
                isActive ? '-rotate-6 scale-[1.06] opacity-100' : 'opacity-55',
              )}
            >
              <Image src={link.icon} alt="" className="size-full" />
            </span>
            <span className={labelClass}>{tNav(link.label)}</span>
          </Link>
        )
      })}
      <Link
        href="/"
        className={cn(
          itemClass,
          'mt-auto border-ink border-dashed bg-paper max-[820px]:ms-auto max-[820px]:mt-0',
        )}
      >
        <span className="flex size-8.5 shrink-0 items-center justify-center">
          <Image src={HomeIcon} alt="" className="size-full" />
        </span>
        <span className={labelClass}>{tLanding('brand')}</span>
      </Link>
      {!isEmpty(user) && (
        <Button
          className="border-red text-red border-dashed bg-paper max-[820px]:ms-auto max-[820px]:mt-0"
          shape="square"
          effect="flat"
          onClick={() => logout.mutate(undefined, { onSuccess: () => router.replace('/') })}
        >
          <LogOutIcon />
          <span className={labelClass}>{tNav('logout')}</span>
        </Button>
      )}
    </nav>
  )
}
