import { getConsultantsRequestId } from '../api/auth'
import ViewConsultorDetails from './ViewConsultorDetails'
import { useState } from 'react'
import Consultors from './Consultors'

const ViewConsultors = ({ consultors }) => {
  const [showViewConsultDetails, setShowViewConsultDetails] = useState(false)
  const [selectedConsultor, setSelectedConsultor] = useState(null)
  const handleVerPerfilClick = async (consultorId) => {
    try {
      const response = await getConsultantsRequestId(consultorId)
      setSelectedConsultor(response.data.data)
      setShowViewConsultDetails(true)
    } catch (error) {
      console.error('Error al obtener los detalles del consultor:', error)
    }
  }

  return (
    <>
      {!showViewConsultDetails ? (
        <Consultors
          consultors={consultors}
          handleVerPerfilClick={handleVerPerfilClick}
        />
      ) : (
        <ViewConsultorDetails consultor={selectedConsultor} />
      )}
    </>
  )
}

export default ViewConsultors
