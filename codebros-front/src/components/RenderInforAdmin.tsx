import AddProyect from './AddProyect'
import ViewConsultors from './ViewConsultors'
import ViewProject from './ViewProject'
const RenderInforAdmin = ({
  loading,
  consultantsLoading,
  showAddProject,
  showConsultants,
  showViewProject,
  projects,
  consultants,
  handleProjectAdded,
}) => {
  return (
    <>
      <section className='w-full lg:w-4/5 flex items-center justify-center ml-auto p-5'>
        <div className='w-full lg:w-4/5 flex justify-center'>
          {loading || consultantsLoading ? (
            <div className='loader'></div>
          ) : (
            <>
              {showAddProject && (
                <AddProyect onProjectAdded={handleProjectAdded} />
              )}
              {showConsultants && <ViewConsultors consultors={consultants} />}
              {showViewProject && <ViewProject projects={projects} />}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default RenderInforAdmin
