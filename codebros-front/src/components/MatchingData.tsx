import React from 'react'

const MatchingInfo = ({ matchingData }) => {
  if (!matchingData) {
    return null // Si no hay datos, no renderizar nada
  }

  return (
    <>
      <p className='absolute top-16 lg:top-5 text-2xl font-bold text-gray-900 mb-10'>
        Mejores propuestas
      </p>
      <div className='w-full grid grid-cols-responsive gap-10 mt-14'>
        {matchingData.map((info) => {
          return (
            <div
              key={info.id}
              className='rounded-lg border border-stone bg-gray-200 shadow-lg p-6 lg:p-8 text-lg'
            >
              <div className='flex justify-between items-center my-3 text-lg text-gray-900 font-bold '>
                <div className=''>{info.name}</div>
                <div className=''>Compatibilidad: {info.matchPercentage} %</div>
              </div>
              {/* Renderizar el array interno advantages */}
              <div className='mb-2'>
                <h3 className='font-bold mb-1'>Ventajas:</h3>
                <ul className='list-disc list-inside'>
                  {info.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>
              {/* Renderizar el array interno disadvantages */}
              <div className='mb-2'>
                <h3 className='font-bold mb-1'>Desventajas:</h3>
                <ul className='list-disc list-inside'>
                  {info.disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
                  ))}
                </ul>
              </div>
              {/* Renderizar el array de skills */}
              <div className='mb-2'>
                <h3 className='font-bold mb-1'>Skills:</h3>
                <ul className='list-disc list-inside'>
                  {info.profile.skills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
                  ))}
                </ul>
              </div>
              {/* Renderizar el array de lenguajes */}
              <div>
                <h3 className='font-bold mb-1'>Idiomas:</h3>
                <ul className='list-disc list-inside'>
                  {info.profile.languages.map((language, index) => (
                    <li key={index}>{language.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MatchingInfo
