import { useState, useMemo } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import moment from "moment";
import { Booking } from "../../common/types";

type CalendarProps = {
  bookings: Booking[];
  onDateSelect: (start: Date | null, end: Date | null) => void;
};

export function Calendar({ bookings, onDateSelect }: CalendarProps) {
      const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
      });

      const bookedDates = useMemo(() => {
        return bookings.map(b => {
          const start = moment(b.dateFrom).startOf("day").format("YYYY-MM-DD");
          const end = moment(b.dateTo).startOf("day").format("YYYY-MM-DD");
          return { startDate: start, endDate: end };
        });
      }, [bookings]);

      const handleValueChange = (newValue: any) => {
        setValue(newValue);
        const start = newValue.startDate ? new Date(newValue.startDate) : null;
        const end = newValue.endDate ? new Date(newValue.endDate) : null;
        onDateSelect(start, end);
      };

      return (
        <div className="flex justify-center w-full mt-8">
          <div className="w-full">
            <Datepicker
              value={value}
              onChange={handleValueChange}
              displayFormat="DD MMM YYYY"
              minDate={new Date()}
              disabledDates={bookedDates as any}
              primaryColor="purple"
              placeholder="Select your dates"
              separator="to"
              inputClassName="w-full rounded-md p-2 font-normal bg-gray-50 border-2 border-solid"
            />
          </div>
        </div>
      );
}


