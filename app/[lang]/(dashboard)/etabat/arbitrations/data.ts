import type { ArbitrationAppealFormValues, ArbitrationStartFormValues } from '@/types/schemas'

export type EtabatArbitration = {
  id: string
  caseTitle: string
  claimant: string
  claimantInitial: string
  counterparty: string
  counterpartyInitial: string
  disputeValue: number
  firstDeposit: number
  firstPanelSize: number
  availableBalance: number
  loan: number
  appealDeposit: number
  outstandingDebt: number
  agreeingArbitrators: number
}

export const arbitration: EtabatArbitration = {
  id: '1047',
  caseTitle: 'تسليم الورشة اتأخّر ١٢ يوم عن الاتفاق',
  claimant: 'مشكاة للثقافة',
  claimantInitial: 'م',
  counterparty: 'استوديو الورشة',
  counterpartyInitial: 'س',
  disputeValue: 500,
  firstDeposit: 50,
  firstPanelSize: 5,
  availableBalance: 32,
  loan: 18,
  appealDeposit: 100,
  outstandingDebt: 18,
  agreeingArbitrators: 4,
}

export const arbitrationRounds = [
  { key: 'first', arbitrators: 5, deposit: 50 },
  { key: 'appeal1', arbitrators: 11, deposit: 100 },
  { key: 'appeal2', arbitrators: 23, deposit: 200 },
  { key: 'appeal3', arbitrators: 47, deposit: 400 },
] as const

export async function submitArbitrationStart(values: ArbitrationStartFormValues) {
  return Promise.resolve(values)
}

export async function submitArbitrationAppeal(values: ArbitrationAppealFormValues, files: File[]) {
  return Promise.resolve({ values, files })
}
