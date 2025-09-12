import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css';
import moment from "moment";
import { Booking } from "./../../common/types";
import styles from "./Calendar.module.css";


type CalendarProps = {
  bookings: Booking[];
};

export function Calendar({ bookings }: CalendarProps) {
  const bookedDates = useMemo(() => {
    const dates: Date[] = [];

    bookings.forEach((b) => {
      const start = moment(b.dateFrom).startOf("day");
      const end = moment(b.dateTo).startOf("day");

      const current = start.clone();
      while (current.isSameOrBefore(end, "day")) {
        dates.push(current.toDate());
        current.add(1, "day");
      }
    });

    return Array.from(new Map(dates.map((d) => [d.getTime(), d])).values());
  }, [bookings]);

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      inline
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update as [Date | null, Date | null])}
      highlightDates={[
        { [styles.bookedDay]: bookedDates }
      ]}
      excludeDates={bookedDates}
      minDate={new Date()}
    />
  );
}


