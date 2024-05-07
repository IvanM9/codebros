import { useForm } from 'react-hook-form'
import { Error } from '../components/Error'
import type { DraftDeveloper } from '../types'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DraftDeveloper>()

  function registerDeveloper(data: DraftDeveloper) {
    console.log(data)
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <form
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
        onSubmit={handleSubmit(registerDeveloper)}
      >
        <div className='mb-5'>
          <label htmlFor='name' className='text-sm uppercase font-bold'>
            Nombres
          </label>
          <input
            id='name'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Code'
            {...register('name', {
              required: 'El nombre es obligatorio',
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label htmlFor='lastName' className='text-sm uppercase font-bold'>
            Apellidos
          </label>
          <input
            id='lastName'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Bros'
            {...register('lastName', {
              required: 'El Apellido es obligatorio',
            })}
          />
          {errors.lastName && <Error>{errors.lastName?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='text-sm uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            className='w-full p-3  border border-gray-100'
            type='email'
            placeholder='correo@corre.com'
            {...register('email', {
              required: 'El Email es Obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido',
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label htmlFor='password' className='text-sm uppercase font-bold'>
            Contraseña
          </label>
          <input
            id='password'
            className='w-full p-3  border border-gray-100'
            type='password'
            {...register('password', {
              required: 'La contraseña es obligatoria',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{6,}$/,
                message:
                  'Minimo 6 caracteres, 1 minúscula, 1 mayúscula y 1 número',
              },
            })}
          />
          {errors.password && <Error>{errors.password?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label htmlFor='tel' className='text-sm uppercase font-bold'>
            Telefono
          </label>
          <input
            id='tel'
            className='w-full p-3  border border-gray-100'
            type='tel'
            {...register('tel', {
              required: 'La contraseña es obligatoria',
              pattern: {
                value: /^\d{10}$/,
                message:
                  'El número de teléfono debe tener 10 dígitos numéricos',
              },
            })}
          />
          {errors.tel && <Error>{errors.tel?.message}</Error>}
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value='Submit'
        />
      </form>
    </div>
  )
}

export default Register
