import {
  useCertificationsStore,
  useExperiencesStore,
  useLanguagesStore,
  useSkillsStore,
} from '../store/consultData'
import { Error } from './Error'

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
      <div className='mb-4'>
        <label
          htmlFor='portfolio'
          className='block text-sm font-medium text-gray-700'
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
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
        {errors.portfolio && (
          <Error>{errors.portfolio?.message?.toString()}</Error>
        )}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='linkedIn'
          className='block text-sm font-medium text-gray-700'
        >
          Linkedin
        </label>
        <input
          type='url'
          id='linkedIn'
          placeholder='https://linkedin.com'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          {...register('linkedIn', {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Por favor ingrese un enlace válido',
            },
          })}
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='github'
          className='block text-sm font-medium text-gray-700'
        >
          GitHub
        </label>
        <input
          type='url'
          id='github'
          placeholder='https://github.com'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          {...register('github', {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Por favor ingrese un enlace válido',
            },
          })}
        />
      </div>

      <p>SKILLS</p>
      <div className='mt-10'>
        {skills.map((skill) => (
          <div key={skill.id} className='flex gap-4'>
            <input
              type='text'
              id={`name_${skill.id}`}
              placeholder='Ingrese su habilidad'
              value={skill.name}
              {...register(`name_${skill.id}`, {
                required: 'Campo Obligatorio',
              })}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              className='mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
            <select
              id={`type_${skill.id}`}
              {...register(`type_${skill.id}`, {
                required: 'Campo Obligatorio',
              })}
              value={skill.type}
              onChange={(e) => updateSkill(skill.id, 'type', e.target.value)}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value=''>Seleccione...</option>
              <option value='SOFT'>soft</option>
              <option value='HARD'>hard</option>
            </select>
            <button
              type='button'
              onClick={() => removeSkill(skill.id)}
              className='mt-1 ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Eliminar
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
      </div>

      {/* Languages */}
      <div className='mt-10'>
        {languages.map((language) => (
          <div key={language.id} className='flex gap-4'>
            <input
              id='name'
              type='text'
              placeholder='Ingrese un idioma'
              value={language.value}
              onChange={(e) =>
                handleLanguageChange(language.id, 'value', e.target.value)
              }
              className='mt-1 mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            />
            <select
              {...register(`skills.${language.id}.level`, {
                required: 'Campo Obligatorio',
              })}
              value={language.level}
              onChange={(e) =>
                handleLanguageChange(language.id, 'level', e.target.value)
              }
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value=''>Seleccione Nivel</option>
              <option value='BASIC'>Básico</option>
              <option value='MEDIUM'>Intermedio</option>
              <option value='HIGH'>Avanzado</option>
            </select>
            <button
              type='button'
              onClick={() => removeLanguage(language.id)}
              className='mt-1 ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Eliminar
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
      </div>

      {/* Experiences */}
      <div>
        {experiences.map((experience) => (
          <div key={experience.id}>
            <div className='mb-4'>
              <label
                htmlFor={`title-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
              >
                Título:
              </label>
              <input
                type='text'
                id={`title-${experience.id}`}
                value={experience.title}
                onChange={(e) =>
                  handleExperienceChange(experience.id, 'title', e.target.value)
                }
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese el título'
              />
            </div>

            {/* Empresa */}
            <div className='mb-4'>
              <label
                htmlFor={`company-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la empresa'
              />
            </div>

            {/* Posición */}
            <div className='mb-4'>
              <label
                htmlFor={`position-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la posición'
              />
            </div>

            {/* Ubicación */}
            <div className='mb-4'>
              <label
                htmlFor={`location-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la ubicación'
              />
            </div>

            {/* Fecha de inicio */}
            <div className='mb-4'>
              <label
                htmlFor={`startDate-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>

            {/* Fecha de fin */}
            <div className='mb-4'>
              <label
                htmlFor={`endDate-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>

            {/* Descripción */}
            <div className='mb-4'>
              <label
                htmlFor={`description-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese una descripción'
              ></textarea>
            </div>

            {/* Industria */}
            <div className='mb-4'>
              <label
                htmlFor={`industry-${experience.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la industria'
              />
            </div>

            <button
              type='button'
              onClick={() => removeExperience(experience.id)}
              className='mt-1 ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Eliminar
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
      </div>

      {/* Certifications */}
      <div>
        <p className='mt-20'>CERTIFICACIONES</p>

        {certifications.map((cerification) => (
          <div key={cerification.id}>
            <div className='mb-4'>
              <label
                htmlFor={`name-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
              >
                Nombre de la certificación:
              </label>
              <input
                type='text'
                id={`name-${cerification.id}`}
                onChange={(e) =>
                  handleCertificationChange(
                    cerification.id,
                    'name',
                    e.target.value
                  )
                }
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese el nombre de la certificación'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor={`authority-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la autoridad de la certificación'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor={`license-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la licencia de la certificación'
              />
            </div>

            {/* Fecha de inicio */}
            <div className='mb-4'>
              <label
                htmlFor={`startDate-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>

            {/* Fecha de fin */}
            <div className='mb-4'>
              <label
                htmlFor={`endDate-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor={`url-${cerification.id}`}
                className='block text-sm font-medium text-gray-700'
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
                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                placeholder='Ingrese la URL de la certificación'
              />
            </div>
            <button
              type='button'
              onClick={() => removeCertification(cerification.id)}
              className='mt-1 ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Eliminar
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
      </div>
    </>
  )
}

export default AdditionalInformation
