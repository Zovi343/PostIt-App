import React from 'react';
import { IoMdPerson } from "react-icons/io";

const LoggedIn = (props) => (
    <div className="logged-in">
        <div className="logged-in__group u-margin-bottom-large">
            <h2 className="u-margin-bottom-small">Logged In As:</h2>
            <p className="user"> <IoMdPerson className="user__icon" /> {props.name}</p>
        </div>
        <button className="logged-in__group btn btn--green" onClick={props.onCreateArticle} >Create Article</button>
        <p className="logged-in__group" >OR</p>
        <button className="logged-in__group btn btn--white" onClick={props.onLogout}>Logout</button>
    </div>
);

export default LoggedIn;
