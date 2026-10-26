'use client'

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import type { Dictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'
import GovernIcon from '@/icons/balance.svg'
import PresentIcon from '@/icons/circles.svg'
import SuggestIcon from '@/icons/genny.svg'
import SupportIcon from '@/icons/hand.svg'
import JoinIcon from '@/icons/key.svg'
import ContactIcon from '@/icons/lantern.svg'
import EarnIcon from '@/icons/plant.svg'
import CredableIcon from '@/icons/star-2.svg'
import Logo from '@/icons/star.svg'
import DealIcon from '@/icons/wave.svg'
import { cn } from 'cn'
import { MenuIcon, MoveDownLeftIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type LandingCopy = Dictionary['landing']

const anchors = ['about', 'how', 'team', 'papers', 'faq', 'contact'] as const
const featureIcons = [CredableIcon, EarnIcon, GovernIcon]
const stepIcons = [JoinIcon, PresentIcon, DealIcon, Logo]

function Brand({ copy, compact = false }: { copy: LandingCopy; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 leading-none">
      <Image src={Logo} alt="" className={cn('h-auto w-8 shrink-0', compact && 'w-6')} />
      <span className={cn('font-display text-red', compact ? 'text-[27px]' : 'text-[34px]')}>
        {copy.brand}
      </span>
    </span>
  )
}

export function LandingNav({ copy }: { copy: LandingCopy }) {
  const [open, setOpen] = React.useState(false)
  const { user } = useUser()
  const signedIn = Boolean(user)

  return (
    <nav className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/94 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-295 justify-between items-center gap-5 px-8 py-3 max-[900px]:gap-3 max-[900px]:px-5.5 max-[900px]:py-3.75">
        <Link href="/" className="inline-flex no-underline">
          <Brand copy={copy} compact />
        </Link>
        <div
          className={cn(
            'font-body flex w-max gap-1 whitespace-nowrap max-[900px]:fixed max-[900px]:inset-x-0 max-[900px]:top-17.5 max-[900px]:w-auto max-[900px]:translate-x-0 max-[900px]:translate-y-0 max-[900px]:flex-col max-[900px]:border-b-[3px] max-[900px]:border-ink max-[900px]:bg-surface max-[900px]:p-3.5',
            open ? 'max-[900px]:flex' : 'max-[900px]:hidden',
          )}
        >
          {anchors.map((anchor) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              onClick={() => setOpen(false)}
              className="rounded-full border-2 border-transparent px-3.5 py-2 text-[15px] font-bold text-ink no-underline hover:border-ink hover:bg-gold"
            >
              {copy.nav[anchor]}
            </a>
          ))}
        </div>
        {signedIn && user ? (
          <Link href={user.org ? `/organization/${user.org.organizationId}` : '/maktab'}>
            <Button
              variant="outline"
              effect="3d"
              className="font-body py-1.25 p-4 bg-gold text-surface max-[900px]:translate-0 max-[900px]:p-0 max-[900px]:border-0 max-[900px]:aspect-square max-[900px]:size-10"
            >
              <Avatar color="red" size="sm" effect="flat" className="max-[900px]:size-full">
                <AvatarImage src={''} alt={user.org?.legalName ?? user.first ?? ''} />
                <AvatarFallback>
                  {(user.org?.legalName ?? user.first ?? '').charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="max-[900px]:hidden">{user.org?.legalName ?? user.first}</span>
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="primary" size="sm">
              {copy.enter}
            </Button>
          </Link>
        )}
        <Button
          variant="outline"
          size="icon"
          aria-label={copy.navToggle}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="hidden p-2 max-[900px]:grid max-[900px]:place-items-center"
        >
          <MenuIcon className="size-5" />
        </Button>
      </div>
    </nav>
  )
}

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <>
      <div className="font-body mb-2.5 flex items-center gap-3 text-sm font-extrabold text-red after:h-0.75 after:w-11.5 after:bg-red after:content-['']">
        {eyebrow}
      </div>
      <h2 className="mb-3 font-display text-[clamp(34px,5vw,54px)] leading-[1.12] text-ink">
        {title}
      </h2>
      {lede && (
        <p className="font-body mb-7 max-w-195 text-lg font-medium leading-[1.95] text-soft">
          {lede}
        </p>
      )}
    </>
  )
}

