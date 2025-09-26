import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_API_URL, ALL_VENUES } from "../../common/url";
import { load } from "../../common/auth/localStorage/Load";
import { toast } from "react-toastify";
import * as yup from "yup";
import { StarRating } from "../ui/StarRating";

type venueModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const newVenueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().min(1, "Price must be positive").required("Price is required"),
  rating: yup.number().min(0).max(6).default(0),
  maxGuests: yup.number().min(1).max(100, "Guests between 1–100").required(),
  address: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  mediaUrl: yup.string().url("Must be a valid URL").nullable(),
  wifi: yup.boolean().default(false),
  parking: yup.boolean().default(false),
  breakfast: yup.boolean().default(false),
  pets: yup.boolean().default(false),
});

export function NewVenueModal({ isOpen, onClose }: venueModalProps) {
    const methods = useForm({
        resolver: yupResolver(newVenueSchema),
        defaultValues: { rating: 0 },
    });

    const { register, handleSubmit, formState: { errors }, reset } = methods;
    const { refreshUser } = useUser();
 
    if(!isOpen) return null;

    async function createVenue(data: any) {
        try {
            const token = load("accessToken");
            console.log("her er token: ", token);
            const body = {
                name: data.name,
                description: data.description,
                price: data.price,
                rating: data.rating ?? 0,
                maxGuests: data.maxGuests,
                media: data.mediaUrl.trim() ? [{ url: data.mediaUrl, alt: "Venue image"}] : [],
                location: {
                    address: data.address || null,
                    city: data.city || null,
                    zip: null,
                    country: data.country || null,
                    continent: null,
                    lat: 0,
                    lng: 0,
                    },
                 meta: {
                    wifi: data.wifi || false,
                    parking: data.parking || false,
                    breakfast: data.breakfast || false,
                    pets: data.pets || false,
                    },
            };
             console.log("Sending body:", body);

            const res = await fetch(`${BASE_API_URL}${ALL_VENUES}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
                body: JSON.stringify(body),
            });

            if(!res.ok) throw new Error("Failed to create new venue");


            toast.success("Venue created!");
            await refreshUser();
            reset();
            onClose();
        } catch(err) {
            console.log("noe gikk galt i forsøket om å lage en ny venue", err);
            toast.error("Could not create new venue");
        }
    }

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
         <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className="text-xl font-semibold text-center mb-4">Create a new venue</h2>

            <FormProvider {... methods}>
                    <form onSubmit={handleSubmit(createVenue)} className="flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow-inner">
                    <input 
                        {...register("name")}
                        placeholder="Venue name"
                        className="border px-3 py-2 rounded"
                    />
                    {errors.name && <p className="text-xs text-red-600">Please name your venue</p>}

                    <textarea
                        {...register("description")}
                        placeholder="Description"
                        className="border px-3 py-2 rounded"
                    />
                    {errors.description && <p className="text-xs text-red-600">Please type inn your description of the venue</p>}

                    <input
                        type="number"
                        {...register("price")}
                        placeholder="Price per night"
                        className="border px-3 py-2 rounded"
                    />
                    {errors.price && <p className="text-xs text-red-600">Please enter the price pr night..</p>}

                    <input
                        type="number"
                        {...register("maxGuests")}
                        placeholder="Max guests"
                        className="border px-3 py-2 rounded"
                    />
                    {errors.maxGuests && <p className="text-xs text-red-600">How many guest is there room for?</p>}

                    <input
                        {...register("mediaUrl")}
                        placeholder="Image URL"
                        className="border px-3 py-2 rounded"
                    />
                    {errors.mediaUrl && <p className="text-xs text-red-600">Please insert a valid url</p>}

                    <input {...register("address")} placeholder="Address" className="border px-3 py-2 rounded" />
                    <input {...register("city")} placeholder="City" className="border px-3 py-2 rounded" />
                    <input {...register("country")} placeholder="Country" className="border px-3 py-2 rounded" />

                    <div className="flex gap-4">
                        <label><input type="checkbox" {...register("wifi")} /> Wifi</label>
                        <label><input type="checkbox" {...register("parking")} /> Parking</label>
                        <label><input type="checkbox" {...register("breakfast")} /> Breakfast</label>
                        <label><input type="checkbox" {...register("pets")} /> Pets</label>
                    </div>

                    <StarRating name="rating" maxStars={6} />


                    <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md w-1/2 mx-auto">
                        Create
                    </button>
                </form>
            </FormProvider>

         </div>
        </>
    );
}


 