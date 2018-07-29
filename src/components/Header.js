import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div>
    <h1>PostIt!</h1>
    <Link to="/create">AddArticle</Link>
    <Link to="/">Home</Link>
    </div>
);

export default Header;