import { useState } from "react";
import { Register } from "../../common/auth/api/Register"; 
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./../../common/validationSchemas";
import { Login } from "../../common/auth/api/Login";
import { toast } from "react-toastify";

type RegisterModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(registerSchema),
    });
    const { refreshUser } = useUser();

    if(!isOpen) return null;

     async function handleRegister(data: any) {
    try {
      await Register(data.name, data.email, data.password, data.isManager);
      await Login(data.email, data.password);
      await refreshUser();
      toast.success("Registration successful!");
      onClose();
    } catch (error) {
      console.log("Registration failed");
      toast.error("Something went wrong. Try again.");
    }
  }

    return (
        <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>    
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   bg-white text-black rounded-lg shadow-lg z-50 w-11/12 max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
            <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">

          <input {...register("name")} placeholder="Your name.." className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />  
          {errors.name && <p className="text-xs text-red-600 italic">Your name can only contain letters, numbers and underscores</p>}

          <input {...register("email")} placeholder="Your email.." className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          {errors.email && <p className="text-xs text-red-600 italic">Please insert your @stud.noroff.no email</p>}

          <input {...register("password")} type="password" placeholder="Your password.." className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          {errors.password &&<p className="text-xs text-red-600 italic">Password must be at least 8 characters</p>}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isManager")} className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
            Register as manager
          </label>

          <button type="submit" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Register
          </button>
        </form>
      </div>
    </>
  );

}

