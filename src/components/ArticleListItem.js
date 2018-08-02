import React from 'react';
import { IoIosHeart, IoIosChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';


const ArticleListItem = ({ _id, title, createdAt, comments, likes}) => (
    <Link to={`view/${_id}`}>
        <p>{title}</p>
        <p>{createdAt}</p>
        <p> <IoIosHeart /> {likes.length}</p>
        <p><IoIosChatboxes /> { comments.length }</p>
    </Link>
);

export default ArticleListItem;