const Consultors = ({ consultors, handleVerPerfilClick }) => {
  return (
    <>
      <p className='absolute top-16 lg:top-5 text-2xl font-bold text-gray-900 mb-10'>
        Todos los Colsultores
      </p>

      <div className='w-full grid grid-cols-responsive gap-10 mt-20'>
        {consultors.map((consultor) => (
          <div
            key={consultor.id}
            className='rounded-lg border border-stone bg-gray-200 shadow-lg p-6 lg:p-8'
          >
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
              <button onClick={() => handleVerPerfilClick(consultor.id)}>
                Ver Perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Consultors
