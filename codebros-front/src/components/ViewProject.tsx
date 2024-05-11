import React from 'react'

const ViewProject = ({ projects }) => {
  return (
    <>
      <p className='absolute top-16 lg:top-5 text-2xl font-bold text-gray-900 mb-10'>
        Todos los proyectos
      </p>
      <div className='w-full grid grid-cols-responsive gap-10 mt-20'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='rounded-lg border border-stone bg-gray-200 p-4 shadow-lg sm:p-6 lg:p-8'
          >
            <h2 className='text-gray-900 text-xl font-bold mb-2'>
              {project.name}
            </h2>
            <p className='text-gray-800/95 mb-2'>{project.description}</p>
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
            <div className='mt-6 sm:flex sm:gap-4'>
              <button
                type='button'
                className='inline-block w-full rounded-lg bg-emerald-500 hover:bg-emerald-700  px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto transition-all ease-in-out'
              >
                View
              </button>

              <button
                type='button'
                className='mt-2 inline-block w-full rounded-lg text-white bg-red-500 hover:bg-red-700 px-5 py-3 text-center text-sm font-semibold sm:mt-0 sm:w-auto transition-all ease-in-out'
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ViewProject
