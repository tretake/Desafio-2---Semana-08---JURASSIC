import {useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import Logo from '../assets/icons/logo.png'
import Button from './Button';

const Header: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const [isOpen, setIsOpen] = useState(false);


  const linkClass = `block text-white px-4 py-2 hover:underline`
  const renderButtons = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Link to="/login" >
              <Button  label='Login' type='button' kind='outline' size='sm' />              
          </Link>
        );
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
          <Link to="/#" className={linkClass}>
            Search in Site
          </Link>
          <div className='flex justify-between '>
                    <input  className='bg-none ' type="text" id="txtBusca" placeholder="Search in site"/>
                    <img className='bg-white' src="../../public/images/search3.png" id="btnBusca" alt="Buscar"/>
          </div>
        </>
        );
      case 'login':
      default:
        return null;
    }
  };

  return ( <>
    <div className="w-full bg-[#1E293B] font-roboto flex items-center justify-between p-5 max-h-[80px]">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={Logo} alt="Logo" className=" size-10 md:size-12 object-cover" />
        </Link>
        <h1 className="text-white text-xl font-normal text-[18px] leading-[36px]">
          Project Manager
        </h1>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-4">
        {renderButtons()}
      </div>
      <div className="md:hidden mr-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"/>
            </svg>
          </button>
        </div>      
    </div>
    {isOpen && ( <div className="lg:hidden bg-gray-800">   {renderButtons()} </div> )}

</>
  );
};

export default Header;