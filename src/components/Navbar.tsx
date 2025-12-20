import { NavLink, Link } from 'react-router'

const Navbar = () => {
  return (
    <div className='px-10 py-3 flex bg-amber-50'>
      <div className='flex-none w-10 h-10'>
        <Link to="/">
          <img src="/vite.svg" alt="logo" />
        </Link>
        
      </div>

      <nav className='ml-auto flex w-85 justify-between my-auto'>
        <NavLink className='flex' to="/">Home</NavLink>
        <NavLink className='flex' to="/models-about">Models About</NavLink>
        <NavLink className='flex' to="/datasets-about">Datasets About</NavLink>
      </nav>
    </div>
  )
}

export default Navbar
