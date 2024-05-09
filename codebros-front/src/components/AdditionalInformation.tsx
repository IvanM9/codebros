import {
  useCertificationsStore,
  useExperiencesStore,
  useLanguagesStore,
  useSkillsStore,
} from '../store/consultData'
import { Error } from './Error'
import {Trash} from './Icons'

const AdditionalInformation = ({ register, errors }) => {
  const { skills, addSkill, updateSkill, removeSkill } = useSkillsStore()
  const { languages, addLanguage, handleLanguageChange, removeLanguage } =
    useLanguagesStore()
  const {
    experiences,
    addExperience,
    removeExperience,
    handleExperienceChange,
  } = useExperiencesStore()
  const {
    certifications,
    addCertification,
    handleCertificationChange,
    removeCertification,
  } = useCertificationsStore()

  return (
    <>
      <p className='mt-20'>Informacion adicional</p>
      <section className="flex flex-col gap-3">
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='portfolio'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'
          >
            Portfolio
          </label>
          <input
            type='url'
            id='portfolio'
            placeholder='https://portfolio.com'
            {...register('portfolio', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Por favor ingrese un enlace válido',
              },
            })}
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

          />
          {errors.portfolio && (
            <Error>{errors.portfolio?.message?.toString()}</Error>
          )}
        </div>
        
        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='linkedIn'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

          >
            Linkedin*
          </label>
          <input
            type='url'
            id='linkedIn'
            placeholder='https://linkedin.com'
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
            {...register('linkedIn', {
              required: "El campo Linkedin es obligatorio",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Por favor ingrese un enlace válido',
              },
            })}
          />
          {errors.linkedIn && <Error>{errors.linkedIn?.message}</Error>}
        </div>

        <div className='input flex flex-col w-full static'>
          <label
            htmlFor='github'
            className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

          >
            GitHub*
          </label>
          <input
            type='url'
            id='github'
            placeholder='https://github.com'
            className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

            {...register('github', {
              required: "El campo GitHub es obligatorio",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Por favor ingrese un enlace válido',
              },
            })}
          />
          {errors.github && <Error>{errors.github?.message}</Error>}
        </div>
      </section>

      <p>SKILLS</p>
      <section className='mt-10'>
        {skills.map((skill) => (
          <div key={skill.id} className='flex justify-center items-center gap-4 mb-6'>
            <div className="w-full justify-center items-center">
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
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
              />
            </div>
            <select
              id={`type_${skill.id}`}
              {...register(`type_${skill.id}`, {
                required: 'Campo Obligatorio',
              })}
              value={skill.type}
              onChange={(e) => updateSkill(skill.id, 'type', e.target.value)}
              className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

            >
              <option value=''>Seleccione...</option>
              <option value='SOFT'>soft</option>
              <option value='HARD'>hard</option>
            </select>
            <button
              type='button'
              onClick={() => removeSkill(skill.id)}
            >
              <Trash/>
            </button>
          </div>
        ))}

        {errors.skills && <Error>{errors.skills?.message}</Error>}
        <button
          type='button'
          onClick={addSkill}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Agregar Skill
        </button>
      </section>

      {/* Languages */}
      <section className='mt-10'>
        {languages.map((language) => (
          <div key={language.id} className='flex justify-center items-center gap-4 mb-6'>
            <div className="w-full justify-center items-center">
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
                  handleLanguageChange(language.id, 'name', e.target.value)
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
              <Trash/>
            </button>
          </div>
        ))}
        {errors.language && <Error>{errors.language?.message}</Error>}
        <button
          type='button'
          onClick={addLanguage}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Agregar Idioma
        </button>
      </section>

      {/* Experiences */}
      <section>
        {experiences.map((experience) => (
          <div key={experience.id} className='grid grid-cols-2 gap-6'>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`title-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'
              >
                Título*:
              </label>
              <input
                type='text'
                id={`title-${experience.id}`}
                value={experience.title}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'title', e.target.value)
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                placeholder='Ingrese el título'
              />
            </div>

            {/* Empresa */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`company-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'
              >
                Empresa:
              </label>
              <input
                type='text'
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'company',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la empresa'
              />
            </div>

            {/* Posición */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`position-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Posición:
              </label>
              <input
                type='text'
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'position',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la posición'
              />
            </div>

            {/* Ubicación */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`location-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Ubicación:
              </label>
              <input
                type='text'
                id={`location-${experience.id}`}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'location',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la ubicación'
              />
            </div>

            {/* Fecha de inicio */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`startDate-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Fecha de inicio:
              </label>
              <input
                type='date'
                id={`startDate-${experience.id}`}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'startDate',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

              />
            </div>

            {/* Fecha de fin */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`endDate-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Fecha de fin:
              </label>
              <input
                type='date'
                id={`endDate-${experience.id}`}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'endDate',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

              />
            </div>

            {/* Descripción */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`description-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Descripción:
              </label>
              <textarea
                id={`description-${experience.id}`}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'description',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese una descripción'
              ></textarea>
            </div>

            {/* Industria */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`industry-${experience.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Industria:
              </label>
              <input
                type='text'
                id={`industry-${experience.id}`}
                onChange={(e) =>
                  handleExperienceChange(
                    experience.id,
                    'industry',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la industria'
              />
            </div>

            <button
              type='button'
              onClick={() => removeExperience(experience.id)}
            >
              <Trash/>
            </button>
          </div>
        ))}
        <button
          type='button'
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={addExperience}
        >
          Agregar Experiencia
        </button>
      </section>

      {/* Certifications */}
      <section>
        <p className='mt-20'>CERTIFICACIONES</p>

        {certifications.map((cerification) => (
          <div key={cerification.id} className='grid grid-cols-2 gap-6'>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`name-${cerification.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'
              >
                Título*:
              </label>
              <input
                type='text'
                id={`name-${cerification.id}`}
                value={cerification.name}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'name',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'
                placeholder='Ingrese el título'
              />
            </div>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`authority-${cerification.id}`}
                                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Autoridad:
              </label>
              <input
                type='text'
                id={`authority-${cerification.id}`}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'authority',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la autoridad de la certificación'
              />
            </div>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`license-${cerification.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Licencia:
              </label>
              <input
                type='text'
                id={`license-${cerification.id}`}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'license',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la licencia de la certificación'
              />
            </div>

            {/* Fecha de inicio */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`startDate-${cerification.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Fecha de inicio:
              </label>
              <input
                type='date'
                id={`startDate-${cerification.id}`}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'startDate',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

              />
            </div>

            {/* Fecha de fin */}
            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`endDate-${cerification.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                Fecha de fin:
              </label>
              <input
                type='date'
                id={`endDate-${cerification.id}`}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'endDate',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

              />
            </div>

            <div className='input flex flex-col w-full static'>
              <label
                htmlFor={`url-${cerification.id}`}
                className='text-black font-semibold relative block top-2 ml-[7px] px-[3px] bg-white w-fit'

              >
                URL:
              </label>
              <input
                type='url'
                id={`url-${cerification.id}`}
                {...register('url', {
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: 'Por favor ingrese una URL válida',
                  },
                })}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'url',
                    e.target.value
                  )
                }
                className='border-gray-800 input px-[10px] py-[11px] text-sm bg-transparent border-2 rounded-[5px] w-full block focus:outline-none placeholder:text-black/50'

                placeholder='Ingrese la URL de la certificación'
              />
            </div>

            <button
              type='button'
              onClick={() => removeCertification(cerification.id)}
            >
              <Trash/>
            </button>
          </div>
        ))}
        <button
          type='button'
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={addCertification}
        >
          Agregar Certificacion
        </button>
      </section>
    </>
  )
}

export default AdditionalInformation
