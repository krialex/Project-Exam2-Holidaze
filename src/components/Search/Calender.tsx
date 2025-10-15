import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { Booking } from "./../../common/types";

type CalendarProps = {
  bookings: Booking[];
  onDateSelect: (start: Date | null, end: Date | null) => void;
};

export function Calendar({ bookings, onDateSelect }: CalendarProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const bookedDates = useMemo(() => {
    const dates: Date[] = [];
    bookings.forEach(b => {
      const start = moment(b.dateFrom).startOf("day");
      const end = moment(b.dateTo).startOf("day");
      const current = start.clone();
      while (current.isSameOrBefore(end, "day")) {
        dates.push(current.toDate());
        current.add(1, "day");
      }
    });
    return Array.from(new Map(dates.map(d => [d.getTime(), d])).values());
  }, [bookings]);

  return (
    <div className="max-w-sm mx-auto flex justify-center items-center p-3 bg-white dark:bg-gray-300 rounded-lg shadow-lg">
      <DatePicker
        inline
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update as [Date | null, Date | null]);
          onDateSelect(update[0], update[1]);
        }}
        excludeDates={bookedDates}
        minDate={new Date()}
        dayClassName={(date) =>
          bookedDates.some(d => d.getTime() === date.getTime())
            ? "!w-10 !h-10 !leading-10 !text-sm bg-red-200 text-black rounded-full"
            : "!w-10 !h-10 !leading-10 !text-sm text-gray-800"
        }
        calendarClassName="!w-[360px] !text-base"
      />
    </div>
  );
}


