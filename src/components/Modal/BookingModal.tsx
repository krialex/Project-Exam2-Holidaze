import React, { useState} from "react";
import { load } from "../../common/auth/localStorage/Load";
import { BASE_API_URL, ALL_BOOKINGS } from "../../common/url";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    venueId: string;
    venueName: string;
    startDate: Date | null;
    endDate: Date | null;
    maxGuests: number;
};

export function BookingModal({ isOpen, onClose, venueId, venueName, startDate, endDate, maxGuests, }: BookingModalProps) {
    const { user } = useUser();
    const [guests, setGuests] = useState(1);

    if (!isOpen) return null;

    const incrementGuests = () => {
        setGuests((prev) => Math.min(prev + 1, maxGuests));
    };

    const decrementGuests = () => {
        setGuests((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) return;

        if (!user) {
            toast.error("You must be logged in to book this venue.");
            return;
            }

    try {
        const accessToken = load("accessToken");

        const res = await fetch(`${BASE_API_URL}${ALL_BOOKINGS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                dateFrom: startDate.toISOString(),
                dateTo: endDate.toISOString(),
                guests,
                venueId,
            }),
        });

        if (res.ok) {
            toast.success("booking successful!");
            onClose();
        } else {
            toast.error("Booking failed, please try again.");
        }
    } catch (err) {
        console.error(err);
        toast.error("something went wrong when booking. Please try again later.");
    }
  };

   return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          Confirm Booking
        </h2>
        <div className="space-y-2 text-gray-700 mb-4">
          <p>
            <span className="font-medium">Venue:</span> {venueName}
          </p>
          <p>
            <span className="font-medium">From:</span>{" "}
            {startDate?.toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">To:</span>{" "}
            {endDate?.toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-lg shadow-inner py-3 mb-4">
          <button
            onClick={decrementGuests}
            disabled={guests <= 1}
            className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            –
          </button>
          <input
            type="text"
            readOnly
            value={guests}
            className="w-12 text-center border rounded-md"
          />
          <button
            onClick={incrementGuests}
            disabled={guests >= maxGuests}
            className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            +
          </button>
          <small className="text-gray-500">Max {maxGuests}</small>
        </div>

        {(!startDate || !endDate) && (
          <p className="text-center text-red-600 mb-3 text-sm italic">
            Please select start and end dates before booking.
          </p>
        )}

        <button
          onClick={handleConfirmBooking}
          disabled={!startDate || !endDate}
            className={`w-full py-2 rounded-lg shadow-md transition text-white ${
              !startDate || !endDate
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Book Now
        </button>
      </div>
    </>
  );
}

