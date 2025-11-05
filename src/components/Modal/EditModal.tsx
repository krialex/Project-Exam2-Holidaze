import { useEffect } from "react";
import { UpdateProfile } from "./../../common/auth/api/UpdateProfile/UpdateProfile";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { editProfileSchema } from "./../../common/validationSchemas";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { toast } from "react-toastify";

type EditProfileFormData = InferType<typeof editProfileSchema>;

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    defaultValues?: EditProfileFormData;
};

export function EditModal({ isOpen, onClose, defaultValues }: EditModalProps) {
    const methods = useForm<EditProfileFormData>({
        resolver: yupResolver(editProfileSchema) as any,
        defaultValues: defaultValues || {},
    });

    const { register, handleSubmit, formState: { errors }, reset, watch, } = methods;
    const { refreshUser } = useUser();
    const avatarUrl = watch("avatarUrl");

    useEffect(() => {
      if(defaultValues) reset(defaultValues);
    }, [defaultValues, reset]);

    if (!isOpen) return null;

    async function updateUser(data: any) {
        try {
            await UpdateProfile({ url: data.avatarUrl, alt: data.avatarAlt || "" }, data.bio);
            await refreshUser();
            toast.success("Profile updated!")
            onClose();
        } catch (error) {
            toast.error("Update user info failed");
        }
    }

    return (
          <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
          <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-xl shadow-xl p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"><FontAwesomeIcon icon={faXmark} /></button>
            <h2 className="text-xl font-semibold text-center mb-4">Update your profile</h2>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(updateUser)}
                className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-600 rounded-lg p-4 shadow-inner">
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Bio</label>
                  <textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell everyone about you..."
                    rows={4}
                    className="w-full border  bg-white border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none dark:bg-gray-500" />
                </div>
                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Avatar URL</label>
                  <input
                    id="avatarUrl"
                    {...register("avatarUrl")}
                    placeholder="Paste an image URL..."
                    className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-500"
                  />
                  {errors.avatarUrl && (
                    <p className="text-xs text-red-600 dark:text-red-300 italic mt-1">
                      Your avatar needs to be a valid URL
                    </p>
                  )}
                  {avatarUrl && (
                    <div className="mt-3 flex justify-center">
                      <img
                        src={avatarUrl}
                        alt="Avatar preview"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-sm"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900 transition shadow-md w-1/2 mx-auto">Update</button>
              </form>
            </FormProvider>
          </div>
        </>
    )
}
 
