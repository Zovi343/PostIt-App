import React from 'react';
//import { IoIosHeart, IoIosChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';


const ArticleListItem = ({ _id, title, createdAt, creator, comments, likes}) => (
    <Link to={`view/${_id}`}>
        <h3>{title}</h3>
        <p>Posted by: {creator} at: {createdAt}</p>
        {/*<p> <IoIosHeart /> {likes.length}</p>*/}
        {/*<p><IoIosChatboxes /> { comments.length }</p>*/}
    </Link>
);

export default ArticleListItem;