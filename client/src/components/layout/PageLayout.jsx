import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="mt-3">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default PageLayout;
