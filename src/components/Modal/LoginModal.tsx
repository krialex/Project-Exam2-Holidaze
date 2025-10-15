import { useState } from "react";
import { Login } from "../../common/auth/api/Login";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./../../common/validationSchemas";
import { toast } from "react-toastify";


type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(loginSchema),
    });
    const { refreshUser } = useUser();

    if(!isOpen) return null;

    async function handleLogin(data: any) {
        try {
            await Login(data.email, data.password);
            await refreshUser();
            toast.success("Logged in successfully!");
            onClose();
        } catch (error) {
            console.log("Login failed");
            toast.error("Login failed. Check your email and password.")
        }
    }

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white dark:bg-gray-700 dark:text-white text-black rounded-lg shadow-lg z-50 w-11/12 max-w-md p-6">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Log in</h2>
            
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
              <input {...register("email")} placeholder="Your email.." className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-800  dark:bg-gray-500" />
              {errors.email && <p className="text-xs text-red-600 dark:text-red-300 italic">Please insert your @stud.noroff.no email</p>}

              <input {...register("password")} type="password" placeholder="Your password.." className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-800 dark:bg-gray-500" />
              {errors.password && <p className="text-xs text-red-600 dark:text-red-300 italic">Please insert your password</p>}

              <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900 transition">
                Log in
              </button>
            </form>
          </div>
          </>
  );

}

