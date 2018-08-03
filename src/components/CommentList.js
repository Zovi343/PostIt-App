import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = (props) => (
         <ol>
            {
                props.comments.map((comment) => <CommentListItem 
                                                userId={props.userId}
                                                onClickDeleteComment={props.onClickDeleteComment} 
                                                key={comment._id} 
                                                {...comment}/>
                                            )
            }
        </ol>
)

export default CommentList;