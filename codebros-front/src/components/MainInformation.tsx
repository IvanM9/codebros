import { Error } from '../components/Error'

const MainInformation = ({ register, errors }) => {
  return (
    <>
      <p className='text-center text-4xl font-bold py-4 uppercase'>
        MIS DATOS
      </p>
      <div className='grid grid-cols-2 gap-6 mb-10'>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='country'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            Pais*
          </label>
          <input
            type='text'
            id='country'
            placeholder='Ecuador'
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
            {...register('country', {
              required: 'Campo Obligatorio',
            })}
          />
          {errors.country && <Error>{errors.country?.message}</Error>}
        </div>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='city'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            Ciudad*
          </label>
          <input
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
            type='text'
            id='city'
            placeholder='Guayaquil, Quito'
            {...register('city', {
              required: 'Campo Obligatorio',
            })}
          />
          {errors.city && <Error>{errors.city?.message}</Error>}
        </div>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='employmentStatus'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            Tipo de contrato*
          </label>
          <select
            id='employmentStatus'
            {...register('employmentStatus', {
              required: 'Campo Obligatorio',
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
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
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='avalibleHours'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            Horas Disponibles*
          </label>
          <input
            placeholder='0'
            type='number'
            min={0}
            max={24}
            id='avalibleHours'
            {...register('avalibleHours', {
              required: 'Campo Obligatorio',
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
          />
          {errors.avalibleHours && (
            <Error>{errors.avalibleHours?.message}</Error>
          )}
        </div>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='willingToTravel'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            ¿Dispuesto a viajar?*
          </label>
          <select
            id='willingToTravel'
            {...register('willingToTravel', {
              required: 'Campo Obligatorio',
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
          >
            <option value=''>Seleccione...</option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
          {errors.willingToTravel && (
            <Error>{errors.willingToTravel?.message}</Error>
          )}
        </div>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='provisionForRemoteWork'
            className='text-black text-sm font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            ¿Disponible para trabajo remoto?*
          </label>
          <select
            id='provisionForRemoteWork'
            {...register('provisionForRemoteWork', {
              required: 'Campo Obligatorio',
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
          >
            <option value=''>Seleccione...</option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
          {errors.provisionForRemoteWork && (
            <Error>{errors.provisionForRemoteWork?.message}</Error>
          )}
        </div>
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='feeFees'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-200 w-fit'
          >
            Tarifa por hora*
          </label>
          <input
            placeholder='0'
            type='number'
            min={0}
            id='feeFees'
            {...register('feeFees', {
              required: 'Campo Obligatorio',
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
          />
          {errors.feeFees && <Error>{errors.feeFees?.message}</Error>}
        </div>
      </div>
    </>
  )
}

export default MainInformation
