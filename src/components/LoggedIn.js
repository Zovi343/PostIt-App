import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = (props) => (
    <div>
        <h3>Logged In As:</h3>
        <p>{props.name}</p>
        <Link to="/create"><button>Create Article</button></Link>
        <button onClick={props.handleFilter}>{props.filter ? 'See All Articles' : 'See Your Articles'}</button>
        <button onClick={props.onLogout}>Logout</button>
    </div>
);

export default LoggedIn;
