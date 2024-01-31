import { addDays } from 'date-fns'

export const addDaysWrapped = (date: Date, days: number) => {
  return addDays(date, days)
}