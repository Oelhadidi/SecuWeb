import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = ({ darkMode }) => {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen `}>
      <main className="flex flex-col items-center justify-center flex-grow ">
        <h2 className="text-5xl font-bold mb-4">Welcome to Game Vite!</h2>
        <p className="text-lg mb-8 text-center max-w-2xl">Join the ultimate gaming community. Play, compete, and connect with gamers from around the world. Sign up now to start your adventure!</p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-amber-400 text-black px-6 py-3 rounded-md hover:bg-amber-500 hover:text-black transition-colors duration-300">Get Started</Link>
          <Link to="/signin" className="bg-teal-400 text-white px-6 py-3 rounded-md hover:bg-teal-500 transition-colors duration-300">Sign In</Link>
        </div>
      </main>
      <footer className={`w-full p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'} text-center`}>
        <p>© 2024 Game Vite EO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
