export const Trash = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-trash-x hover:scale-125'
      width='27'
      height='27'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='#ff2825'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 7h16' />
      <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
      <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
      <path d='M10 12l4 4m0 -4l-4 4' />
    </svg>
  )
}

export function NavOpen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-menu-2 md:w-8 md:h-8"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="#fff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 6l16 0"></path>
      <path d="M4 12l16 0"></path>
      <path d="M4 18l16 0"></path>
    </svg>
  );
}

export function Close() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-x md:w-8 md:h-8 hover:cursor-pointer hover:scale-150 transition duration-300 ease-in-out dark:stroke-white"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );
}

export function LogOut() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-logout"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
      <path d="M9 12h12l-3 -3"></path>
      <path d="M18 15l3 -3"></path>
    </svg>
  );
}
