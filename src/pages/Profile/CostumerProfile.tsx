import { Link } from "react-router-dom";
import moment from "moment";

type CostumerProfileProps = {
    profile: any;
    bookings: any[];
};

export function CostumerProfile({ profile, bookings }: CostumerProfileProps) {
    return (
            <div className="mx-auto my-6">
                <h3 className="text-2xl font-semibold text-center mb-4">My bookings</h3>

                {bookings.length === 0 ? (
                <p className="text-center">No bookings yet</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    {bookings.map((b) => (
                    <Link key={b.id} to={`/venues/${b.venue?.id}`} className="h-full">
                        <div className="bg-white dark:bg-gray-700 rounded shadow p-4 h-full flex flex-col">
                        <div className="w-full h-64 mb-4">
                            <img className="w-full h-full object-cover rounded-lg"
                            src={b.venue.media[0].url}
                            alt={b.venue.media[0].alt || b.venue.name}
                            />
                        </div>

                        <p className="font-medium">{b.venue?.name ?? "Unknown venue"}</p>
                        <p className="text-sm mt-1">
                            <strong>Date for my trip: {" "}</strong>
                            {moment(b.dateFrom).format("DD.MM.YYYY")} –{" "}
                            {moment(b.dateTo).format("DD.MM.YYYY")}
                        </p>
                        <p className="text-sm  mt-1 mb-3">{b.guests} guests</p>

                        <button className="mt-auto bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900 transition">
                            View details
                        </button>
                        </div>
                    </Link>
                    ))}
                </div>
                )}
            </div>
            );

}
