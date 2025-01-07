import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import Logo from '../assets/icons/logo.png'

const Header: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const renderButtons = () => {
    switch (currentPage) {
      case 'home':
        return (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Home Button
          </button>
        );
      case 'kanban':
        return (
          <>
            <Link to="/" className="text-white px-4 py-2 hover:underline">
              Home
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              About
            </Link>
            <Link to="/settings" className="text-white px-4 py-2 hover:underline">
              Settings
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              Profile
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              Search in Site
            </Link>
          </>
        );
        case 'settings':
          return (
            <>
            <Link to="/" className="text-white px-4 py-2 hover:underline">
              Home
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              About
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              Settings
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              Profile
            </Link>
            <Link to="/#" className="text-white px-4 py-2 hover:underline">
              Search in Site
            </Link>
          </>
          );
      case 'login':
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#1E293B] font-roboto flex items-center justify-between p-5 max-h-[80px]">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-cover" />
        </Link>
        <h1 className="text-white text-xl font-normal text-[18px] leading-[36px]">
          Project Manager
        </h1>
      </div>
      <div className="flex items-center space-x-4">{renderButtons()}</div>
    </div>
  );
};

export default Header;
