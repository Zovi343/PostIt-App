import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = (props) => (
         <ol>
            {
                props.comments.map((comment) => <CommentListItem key={comment.id} {...comment}/>)
            }
        </ol>
)

export default CommentList;