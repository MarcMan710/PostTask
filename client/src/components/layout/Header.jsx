import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          PostTask
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/posts" className="hover:text-gray-300">
                Posts
              </Link>
            </li>
            <li>
              <Link to="/create" className="hover:text-gray-300">
                Create Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
