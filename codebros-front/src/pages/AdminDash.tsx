import { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddProject from '../components/AddProyect'
import ViewConsultors from '../components/ViewConsultors'
import ViewProject from '../components/ViewProject'
import { getProyectRequest, getConsultantsRequest } from '../api/auth'

const AdminDash = () => {
  const [showAddProject, setShowAddProject] = useState(false)
  const [showViewProject, setShowViewProject] = useState(true)
  const [showConsultants, setShowConsultants] = useState(false)
  const [projects, setProjects] = useState([])
  const [consultants, setConsultants] = useState([])
  const [loading, setLoading] = useState(true)
  const [consultantsLoading, setConsultantsLoading] = useState(false) // Estado de carga para los consultores

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await getProyectRequest()
      setProjects(response.data.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProjectClick = () => {
    setShowAddProject(true)
    setShowViewProject(false)
    setShowConsultants(false)
  }

  const handleViewProjectClick = () => {
    setShowViewProject(true)
    setShowAddProject(false)
    setShowConsultants(false)
    fetchProjects()
  }

  const handleViewConsultantsClick = async () => {
    try {
      setConsultantsLoading(true) // Establecer estado de carga al obtener los consultores
      const response = await getConsultantsRequest()
      setConsultants(response.data.data)
      setShowConsultants(true)
      setShowViewProject(false)
      setShowAddProject(false)
    } catch (error) {
      console.error('Error fetching consultants:', error)
    } finally {
      setConsultantsLoading(false) // Marcar la carga de consultores como completa
    }
  }

  const handleProjectAdded = () => {
    fetchProjects()
  }

  return (
    <main>
      <Header />
      <div className='flex justify-evenly items-center gap-6'>
        <button
          type='button'
          className='bg-violet-600 p-3 text-white rounded'
          onClick={handleAddProjectClick}
        >
          Crear Proyecto
        </button>
        <button
          type='button'
          className='bg-violet-600 p-3 text-white rounded'
          onClick={handleViewProjectClick}
        >
          Ver Proyectos
        </button>
        <button
          type='button'
          className='bg-violet-600 p-3 text-white rounded'
          onClick={handleViewConsultantsClick}
        >
          Ver Consultores
        </button>
      </div>

      {loading || consultantsLoading ? ( // Mostrar el estado de carga mientras se cargan los proyectos o los consultores
        <p>Cargando...</p>
      ) : (
        <>
          {showAddProject && <AddProject onProjectAdded={handleProjectAdded} />}
          {showConsultants && <ViewConsultors consultors={consultants} />}
          {showViewProject && (
            <div>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ViewProject key={project.id} project={project} />
                ))
              ) : (
                <p>Aún no tienes proyectos. ¡Crea uno ahora!</p>
              )}
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default AdminDash
