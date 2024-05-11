import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteProjectRequest, getMatchingsRequest } from '../api/auth'
import MatchingInfo from './MatchingData'

const ViewProject = ({ projects }) => {
  const [showProjects, setShowProjects] = useState(true)
  const [matchigsData, setMatchigsData] = useState()

  const handleClick = async (id) => {
    try {
      const response = await getMatchingsRequest(id)
      if (response.status === 200 || response.status === 201) {
        toast.success('Emparejado correctamente')
        setShowProjects(false) // Oculta los proyectos después de emparejar
        setMatchigsData(response.data.data)
      } else {
        toast.error('No se pudo emparejar')
      }
    } catch (error) {
      console.error('Error en handleClick:', error)
    }
  }

  const deleteProject = async (id) => {
    try {
      const response = await deleteProjectRequest(id)
      if (response.status === 200 || response.status === 201) {
        toast.success('Proyecto eliminado correctamente')
      } else {
        toast.error('No se pudo eliminar el proyecto')
      }
    } catch (error) {
      console.error('Error en deleteProject:', error)
    }
  }

  return (
    <>
      {showProjects ? ( // Renderiza solo si showProjects es verdadero
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
                    onClick={() => {
                      deleteProject(project.id)
                    }}
                    type='button'
                    className='mt-2 inline-block w-full rounded-lg text-white bg-red-500 hover:bg-red-700 px-5 py-3 text-center text-sm font-semibold sm:mt-0 sm:w-auto transition-all ease-in-out'
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      handleClick(project.id)
                    }}
                    type='button'
                    className='mt-2 inline-block w-full rounded-lg text-white bg-blue-500 hover:bg-blue-700 px-5 py-3 text-center text-sm font-semibold sm:mt-0 sm:w-auto transition-all ease-in-out'
                  >
                    Matching
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <MatchingInfo matchingData={matchigsData} />
      )}
    </>
  )
}

export default ViewProject
