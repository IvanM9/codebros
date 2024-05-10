import React from 'react'

const ViewConsultors = ({ consultors }) => {
  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Consultores</h2>
      {consultors.map((consultor) => (
        <div
          key={consultor.id}
          className='border border-gray-200 p-4 rounded mb-4'
        >
          <h3 className='text-xl font-semibold mb-2'>
            {consultor.user.firstName} {consultor.user.lastName}
          </h3>
          <p className='text-gray-600 mb-2'>{consultor.user.email}</p>
          <p className='mb-2'>
            <span className='font-semibold'>Ubicación:</span>{' '}
            {consultor.location}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Estado de empleo:</span>{' '}
            {consultor.employmentStatus}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Horas disponibles:</span>{' '}
            {consultor.availableHours}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Viaje dispuesto:</span>{' '}
            {consultor.willingToTravel ? 'Sí' : 'No'}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Trabajo remoto:</span>{' '}
            {consultor.provisionForRemoteWork ? 'Sí' : 'No'}
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Tarifa por hora:</span>{' '}
            {consultor.feeFees}
          </p>
          {consultor.certifications && consultor.certifications.length > 0 && (
            <div className='mb-2'>
              <p className='font-semibold mb-1'>Certificaciones:</p>
              {consultor.certifications.map((certification) => (
                <p key={certification.id}>
                  {certification.name} - {certification.authority}
                </p>
              ))}
            </div>
          )}
          {consultor.experiences && consultor.experiences.length > 0 && (
            <div className='mb-2'>
              <p className='font-semibold mb-1'>Experiencias:</p>
              {consultor.experiences.map((experience) => (
                <p key={experience.id}>
                  {experience.title} en {experience.company}
                </p>
              ))}
            </div>
          )}
          {consultor.languages && consultor.languages.length > 0 && (
            <div className='mb-2'>
              <p className='font-semibold mb-1'>Idiomas:</p>
              {consultor.languages.map((language) => (
                <p key={language.id}>
                  {language.name} - Nivel: {language.level}
                </p>
              ))}
            </div>
          )}
          {consultor.skills && consultor.skills.length > 0 && (
            <div>
              <p className='font-semibold mb-1'>Habilidades:</p>
              {consultor.skills.map((skill) => (
                <p key={skill.id}>{skill.name}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ViewConsultors
