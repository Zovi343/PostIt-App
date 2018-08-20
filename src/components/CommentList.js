import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = (props) => (
    <div className="comment-section">
        {props.comments.length === 0 ? false : <h3>Comment Section:</h3>}
        <ol className="comment-list">
        {
            props.comments.map((comment) => <CommentListItem 
                                            userId={props.userId}
                                            onClickDeleteComment={props.onClickDeleteComment} 
                                            key={comment._id} 
                                            {...comment}/>
                                        )
        }
        </ol>
    </div>
)

export default CommentList;