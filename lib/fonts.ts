import { Alexandria, Cairo, Lalezar, Rubik } from 'next/font/google'

export const rubikFont = Rubik({
  weight: ['500', '600', '700', '800'],
  subsets: ['arabic'],
  variable: '--rubik-font',
  display: 'block',
})

export const lalezarFont = Lalezar({
  weight: ['400'],
  subsets: ['arabic'],
  variable: '--lalezar-font',
  display: 'block',
})

export const cairoFont = Cairo({
  weight: ['500', '600', '700', '800'],
  subsets: ['arabic'],
  variable: '--cairo-font',
  display: 'block',
})

export const alexandriaFont = Alexandria({
  weight: ['600', '700'],
  subsets: ['arabic'],
  variable: '--alex-font',
  display: 'block',
})
