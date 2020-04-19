export interface TimeLimit {
  defaultTime?: Date
  disabledSpan?(time: Date, date?: Date | { begin?: Date; end?: Date }): boolean
  timeSpan?: number
}
