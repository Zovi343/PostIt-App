import React from 'react';
import { IoIosHeart, IoIosChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';


const ArticleListItem = ({ id, title, createdAt}) => (
    <Link to={`view/${id}`}>
        <p>{title}</p>
        <p>{createdAt}</p>
        <p> <IoIosHeart /> 15</p>
        <p><IoIosChatboxes />9</p>
    </Link>
);

export default ArticleListItem;