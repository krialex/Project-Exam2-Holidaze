import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StarRating } from "../../ui/StarRating";


const venueSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().min(1, "Price must be positive").required("Price is required"),
    rating: yup.number().min(0).max(5).default(0),
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

type venueFormProps = {
    defaultValues?: any;
    onSubmit: (data: any) => void;
    submitLabel?: string;
};

export function VenueForm({ defaultValues, onSubmit, submitLabel = "Save"}: venueFormProps) {
    const methods = useForm({
        resolver: yupResolver(venueSchema),
        defaultValues: { rating: 0, ...defaultValues},
    });

    const { register, handleSubmit, formState: { errors } } = methods;

    return (
            <FormProvider {... methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-4 shadow-inner overflow-y-auto" style={{ maxHeight: "80vh" }}>
                    <input 
                        {...register("name")}
                        placeholder="Venue name"
                        className="border px-3 py-2 rounded dark:bg-gray-500"
                    />
                    {errors.name && <p className="text-xs text-red-600 dark:text-red-300">Please name your venue</p>}

                    <textarea
                        {...register("description")}
                        placeholder="Description"
                        className="border px-3 py-2 rounded dark:bg-gray-500"
                    />
                    {errors.description && <p className="text-xs text-red-600 dark:text-red-300">Please type inn your description of the venue</p>}

                    <input
                        type="number"
                        {...register("price")}
                        placeholder="Price per night"
                        className="border px-3 py-2 rounded dark:bg-gray-500"
                    />
                    {errors.price && <p className="text-xs text-red-600 dark:text-red-300">Please enter the price pr night..</p>}

                    <input
                        type="number"
                        {...register("maxGuests")}
                        placeholder="Max guests"
                        className="border px-3 py-2 rounded dark:bg-gray-500"
                    />
                    {errors.maxGuests && <p className="text-xs text-red-600 dark:text-red-300">How many guest is there room for?</p>}

                    <input
                        {...register("mediaUrl")}
                        placeholder="Image URL"
                        className="border px-3 py-2 rounded dark:bg-gray-500"
                    />
                    {errors.mediaUrl && <p className="text-xs text-red-600 dark:text-red-300">Please insert a valid url</p>}

                    <input {...register("address")} placeholder="Address" className="border px-3 py-2 rounded dark:bg-gray-500" />
                    <input {...register("city")} placeholder="City" className="border px-3 py-2 rounded dark:bg-gray-500" />
                    <input {...register("country")} placeholder="Country" className="border px-3 py-2 rounded dark:bg-gray-500" />

                    <div className="flex gap-4">
                        <label><input type="checkbox" {...register("wifi")} /> Wifi</label>
                        <label><input type="checkbox" {...register("parking")} /> Parking</label>
                        <label><input type="checkbox" {...register("breakfast")} /> Breakfast</label>
                        <label><input type="checkbox" {...register("pets")} /> Pets</label>
                    </div>

                    <StarRating name="rating" maxStars={5} />

                    <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900 transition shadow-md w-1/2 mx-auto">
                        {submitLabel}
                    </button>
                </form>
            </FormProvider>
    );
}
