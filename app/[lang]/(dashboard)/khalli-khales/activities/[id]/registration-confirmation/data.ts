export type AdvanceMonth = {
  id: 'september' | 'october' | 'november'
  used: number
  total: number
  percent: number
  tone: 'used' | 'default'
}

export type RegistrationConfirmation = {
  price: number
  monthlyAllowance: number
  remainingThisMonth: number
  over: number
  novemberRemaining: number
  months: AdvanceMonth[]
}

export const registrationConfirmation: RegistrationConfirmation = {
  price: 45,
  monthlyAllowance: 25,
  remainingThisMonth: 10,
  over: 35,
  novemberRemaining: 15,
  months: [
    { id: 'september', used: 10, total: 10, percent: 100, tone: 'used' },
    { id: 'october', used: 25, total: 25, percent: 100, tone: 'used' },
    { id: 'november', used: 10, total: 25, percent: 40, tone: 'default' },
  ],
}
