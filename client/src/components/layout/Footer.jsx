import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} PostTask. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
