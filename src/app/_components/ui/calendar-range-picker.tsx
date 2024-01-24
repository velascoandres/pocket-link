import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent,PopoverTrigger } from '../ui/popover'

import { Button } from './button'
import { Calendar } from './calendar'

export interface DateRange {
    from: Date
    to: Date
}


interface Props {
    className?: string
    dateRange?: DateRange,
    placeholder?: string

    onRangeSelect: (range: DateRange) => void
}


export const CalendarDateRangePicker = ({
  className,
  dateRange,
  onRangeSelect,
  placeholder = 'Pick a date'
}: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(dateRange)

  const handleSelect = (selectedRange: DateRange) => {
    setDate(selectedRange)
    onRangeSelect(selectedRange)
  }
  
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => handleSelect(date as DateRange)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}