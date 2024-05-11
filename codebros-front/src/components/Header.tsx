import logoImg from '../assets/original-removebg-preview.png'
const Header: React.FC = () => {
  return (
    <header>
      <div className='relative h-16'>
        <img
          src={logoImg}
          alt='Logo'
          className='absolute top-0 left-0 h-20 w-32'
        />
        {/* COSITAS */}
      </div>
    </header>
  )
}

export default Header
