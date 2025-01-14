import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/icons/logo.png'
import Button from './Button';
import { useClerk } from '@clerk/clerk-react';

const Header: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const [isOpen, setIsOpen] = useState(false);

  const { user, signOut } = useClerk();
  const navigate = useNavigate();

  useEffect( () => { setIsOpen(false)} ,[currentPage] )

  const handleLogoClick = async () => {
    if (user) {
      await signOut();
    }
    navigate('/');
  };

  const linkClass = `text-white  py-2 hover:underline`
  const renderButtons = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Link to="/login">
            <Button
              label="Login"
              kind="outline"
              type="button"
              size="sm-login"
            />
          </Link>
        );
      case 'profile':
      case 'kanban':
      case 'settings':
        return (
          <>
          <Link to="/" className={linkClass}>
            Home
          </Link>
          <Link to="/#" className={linkClass}>
            About
          </Link>
          <Link to="/settings" className={linkClass}>
            Settings
          </Link>
          <Link to="/profile" className={linkClass}>
            Profile
          </Link>
          <div className='hidden  md:flex relative justify-between border-[#0000006f] p-2 rounded-md border-[1px] md:w-[133px] lg:w-[200px] '>
                    <input  className='bg-[#00000000]  md:text-sm ' type="text" id="txtBusca" placeholder="Search in site"/>
                    <img className=' absolute right-2' src="../../public/images/search3.png" id="btnBusca" alt="Buscar"/>
          </div>
        </>
        );
      case 'login':
      default:
        return null;
    }
  };

  return ( 
  <>
    <div className="w-full bg-[#1E293B] font-roboto flex items-center justify-between p-5 max-h-[80px] ">
      <div className="flex items-center space-x-4" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Link to="/">
          <img src={Logo} alt="Logo" className=" size-10 md:size-12 object-cover" />
        </Link>
        <h1 className="text-white text-xl font-normal text-[18px] leading-[36px]">
          Project Manager
        </h1>
      </div>

      { (currentPage === 'settings' || currentPage === 'profile' || currentPage === 'kanban') ?
      <>
        <div className="hidden md:flex  md:items-center md:gap-5 lg:gap-10 ">
          {renderButtons()}
        </div> 

        
        <div className="md:hidden mr-5 flex gap-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"/>
            </svg>
          </button>
          <div className=' flex relative justify-between w-9 border-[#0000006f] p-1 rounded-md border-[1px] '>
                    <input  className='bg-[#00000000]  w-0 md:text-sm ' type="text" id="txtBusca" placeholder=""/>
                    <img className=' absolute' src="../../public/images/search3.png" id="btnBusca" alt="Buscar"/>
          </div>
        </div>  
      </> 
      :

      <div className="flex  md:items-center md:gap-5 lg:gap-10 ">
        {renderButtons()}
      </div> 
      }
      
    </div>
    {isOpen && ( <div className="flex flex-col md:hidden bg-gray-800">   {renderButtons()} </div> )}

</>
  );
};

export default Header;