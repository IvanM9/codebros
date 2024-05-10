import { useForm } from 'react-hook-form'
import { Error } from '../components/Error'
import type { DraftDeveloper } from '../types'
import { registerRequest } from '../api/auth'
import { toast } from 'react-toastify'
import { useLocation } from 'wouter'
import Logo from '../components/logo'
import { useState, useEffect } from 'react'

const Register = () => {
  const [, navigate] = useLocation()
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<DraftDeveloper>()
  const [backgroundColor, setBackgroundColor] = useState('bg-red-200')

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor((prevColor) => {
        switch (prevColor) {
          case 'bg-red-200':
            return 'bg-green-200'
          case 'bg-green-200':
            return 'bg-blue-200'
          case 'bg-blue-200':
            return 'bg-yellow-200'
          case 'bg-yellow-200':
            return 'bg-purple-200'
          case 'bg-purple-200':
            return 'bg-pink-200'
          case 'bg-pink-200':
            return 'bg-red-200'
          default:
            return 'bg-red-200'
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  async function registerDeveloper(data: DraftDeveloper) {
    const resRegister = await registerRequest(data)
    if (resRegister?.status === 201 || resRegister?.status === 200) {
      reset()
      toast.success(resRegister?.data.message)
      navigate('/login')
    } else {
      toast.error(resRegister?.data.message)
    }
  }

  return (
    <div className={`flex justify-center items-center min-h-screen ${backgroundColor}`}>
      <div className="md:w-1/2 lg:w-2/5 mx-5">
        <Logo />
        <form
          className="bg-gray-900 shadow-md rounded-lg py-10 px-5"
          noValidate
          onSubmit={handleSubmit(registerDeveloper)}
        >
          <div className="mb-5">
            <label htmlFor="name" className="text-xs uppercase font-bold text-white">
              Nombres
            </label>
            <input
              id="firstName"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-800"
              type="text text-white "
              placeholder="nombres"
              {...register('firstName', { required: 'El nombre es obligatorio' })}
            />
            {errors.firstName && <Error>{errors.firstName?.message}</Error>}
          </div>
          <div className="mb-5">
            <label htmlFor="lastName" className="text-xs uppercase font-bold text-white">
              Apelllidos
            </label>
            <input
              id="lastName"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-8000"
              type="text"
              placeholder="apellidos"
              {...register('lastName', { required: 'El Apellido es obligatorio' })}
            />
            {errors.lastName && <Error>{errors.lastName?.message}</Error>}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-xs uppercase font-bold text-white">
              Email
            </label>
            <input
              id="email"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-800"
              type="email"
              placeholder="correo@corre.com"
              {...register('email', {
                required: 'El Email es Obligatorio',
                pattern: {
                  value: /^\[A-Z0-9.\_%+-\]+@\[A-Z0-9.-\]+\.\[A-Z\]{2,}$/i,
                  message: 'Email No Válido',
                },
              })}
            />
            {errors.email && <Error>{errors.email?.message}</Error>}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-xs uppercase font-bold text-white">
              Contraseña
            </label>
            <input
              id="password"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-800"
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
          <div className="mb-5">
            <label htmlFor="phone" className="text-xs uppercase font-bold text-white">
              Telefono
            </label>
            <input
              id="phone"
              className="w-full p-1 rounded-md  bg-gray-800 hover:bg-gray-800"
              type="tel"
              placeholder="0900000000"
              {...register('phone', {
                required: 'El telefono es obligatorio',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'El número de teléfono debe tener 10 dígitos numéricos',
                },
              })}
            />
            {errors.phone && <Error>{errors.phone?.message}</Error>}
          </div>
          <input
            type="submit"
            className="bg-[#7957FF]  p-2 text-white   shadow-lg rounded-md shadow-indigo-500/50 hover:bg-indigo-700 cursor-pointer transition-colors"
            value="resgistrar"
          />
        </form>
      </div>
    </div>
  )
}

export default Register
