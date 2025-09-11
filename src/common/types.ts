export interface Image {
    url: string;
    alt?: string;
}

export interface User {
    name: string;
    email: string;
    avatar?: {
        url: string;
        alt: string;
    };
    bio?: string;
    venueManager?: boolean;
    _count: {
        venues: number;
        bookings: number;
    }
}

export interface Venue {
    id: string;
    name: string;
    description: string;
    media: Image[];
    rating: number;
    maxGuests: number;
    price: number;
    created: string;
    updated: string;
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    }
    _count: {
        bookings: number;
    }
    meta: {
        breakfast: boolean;
        wifi: boolean;
        parking: boolean;
        pets: boolean;
        /* her kan jeg legge til fler om jeg vil */
    }
}