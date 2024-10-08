import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-amber-500 p-4 w-screen text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <nav>
          <NavLink to="/" className="mr-4 text-white hover:text-gray-900">Home</NavLink>
          <NavLink to="/dashboard" className="mr-4 text-white hover:text-gray-900">Dashboard</NavLink>
          <NavLink to="/signin" className="text-white hover:text-gray-900">Sign In</NavLink>
        </nav>
      </div>
    </header>
    
  );
};

export default Header;
