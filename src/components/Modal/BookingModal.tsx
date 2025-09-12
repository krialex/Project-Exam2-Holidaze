import React, { useState} from "react";
import styles from "./Modals.module.css";
import { load } from "../../common/auth/localStorage/Load";
import { BASE_API_URL, ALL_BOOKINGS } from "../../common/url";
import { useUser } from "../../context/UserContext";

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
            alert("You must be logged in to book this venue.");
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

        const data = await res.json();

        if (res.ok) {
            alert("booking successfull"); //her bytte ut til toast, og en oppdatering av siden.
            onClose();
        } else {
            alert("You need to be logged in to book a venue");
        }
    } catch (err) {
        console.error(err);
        alert("something went wrong in booking to api.");
    }
  };

   return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button onClick={onClose} className={styles.closeIcon}>X</button>
        <h2>Confirm Booking</h2>
        <p>Venue: {venueName}</p>
        <p>From: {startDate?.toLocaleDateString()}</p>
        <p>To: {endDate?.toLocaleDateString()}</p>

        <div className={styles.guestSelector}>
          <button onClick={decrementGuests} disabled={guests <= 1}>-</button>
          <input type="text" readOnly value={guests} />
          <button onClick={incrementGuests} disabled={guests >= maxGuests}>+</button>
          <small>Max {maxGuests} guests</small>
        </div>

        <button onClick={handleConfirmBooking}>Book Now</button>
      </div>
    </div>
  );
}