export function LandingPage({ copy }: { copy: LandingCopy }) {
  const { user } = useUser()
  const signedIn = Boolean(user)
  const heroHref = signedIn ? '/maktab' : '/login'
  const heroLabel = signedIn ? copy.enterOffice : copy.enterNetwork

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden px-8 py-17.5 pb-16.5 text-center max-[520px]:px-4.5 dot-grid-bg dot-grid-bg-mask">
        <div className="relative mx-auto max-w-295">
          <span className="mx-auto block w-29.5 animate-spin motion-reduce:animate-none max-[520px]:w-23">
            <Image src={Logo} alt="" />
          </span>
          <h1 className="mt-4 font-display text-[clamp(64px,10vw,124px)] leading-none">
            {copy.brand}
          </h1>
          <p className="mt-2 font-display text-[clamp(20px,3vw,30px)] text-red">{copy.heroTag}</p>
          <p className="font-body mx-auto mt-4.5 max-w-165 text-[19px] font-medium leading-[1.95] text-soft">
            {copy.heroLede}
          </p>
          <div className="mt-7.5">
            <Link href={heroHref} className={buttonVariants({ variant: 'primary' })}>
              {heroLabel}
            </Link>
          </div>
        </div>
      </header>
      <main className="relative mx-auto max-w-295 px-8 max-[520px]:px-4.5">
        <section id="about" className="scroll-mt-20 pt-18">
          <SectionHeading {...copy.about} />
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.about.features.map((feature, index) => {
              const Icon = featureIcons[index]!
              return (
                <article
                  key={feature.title}
                  className="rounded-card border-[2.5px] border-ink bg-surface px-6 py-6.5 shadow-ink shadow-[5px_5px_0]"
                >
                  <div className="mb-4 flex h-18 items-center justify-center">
                    <Image src={Icon} alt="" className="size-18" />
                  </div>
                  <h3 className="mb-1.5 font-display text-2xl leading-tight">{feature.title}</h3>
                  <p className="font-body text-base font-medium leading-[1.9] text-soft">
                    {feature.body}
                  </p>
                </article>
              )
            })}
          </div>
        </section>
        <section id="how" className="scroll-mt-20 pt-18">
          <SectionHeading eyebrow={copy.how.eyebrow} title={copy.how.title} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.how.steps.map((step, index) => {
              const Icon = stepIcons[index]!
              return (
                <article
                  key={step.title}
                  className="rounded-card border-[2.5px] border-ink bg-surface px-6 py-6.5 shadow-ink shadow-[5px_5px_0]"
                >
                  <div className="mb-4 flex h-18 items-center justify-center">
                    <Image src={Icon} alt="" className="size-17" />
                  </div>
                  <h3 className="mb-2 flex items-center gap-2.5 font-display text-2xl">
                    <span className="grid size-9 place-items-center rounded-full border-[2.5px] border-ink bg-red text-[19px] text-surface shadow-ink shadow-[2px_2px_0]">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="font-body text-base font-medium leading-[1.9] text-soft">
                    {step.body}
                  </p>
                </article>
              )
            })}
          </div>
        </section>
        <section id="team" className="scroll-mt-20 pt-18">
          <SectionHeading {...copy.team} />
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-3">
            {copy.team.members.map((member, index) => (
              <article
                key={member.name}
                className="rounded-card border-[2.5px] border-ink bg-surface p-5.5 text-center shadow-ink shadow-[5px_5px_0]"
              >
                <span
                  className={cn(
                    'mx-auto mb-3 grid size-21 place-items-center rounded-full border-[2.5px] border-ink font-display text-[32px] shadow-ink shadow-[3px_3px_0]',
                    index === 1 ? 'bg-blue text-surface' : 'bg-gold text-ink',
                  )}
                >
                  {member.name.charAt(0)}
                </span>
                <h3 className="font-display text-[21px]">{member.name}</h3>
                <span className="font-body text-[14.5px] font-semibold text-soft">
                  {member.role}
                </span>
                <p className="font-body mt-3 border-t-[2.5px] border-dashed border-ink/25 pt-3 text-[14.5px] font-medium leading-[1.85] text-soft">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section id="papers" className="scroll-mt-20 pt-18">
          <SectionHeading
            eyebrow={copy.papers.eyebrow}
            title={copy.papers.title}
            lede={copy.papers.lede}
          />
          <div className="space-y-3">
            {copy.papers.items.map((item, index) => (
              <Link
                href={item.link}
                key={item.title}
                className="flex items-center gap-4 rounded-card border-[2.5px] border-ink bg-surface px-5.5 py-4.5 shadow-ink shadow-[5px_5px_0] hover:-translate-x-0.5 hover:-translate-y-0.75 hover:shadow-[8px_9px_0] transition-[transform_0.15s,box-shadow_0.15s]"
              >
                <span
                  className={cn(
                    'font-body shrink-0 rounded-full border-2 border-ink px-3 py-1 text-[12.5px] font-extrabold',
                    index ? 'bg-gold text-ink' : 'bg-blue text-surface',
                  )}
                >
                  {item.kind}
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block font-display text-[22px] leading-[1.35]">{item.title}</b>
                  <span className="font-body text-[15px] font-medium text-soft">{item.body}</span>
                </span>
                <MoveDownLeftIcon className="size-6 shrink-0 text-red" />
              </Link>
            ))}
          </div>
        </section>
        <section id="faq" className="scroll-mt-20 pt-18">
          <SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} lede={copy.faq.lede} />
          <Accordion multiple className="space-y-3">
            {copy.faq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionHeader>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <footer id="contact" className="scroll-mt-20 py-18 pb-24">
          <div className="relative overflow-hidden rounded-panel bg-ink p-8 text-paper shadow-ink shadow-[8px_8px_0] sm:p-11">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 z-0 dark-dot-grid-bg dark-dot-grid-bg-mask"></div>
            </div>
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-2 font-display text-[clamp(34px,5vw,54px)] leading-[1.12]">
                  {copy.contact.title}
                </h2>
                <p className="font-bodytext-[17px] font-medium leading-[1.95] text-paper/80">
                  {copy.contact.lede}
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${copy.contact.email}`}
                  className="flex items-center gap-3.5 rounded-card border-2 border-paper/30 bg-surface/10 p-4 text-paper no-underline hover:border-ink hover:bg-gold hover:text-ink"
                >
                  <Image src={ContactIcon} alt="" className="size-9 shrink-0" />
                  <span>
                    <b className="block font-display text-[19px]" dir="ltr">
                      {copy.contact.email}
                    </b>
                    <span className="font-body text-sm font-semibold">
                      {copy.contact.emailHint}
                    </span>
                  </span>
                </a>
                {[
                  [SupportIcon, copy.contact.support, copy.contact.supportHint],
                  [SuggestIcon, copy.contact.suggest, copy.contact.suggestHint],
                ].map(([Icon, title, hint]) => {
                  return (
                    <div
                      key={String(title)}
                      className="cursor-pointer flex items-center gap-3.5 rounded-card border-2 border-paper/30 bg-surface/10 p-4 hover:border-ink hover:bg-gold hover:text-ink"
                    >
                      <Image src={Icon} alt="" className="size-9 shrink-0" />
                      <span>
                        <b className="block font-display text-[19px]">{title as string}</b>
                        <span className="font-body text-sm font-semibold ">{hint as string}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
