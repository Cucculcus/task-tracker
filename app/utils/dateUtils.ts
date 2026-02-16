import { CalendarDate, Time } from '@internationalized/date'

/**
 * Преобразует JS Date в CalendarDate
 * @param date - объект Date
 * @returns CalendarDate
 */
export function dateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  )
}

/**
 * Преобразует JS Date в Time
 * @param date - объект Date
 * @returns Time
 */
export function dateToTime(date: Date): Time {
  return new Time(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  )
}

export function calendarDateTimeToDate(
  calendarDate: CalendarDate,
  time?: Time,
): Date {
  const hours = time?.hour ?? 0
  const minutes = time?.minute ?? 0
  const seconds = time?.second ?? 0
  const milliseconds = time?.millisecond ?? 0

  return new Date(
    calendarDate.year,
    calendarDate.month - 1,
    calendarDate.day,
    hours,
    minutes,
    seconds,
    milliseconds,
  )
}

export function calendarDateToDate(calendarDate: CalendarDate): Date {
  return calendarDateTimeToDate(calendarDate)
}

export function timeToDate(time: Time): Date {
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    time.hour,
    time.minute,
    time.second,
    time.millisecond,
  )
}
