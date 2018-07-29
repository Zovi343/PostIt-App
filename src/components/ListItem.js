import React from 'react';
import { Link } from 'react-router-dom'

const ListItem = ({ id, title, createdAt}) => (
    <Link to={`view/${id}`}>
        <p>{title}</p>
        <p>{createdAt}</p>
    </Link>
);

export default ListItem;