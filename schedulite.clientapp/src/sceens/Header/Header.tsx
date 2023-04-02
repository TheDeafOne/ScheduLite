import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>Schedulite</div>
      <div style={iconContainerStyle}>
        <Link to="/home"><i className="fas fa-home"></i></Link>
        <Link to="/profile"><i className="fas fa-user"></i></Link>
        <button style={logoutButtonStyle}>Log Out</button>
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#add8e6',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  padding: '10px',
  zIndex: 999,
};

const logoStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '24px',
};

const iconContainerStyle: React.CSSProperties = {
  display: 'flex',
};

const logoutButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '20px',
  textDecoration: 'underline',
};

export default Header;
export {};