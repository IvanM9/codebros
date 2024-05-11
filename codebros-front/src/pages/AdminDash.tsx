import { useState, useEffect } from 'react'
import { getProyectRequest, getConsultantsRequest } from '../api/auth'
import NavMenu from '../components/NavMenu'
import RenderInforAdmin from '../components/RenderInforAdmin'
import useSwitch from '../hooks/useSwitch'
import { NavOpen } from '../components/Icons'

const AdminDash = () => {
  const { show, changeShow } = useSwitch();
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
    
    <main className='lg:flex lg:min-h-screen'>
      <button
            onClick={changeShow}
            className="fixed right-[10%] bottom-[6%] md:right-[12%] md:bottom-[8%] bg-gray-800 cursor-pointer p-2 rounded-full z-10 lg:hidden"
          >
            <NavOpen />
      </button>
      <NavMenu
        show={show}
        changeShow={changeShow}
        handleAddProjectClick={handleAddProjectClick}
        handleViewProjectClick={handleViewProjectClick}
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
