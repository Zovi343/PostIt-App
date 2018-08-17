import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="header">
        <Link to="/" className="header__title"><h1>PostIt<span className="header__exclamation">!</span></h1></Link>
    </header>
);

export default Header;