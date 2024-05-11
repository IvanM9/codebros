import { useForm } from 'react-hook-form'
import AdditionalInformation from '../components/AdditionalInformation'
import MainInformation from '../components/MainInformation'
import {
  useCertificationsStore,
  useExperiencesStore,
  useLanguagesStore,
  useSkillsStore,
} from '../store/consultData'
import { registerInformationConsult } from '../api/auth'
import Header from '../components/Header'
import { toast } from 'react-toastify'
import { useLocation } from 'wouter'

const ConsultDash = () => {
  const [, navigate] = useLocation()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { skills } = useSkillsStore()
  const { languages } = useLanguagesStore()
  const { experiences } = useExperiencesStore()
  const { certifications } = useCertificationsStore()

  const onSubmit = async (data) => {
    const {
      city,
      country,
      employmentStatus,
      avalibleHours,
      willingToTravel,
      provisionForRemoteWork,
      feeFees,
      github,
      linkedIn,
      portfolio,
    } = data

    const timeZone = `${city}/${country}`

    // Eliminar los id de los objetos dentro de los arrays
    const skillsWithoutId = skills.map(({ id, ...rest }) => rest)
    const languagesWithoutId = languages.map(({ id, ...rest }) => rest)
    const experiencesWithoutId = experiences.map(({ id, ...rest }) => rest)
    const certificationsWithoutId = certifications.map(
      ({ id, ...rest }) => rest
    )

    const formData = {
      location: city,
      timeZone,
      employmentStatus,
      availableHours: Number(avalibleHours),
      willingToTravel: Boolean(willingToTravel),
      provisionForRemoteWork: Boolean(provisionForRemoteWork),
      feeFees,
      portfolio,
      linkedIn,
      github,
      skills: skillsWithoutId,
      languages: languagesWithoutId,
      experiences: experiencesWithoutId,
      certifications: certificationsWithoutId,
    }

    const datainfo = await registerInformationConsult(formData)
    if (datainfo?.status === 201 || datainfo?.status === 200) {
      toast.success(datainfo?.data.message)
      navigate('/post-dash')
    } else {
      toast.error(datainfo?.response.data.message)
      navigate('/post-dash')
    }
  }

  return (
    <div className='bg-slate-200'>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='container w-3/5 2xl:w-2/4 mx-auto py-10'
      >
        <MainInformation register={register} errors={errors} />
        <AdditionalInformation register={register} errors={errors} />

        <div className='mt-6'>
          <button
            type='submit'
            className='block ml-auto items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConsultDash
