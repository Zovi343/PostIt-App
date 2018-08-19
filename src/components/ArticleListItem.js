import React from 'react';
import { IoIosHeart, IoIosChatboxes, IoIosText } from "react-icons/io";
import { Link } from 'react-router-dom';


const ArticleListItem = ({ _id, title, createdAt, creator, comments, likes}) => (
    <Link className="list-item" to={`view/${_id}`}>
        <h3 className="u-margin-bottom-smallest">{title}</h3>
        <p className="creator-date u-margin-bottom-smallest">Posted by: {creator} on: {createdAt}</p>
        <div className="list-item__values">
            <p className="value"> <IoIosHeart className="value__icon" /> {likes.length}</p>
            <p className="value"><IoIosChatboxes className="value__icon" /> { comments.length }</p>
        </div>
    </Link>
);

export default ArticleListItem;