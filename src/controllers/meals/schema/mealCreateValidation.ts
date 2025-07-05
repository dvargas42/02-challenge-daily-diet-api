import { InvalidDateError } from '@/errors/invalid-date-error'
import { z } from 'zod'

function parseToIsoDate(date: string) {
  const [year, month, day] = date.split('-')

  const dayNum = parseInt(day, 10)
  const monthNum = parseInt(month, 10) - 1
  const yearNum = parseInt(year, 10)

  const _date = new Date(yearNum, monthNum, dayNum)

  if (
    _date.getDate() !== dayNum ||
    _date.getMonth() !== monthNum ||
    _date.getFullYear() !== yearNum
  ) {
    throw new InvalidDateError()
  }

  return _date
}

function parseToIsoTime(time: string) {
  const [hour, minute] = time.split(':')

  const hourNum = parseInt(hour, 10)
  const minuteNum = parseInt(minute, 10)

  if (hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
    throw new Error('Invalid time')
  }

  return `${hourNum.toString().padStart(2, '0')}:${minuteNum.toString().padStart(2, '0')}`
}

const mealCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  description: z
    .string()
    .min(2, 'Description must be at least 2 characters long'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format yyyy-MM-dd')
    .transform((date) => parseToIsoDate(date)),
  hour: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Hour must be in format HH:mm')
    .transform((time) => parseToIsoTime(time)),
  isInDiet: z.boolean(),
})

export const mealCreateValidation = mealCreateSchema.parse
