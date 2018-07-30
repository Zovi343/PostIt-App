import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = (props) => (
         <ol>
            {
                props.comments.map((comment) => <CommentListItem 
                                                onClickDeleteComment={props.onClickDeleteComment} 
                                                key={comment.id} 
                                                {...comment}/>
                                            )
            }
        </ol>
)

export default CommentList;