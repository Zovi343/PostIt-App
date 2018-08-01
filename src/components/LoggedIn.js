import React from 'react';

const LoggedIn = (props) => (
    <div>
        <h3>Logged In As:</h3>
        <p>User</p>
        <button onClick={props.onLogout}>Logout</button>
    </div>
);

export default LoggedIn;
