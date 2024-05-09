import { Error } from '../components/Error'

const MainInformation = ({ register, errors }) => {
  return (
    <>
      <h1>Datos principales</h1>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-gray-700'
          >
            Pais
          </label>
          <input
            type='text'
            id='country'
            {...register('country', {
              required: 'Campo Obligatorio',
            })}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
          {errors.country && <Error>{errors.country?.message}</Error>}
        </div>
        <div>
          <label
            htmlFor='city'
            className='block text-sm font-medium text-gray-700'
          >
            Ciudad
          </label>
          <input
            type='text'
            id='city'
            {...register('city', {})}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
          {errors.city && <Error>{errors.city?.message}</Error>}
        </div>
        <div>
          <label
            htmlFor='employmentStatus'
            className='block text-sm font-medium text-gray-700'
          >
            Tipo de contrato
          </label>
          <select
            id='employmentStatus'
            {...register('employmentStatus', {})}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value=''>Seleccione...</option>
            <option value='FULL_TIME'>Tiempo Completo</option>
            <option value='PART_TIME'>Medio Tiempo</option>
            <option value='CONTRACT'>Contrato</option>
          </select>
          {errors.employmentStatus && (
            <Error>{errors.employmentStatus?.message}</Error>
          )}
        </div>
        <div>
          <label
            htmlFor='avalibleHours'
            className='block text-sm font-medium text-gray-700'
          >
            Horas Disponibles
          </label>
          <input
            type='number'
            min={0}
            max={24}
            id='avalibleHours'
            {...register('avalibleHours', {})}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
          {errors.avalibleHours && (
            <Error>{errors.avalibleHours?.message}</Error>
          )}
        </div>
        <div>
          <label
            htmlFor='willingToTravel'
            className='block text-sm font-medium text-gray-700'
          >
            ¿Dispuesto a viajar?
          </label>
          <select
            id='willingToTravel'
            {...register('willingToTravel', {})}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value=''>Seleccione...</option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
          {errors.willingToTravel && (
            <Error>{errors.willingToTravel?.message}</Error>
          )}
        </div>
        <div>
          <label
            htmlFor='provisionForRemoteWork'
            className='block text-sm font-medium text-gray-700'
          >
            ¿Disponible para trabajo remoto?
          </label>
          <select
            id='provisionForRemoteWork'
            {...register('provisionForRemoteWork', {})}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value=''>Seleccione...</option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
          {errors.provisionForRemoteWork && (
            <Error>{errors.provisionForRemoteWork?.message}</Error>
          )}
        </div>
        <div>
          <label
            htmlFor='feeFees'
            className='block text-sm font-medium text-gray-700'
          >
            Tarifa por hora
          </label>
          <input
            type='number'
            min={0}
            id='feeFees'
            {...register('feeFees', {})}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
          {errors.feeFees && <Error>{errors.feeFees?.message}</Error>}
        </div>
      </div>
    </>
  )
}

export default MainInformation
