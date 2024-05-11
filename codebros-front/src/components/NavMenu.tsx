import { useLocation } from 'wouter'
import { useAuthStore } from '../store/auth'
import Header from './Header'
import { Close, LogOut } from './Icons'

const NavMenu = ({
  handleAddProjectClick,
  handleViewProjectClick,
  handleViewConsultantsClick,
  handleEmpajeraddProjectClick,
  show,
  changeShow,
}) => {
  const logout = useAuthStore((state) => state.logout)
  const [, navigate] = useLocation()
  return (
    <aside className='bg-gray-900 px-5 flex flex-col text-white font-semibold lg:text-xl lg:w-1/5 lg:fixed lg:h-full lg:overflow-y-scroll xl:overflow-hidden'>
      <div className='py-3'>
        <Header />
      </div>
      <section
        className={`fixed z-10 bottom-0 right-0 bg-gray-900 w-1/2 p-2 lg:px-0 rounded-tl-lg border-t-2 border-l-2 border-gray-700 dark:border-green-500 lg:h-full lg:static lg:z-0 lg:border-0 lg:w-full py-5 lg:py-10 lg:rounded-none lg:border-none ${
          !show && 'hidden lg:block'
        }`}
      >
        <div className='lg:flex lg:flex-col lg:h-full lg:justify-between '>
          <div className='flex flex-col gap-4'>
            <button
              type='button'
              className='px-2 py-3 rounded-md bg-gray-600 hover:bg-gray-700  transition-color'
              onClick={handleAddProjectClick}
            >
              Crear Proyecto
            </button>
            <button
              type='button'
              className='px-2 py-3 rounded-md bg-gray-600 hover:bg-gray-700  transition-color'
              onClick={handleViewProjectClick}
            >
              Proyectos sin emparejar
            </button>
            <button
              type='button'
              className='px-2 py-3 rounded-md bg-gray-600 hover:bg-gray-700  transition-color'
              onClick={handleEmpajeraddProjectClick}
            >
              Proyectos emparejados
            </button>
            <button
              type='button'
              className='px-2 py-3 rounded-md bg-gray-600 hover:bg-gray-700  transition-color'
              onClick={handleViewConsultantsClick}
            >
              Ver Consultores
            </button>
          </div>
          <button
            className='w-full flex items-center justify-center gap-2 mt-4 px-2 py-3 rounded-md bg-gray-600 hover:bg-gray-700  transition-color'
            onClick={() => {
              logout()
              navigate('/landing')
            }}
          >
            <LogOut />
            <p>Cerrar Cesion</p>
          </button>
        </div>
        <div className='flex justify-end mr-6 my-4 lg:hidden'>
          <button onClick={changeShow}>
            <Close />
          </button>
        </div>
      </section>
    </aside>
  )
}

export default NavMenu
