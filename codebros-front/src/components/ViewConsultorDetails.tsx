const ViewConsultorDetails = ({ consultor }) => {
  if (!consultor) {
    return <div>Cargando...</div>
  }
  console.log(consultor)
  return (
    <div className='rounded-lg border border-stone bg-gray-200 shadow-lg p-6 lg:p-8 w-full'>
      <p className='text-gray-900 text-center font-bold text-xl'>
        {consultor.user.firstName} {consultor.user.lastName}
      </p>
      <div className='w-full pt-6 grid grid-cols-2 gap-x-6'>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Correo electrónico:</p>
          <p className='text-gray-600'>{consultor.user.email}</p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Ubicación:</p>
          <p className='text-gray-600'>{consultor.location}</p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Estado de empleo:</p>
          <p className='text-gray-600'>{consultor.employmentStatus}</p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Horas disponibles:</p>
          <p className='text-gray-600'>{consultor.availableHours}</p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Disponible para viajar:</p>
          <p className='text-gray-600'>
            {consultor.willingToTravel ? 'Sí' : 'No'}
          </p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Trabajo remoto:</p>
          <p className='text-gray-600'>
            {consultor.provisionForRemoteWork ? 'Sí' : 'No'}
          </p>
        </div>
        <div className='mb-4 border-b-2 border-gray-800/50 text-wrap overflow-hidden'>
          <p className='font-semibold'>Tarifa por hora:</p>
          <p className='text-gray-600'>${consultor.feeFees}</p>
        </div>
      </div>
      {consultor.certifications && consultor.certifications.length > 0 && (
        <div className='mb-4 col-span-2'>
          <p className='font-semibold'>Certificaciones:</p>
          {consultor.certifications.map((certification) => (
            <p key={certification.id} className='text-gray-600'>
              {certification.name} - {certification.authority}
            </p>
          ))}
        </div>
      )}
      {consultor.experiences && consultor.experiences.length > 0 && (
        <div className='mb-4 col-span-2 grid grid-cols-2 gap-x-4'>
          <p className='font-semibold'>Experiencias:</p>
          {consultor.experiences.map((experience) => (
            <p
              key={experience.id}
              className='text-gray-600 mb-1 capitalize col-span-2'
            >
              {experience.title} en {experience.company}
            </p>
          ))}
        </div>
      )}
      {consultor.languages && consultor.languages.length > 0 && (
        <div className='mb-4 col-span-2 grid grid-cols-2 gap-x-4'>
          <p className='font-semibold'>Idiomas:</p>
          {consultor.languages.map((language) => (
            <p
              key={language.id}
              className='text-gray-600 mb-1 capitalize col-span-2'
            >
              {language.name} - Nivel: {language.level}
            </p>
          ))}
        </div>
      )}
      {consultor.skills && consultor.skills.length > 0 && (
        <div className='mb-4 col-span-2 grid grid-cols-2 gap-x-4'>
          <p className='font-semibold'>Habilidades:</p>
          {consultor.skills.map((skill) => (
            <p
              key={skill.id}
              className='text-gray-600 mb-1 capitalize col-span-2'
            >
              {skill.name}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewConsultorDetails
/*

*/
