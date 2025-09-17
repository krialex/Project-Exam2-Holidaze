import { useState } from "react";
import { UpdateProfile } from "../../common/auth/api/UpdateProfile";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { editProfileSchema } from "./../../common/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";


type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function EditModal({ isOpen, onClose}: EditModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(editProfileSchema),
    });
    const { refreshUser } = useUser();

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
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          ></div>

          <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6">

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              Update your profile</h2>

            <form
              onSubmit={handleSubmit(updateUser)}
              className="flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow-inner"
            >
              <div>
                <input
                  {...register("bio")}
                  placeholder="Tell everyone about you.."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("avatarUrl")}
                  placeholder="Update your avatar with an URL.."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {errors.avatarUrl && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.avatarUrl.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-md w-1/2 mx-auto"
              >
                Update
              </button>
            </form>
          </div>
        </>
    )
}

