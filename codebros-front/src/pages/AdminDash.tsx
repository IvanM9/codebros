import { useState, useEffect } from 'react'
import { getProyectRequest, getConsultantsRequest } from '../api/auth'
import NavMenu from '../components/NavMenu'
import RenderInforAdmin from '../components/RenderInforAdmin'
import useSwitch from '../hooks/useSwitch'
import { NavOpen } from '../components/Icons'

const AdminDash = () => {
  const { show, changeShow } = useSwitch()
  const [showAddProject, setShowAddProject] = useState(false)
  const [showViewProject, setShowViewProject] = useState(true)
  const [showConsultants, setShowConsultants] = useState(false)
  const [projects, setProjects] = useState([])
  const [consultants, setConsultants] = useState([])
  const [loading, setLoading] = useState(true)
  const [consultantsLoading, setConsultantsLoading] = useState(false) // Estado de carga para los consultores

  useEffect(() => {
    try {
      setLoading(true)
      fetchProjects(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProjects = async (data) => {
    try {
      const response = await getProyectRequest(data)
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
    fetchProjects(false)
  }
  const handleEmpajeraddProjectClick = async () => {
    try {
      setLoading(true) // Establecer el estado de carga
      const response = await getProyectRequest(true) // Obtener proyectos con true
      setProjects(response.data.data) // Guardar los proyectos en el estado
    } catch (error) {
      console.error('Error with handleEmpajeraddProjectClick:', error)
    } finally {
      setLoading(false) // Marcar la carga como completa, independientemente del resultado
    }
  }
  const handleViewConsultantsClick = async () => {
    try {
      setConsultantsLoading(true) // Establecer estado de carga al obtener los consultores
      const response = await getConsultantsRequest(false)
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
    fetchProjects(false)
  }

  return (
    <main className='lg:flex lg:min-h-screen'>
      <button
        onClick={changeShow}
        className='fixed right-[10%] bottom-[6%] md:right-[12%] md:bottom-[8%] bg-gray-800 cursor-pointer p-2 rounded-full z-10 lg:hidden'
      >
        <NavOpen />
      </button>
      <NavMenu
        show={show}
        changeShow={changeShow}
        handleAddProjectClick={handleAddProjectClick}
        handleViewProjectClick={handleViewProjectClick}
        handleEmpajeraddProjectClick={handleEmpajeraddProjectClick} // Añade esta prop
        handleViewConsultantsClick={handleViewConsultantsClick}
      />
      <RenderInforAdmin
        loading={loading}
        consultantsLoading={consultantsLoading}
        showAddProject={showAddProject}
        showConsultants={showConsultants}
        showViewProject={showViewProject}
        projects={projects}
        consultants={consultants}
        handleProjectAdded={handleProjectAdded}
      />
    </main>
  )
}

export default AdminDash
