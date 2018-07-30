import React from 'react';

const CommentListItem = ({ comment, createdAt }) => (
    <li>
        <p>{createdAt}</p>
        <p>{comment}</p>
        <button>Delete</button>
    </li>
);

export default CommentListItem;