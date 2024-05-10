import { useForm } from 'react-hook-form'
import { Error } from '../components/Error'
import Header from '../components/Header'
import { useLanguagesStore, useSkillsStore } from '../store/consultData'
import { Trash } from '../components/Icons'
import { postProyectRequest } from '../api/auth'
import { toast } from 'react-toastify'

const AdminDash = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { skills, addSkill, updateSkill, removeSkill } = useSkillsStore()
  const { languages, addLanguage, handleLanguageChange, removeLanguage } =
    useLanguagesStore()

  const onSubmit = async (data) => {
    const { name, description, teamSize, duration, remote, budget, client } =
      data

    const skillsWithoutId = skills.map(({ id, ...rest }) => rest)
    const languagesWithoutId = languages.map(({ id, ...rest }) => rest)

    const formData = {
      name,
      description,
      teamSize: Number(teamSize),
      duration,
      remote: Boolean(remote),
      budget,
      client,
      requiredSkills: skillsWithoutId,
      requiredLanguages: languagesWithoutId,
    }
    const res = await postProyectRequest(formData)
    if (res?.status === 201 || res?.status === 200) {
      toast.success(res?.data.message)
    } else {
      toast.error(res?.response.data.message)
    }
  }

  return (
    <main>
      <Header />
      <section className='container w-3/5 2xl:w-2/4 mx-auto py-10 bg-slate-300'>
        <div className='flex justify-evenly items-center gap-6'>
          <button
            type='button'
            className='bg-violet-600 p-3 text-white rounded'
          >
            Crear Proyecto
          </button>
          <button
            type='button'
            className='bg-violet-600 p-3 text-white rounded'
          >
            Consultores
          </button>
          <button
            type='button'
            className='bg-violet-600 p-3 text-white rounded'
          >
            Ver Proyetos
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-6 mb-10'>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='name'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Titulo*
              </label>
              <input
                type='text'
                id='name'
                placeholder='Proyecto fullstack'
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                {...register('name', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.name && <Error>{errors.name?.message}</Error>}
            </div>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='description'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Descripcion*
              </label>
              <input
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                type='text'
                id='description'
                placeholder='Proyecto para...'
                {...register('description', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.description && (
                <Error>{errors.description?.message}</Error>
              )}
            </div>

            {/*SKILLS */}
            <section className=''>
              <p className='text-center text-xl font-bold mt-8 mb-3 uppercase'>
                Agrega tus skills
              </p>
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className='flex justify-center items-center gap-4 mt-6'
                >
                  <div className='w-full justify-center items-center'>
                    <label
                      htmlFor={`name_${skill.id}`}
                      className='text-black font-semibold relative block top-2 -mt-6 ml-[7px] px-[3px] bg-white w-fit'
                    >
                      Skill
                    </label>
                    <input
                      type='text'
                      id={`name_${skill.id}`}
                      placeholder='Ingrese su habilidad'
                      value={skill.name}
                      {...register(`name_${skill.id}`, {
                        required: 'Campo Obligatorio',
                      })}
                      onChange={(e) =>
                        updateSkill(skill.id, 'name', e.target.value)
                      }
                      className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                    />
                  </div>
                  <select
                    id={`type_${skill.id}`}
                    {...register(`type_${skill.id}`, {
                      required: 'Campo Obligatorio',
                    })}
                    value={skill.type}
                    onChange={(e) =>
                      updateSkill(skill.id, 'type', e.target.value)
                    }
                    className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                  >
                    <option value=''>Seleccione...</option>
                    <option value='SOFT'>soft</option>
                    <option value='HARD'>hard</option>
                  </select>
                  <button type='button' onClick={() => removeSkill(skill.id)}>
                    <Trash />
                  </button>
                </div>
              ))}

              {errors.skills && <Error>{errors.skills?.message}</Error>}
              <button
                type='button'
                onClick={addSkill}
                className={`${
                  skills.length > 0
                    ? 'inline-flex transition-all duration-500 transform translate-x-1'
                    : 'mx-auto block transition-all duration-500 transform translate-x-0'
                } mt-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#7957FF] hover:bg-[#6043d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Agregar Skill
              </button>
            </section>

            {/* Languages */}
            <section className=''>
              <p className='text-center text-xl font-bold mt-8 mb-3 uppercase'>
                Agrega tus Idiomas
              </p>
              {languages.map((language) => (
                <div
                  key={language.id}
                  className='flex justify-center items-center gap-4 mt-6'
                >
                  <div className='w-full justify-center items-center'>
                    <label
                      htmlFor={`name_${language.id}`}
                      className='text-black font-semibold relative block top-2 -mt-6 ml-[7px] px-[3px] bg-white w-fit'
                    >
                      Idioma
                    </label>
                    <input
                      id={`name_${language.id}`}
                      type='text'
                      placeholder='Ingrese un idioma'
                      value={language.value}
                      onChange={(e) =>
                        handleLanguageChange(
                          language.id,
                          'name',
                          e.target.value
                        )
                      }
                      className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                    />
                  </div>
                  <select
                    {...register(`skills.${language.id}.level`, {
                      required: 'Campo Obligatorio',
                    })}
                    value={language.level}
                    onChange={(e) =>
                      handleLanguageChange(language.id, 'level', e.target.value)
                    }
                    className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                  >
                    <option value=''>Seleccione Nivel</option>
                    <option value='BASIC'>Básico</option>
                    <option value='MEDIUM'>Intermedio</option>
                    <option value='HIGH'>Avanzado</option>
                  </select>
                  <button
                    type='button'
                    onClick={() => removeLanguage(language.id)}
                  >
                    <Trash />
                  </button>
                </div>
              ))}
              {errors.language && <Error>{errors.language?.message}</Error>}
              <button
                type='button'
                onClick={addLanguage}
                className={`${
                  languages.length > 0
                    ? 'inline-flex transition-all duration-500 transform translate-x-1'
                    : 'mx-auto block transition-all duration-500 transform translate-x-0'
                } mt-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#7957FF] hover:bg-[#6043d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Agregar Idioma
              </button>
            </section>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='teamSize'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Tamaño de equipo*
              </label>
              <input
                type='number'
                id='teamSize'
                placeholder='5'
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                {...register('teamSize', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.teamSize && <Error>{errors.teamSize?.message}</Error>}
            </div>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='duration'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Duracion*
              </label>
              <input
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                type='text'
                id='duration'
                placeholder='3 meses'
                {...register('duration', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.duration && <Error>{errors.duration?.message}</Error>}
            </div>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='remote'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'
              >
                Remoto*
              </label>
              <select
                id='remote'
                {...register('remote', {
                  required: 'Campo Obligatorio',
                })}
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
              >
                <option value=''>Seleccione...</option>
                <option value='true'>si</option>
                <option value='false'>no</option>
              </select>
              {errors.remote && <Error>{errors.remote?.message}</Error>}
            </div>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='budget'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Presupuesto*
              </label>
              <input
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                type='number'
                min={0}
                id='budget'
                placeholder='120.000'
                {...register('budget', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.budget && <Error>{errors.budget?.message}</Error>}
            </div>
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor='client'
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-slate-300 w-fit'
              >
                Cliente*
              </label>
              <input
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                type='text'
                id='client'
                placeholder='Google Account, Fernandez'
                {...register('client', {
                  required: 'Campo Obligatorio',
                })}
              />
              {errors.client && <Error>{errors.client?.message}</Error>}
            </div>
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              className='block ml-auto items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Enviar
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AdminDash
