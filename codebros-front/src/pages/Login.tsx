import { useForm } from 'react-hook-form'
import { Error } from '../components/Error'
import { loginRequest } from '../api/auth'
import { LoginUser } from '../types'
import { toast } from 'react-toastify'
import { useAuthStore } from '../store/auth'
import { useLocation } from 'wouter'

const Login = () => {
  const [, navigate] = useLocation()
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm<LoginUser>()
  const setToken = useAuthStore((state) => state.setToken)

  async function LoginUser(data: LoginUser) {
    const resLogin = await loginRequest(data)

    if (resLogin?.status === 201 || resLogin?.status === 200) {
      const { token, role } = resLogin.data.data
      toast.success(resLogin?.data.message)
      setToken(token, role)

      if (role === 'CONSULTANT') {
        navigate('/consultant-dashboard')
      } else if (role === 'MANAGER') {
        navigate('/admin-dashboard')
      }
    } else {
      toast.error(resLogin?.data.message)
    }
  }
  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <form
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
        onSubmit={handleSubmit(LoginUser)}
      >
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

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value='Submit'
        />
      </form>
    </div>
  )
}

export default Login
