import React from 'react'

const ViewProject = ({ project }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
      <h2 className='text-xl font-bold mb-2'>{project.name}</h2>
      <p className='text-gray-700 mb-2'>{project.description}</p>
      <div className='flex flex-wrap mb-2'>
        <p className='mr-4'>
          <span className='font-semibold'>Fecha de inicio:</span>{' '}
          {project.startDate || 'No especificada'}
        </p>
        <p className='mr-4'>
          <span className='font-semibold'>Duración:</span>{' '}
          {project.duration || 'No especificada'}
        </p>
        <p className='mr-4'>
          <span className='font-semibold'>Presupuesto:</span>{' '}
          {project.budget || 'No especificado'}
        </p>
        <p>
          <span className='font-semibold'>Cliente:</span>{' '}
          {project.client || 'No especificado'}
        </p>
      </div>
      {/* Aquí puedes mostrar más detalles del proyecto si es necesario */}
    </div>
  )
}

export default ViewProject
