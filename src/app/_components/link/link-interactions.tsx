'use client'

import React, { useMemo, useState } from 'react'
import { addDays, format } from 'date-fns'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import { CalendarDateRangePicker, type DateRange } from '../ui/calendar-range-picker'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { EmptyState } from '../ui/empty-state'
import { ShowContent } from '../ui/show-content'
import { Skeleton } from '../ui/skeleton'

interface Props {
    link: Link
}

interface DateFilter {
    startDate: Date,
    endDate: Date
}

interface CustomTooltipProps {
    active?: true
    payload?: {value: string}[] 
    label?: string
}

export const LinkInteractions = ({
  link
}: Props) => {
  const { closeModal } = useModalStore()

  const [dateFilter, setDateFilter] = useState<DateFilter>({
    endDate: new Date(),
    startDate: addDays(new Date(), -7),
  })

  const {
    data, isLoading
  } = api.link.searchInteractionAnalytics.useQuery({
    linkId: link.id,
    startDate: dateFilter.startDate,
    endDate: addDays(dateFilter.endDate, 1),
  })

  const handleDateRange = (date: DateRange) => {
    setDateFilter({
      startDate: date.from,
      endDate: date.to,
    })
  }

  const analytics = useMemo(() => {
    if (!data) {
      return []
    }

    return data.map(({ date, interactions }) => {
      const dateObject = new Date(date)

      return {
        interactions,
        date: format(dateObject, 'LLL dd, y'),
      }
    })
  }, [data])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">
                   Interactions for: <span className="text-amber-400">{link.name}</span>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 w-[300px] sm:w-[370px] h-[400px] md:w-full w-min-[300px] md:max-w-lg overflow-auto">
        <CalendarDateRangePicker
          placeholder="Pick a range to filter"
          dateRange={{
            from: dateFilter.startDate,
            to: dateFilter.endDate,
          }}
          onRangeSelect={handleDateRange}
        />

        <ShowContent
          empty={!analytics.length}
          loading={isLoading}
          fallback={<Skeleton className="w-[300px] sm:w-[370px] h-[400px] md:w-full w-min-[300px] md:max-w-lg" />}
          emptyState={<EmptyState title="No interactions found" description="" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={700}
              height={400}
              data={analytics}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="interactions" stroke="#fbbe24" fill="#f5c95b" />
            </AreaChart>
          </ResponsiveContainer>
        </ShowContent>

      </div>

      <DialogFooter>
        <Button variant="outline" onClick={closeModal}>
                    Close
        </Button>
      </DialogFooter>

    </DialogContent>
  )
}


const CustomTooltip = ({ 
  active,
  payload, 
  label 
}: CustomTooltipProps) => {
  if (active && payload?.length) {
    return (
      <div className="bg-black/40 flex flex-col justify-start p-4 border border-gray-400">
        <p className="self-center text-lg font-semibold">{label}</p>
        <p className="text-base">Interactions: <span className="text-amber-400">{payload[0]?.value}</span></p>
      </div>
    )
  }
  
  return null
}