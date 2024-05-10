import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Error } from '../components/Error';
import { loginRequest } from '../api/auth';
import { LoginUser } from '../types';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth';
import { useLocation } from 'wouter';
import logoImage from '../assets/original-removebg-preview.png';
import emailLogo from '../assets/agrandado-removebg-preview.png';

const Login = () => {
  const [, navigate] = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>();
  const setToken = useAuthStore((state) => state.setToken);
  const [backgroundColor, setBackgroundColor] = useState('bg-red-200');

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor((prevColor) => {
        switch (prevColor) {
          case 'bg-red-200':
            return 'bg-green-200';
          case 'bg-green-200':
            return 'bg-blue-200';
          case 'bg-blue-200':
            return 'bg-yellow-200';
          case 'bg-yellow-200':
            return 'bg-purple-200';
          case 'bg-purple-200':
            return 'bg-pink-200';
          case 'bg-pink-200':
            return 'bg-red-200';
          default:
            return 'bg-red-200';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function LoginUser(data: LoginUser) {
    const resLogin = await loginRequest(data);
    if (resLogin?.status === 201 || resLogin?.status === 200) {
      const { token, role } = resLogin.data.data;
      toast.success(resLogin?.data.message);
      setToken(token, role);
      if (role === 'CONSULTANT') {
        navigate('/consultant-dashboard');
      } else if (role === 'MANAGER') {
        navigate('/admin-dashboard');
      }
    } else {
      toast.error(resLogin?.data.message);
    }
  }

  return (
    <div className={`min-h-screen ${backgroundColor} flex justify-center items-center`}>
      <div className="absolute top-0 left-0 m-4">
        <img src={logoImage} alt="Logo" className="h-12" />
      </div>
      <div className="bg-gray-900 p-8 rounded-lg text-white md:w-1/2 lg:w-2/5 mx-5 relative">
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full ">
            <img src={emailLogo} alt="Email Logo" className="h-12" />
          </div>
        </div>
        <hr className="border-gray-700 mb-4" />
        <form noValidate onSubmit={handleSubmit(LoginUser)}>
          <div className=" mb-5">
            <label htmlFor=" email" className="text-xs uppercase font-bold">
              Correo electrónico:
            </label>
            <input
              id="email"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-800"
              type="email"
              placeholder="correo@corre.com"
              {...register('email', {
                required: 'El Email es Obligatorio',
                pattern: {
                  value: /^\[A-Z0-9.\_%+-\]+@\[A-Z0-9.-\]+\\.\[A-Z\]{2,}$/i,
                  message: 'Email No Válido',
                },
              })}
            />
            {errors.email && <Error>{errors.email?.message}</Error>}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-xs uppercase font-bold">
              Contraseña
            </label>
            <input
              id="password"
              className="w-full p-1 rounded-md bg-gray-800 hover:bg-gray-800"
              type="password"
              placeholder="**********"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,}$/,
                  message: 'Minimo 6 caracteres, 1 minúscula, 1 mayúscula y 1 número',
                },
              })}
            />
            {errors.password && <Error>{errors.password?.message}</Error>}
          </div>
          <input
            type="submit"
            className="bg-[#7957FF]  p-2 text-white   shadow-lg rounded-md shadow-indigo-500/50 hover:bg-indigo-700 cursor-pointer transition-colors"
            value="login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
