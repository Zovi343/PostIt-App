import React from 'react';

class CommentListItem extends React.Component {
   
    onDelete = () => {
        this.props.onClickDeleteComment(this.props.id);
    }
    render () { 
        return  (
                <li>
                    <p>{this.props.createdAt}</p>
                    <p>{this.props.comment}</p>
                    <button onClick={this.onDelete}>Delete</button>
                </li>
            )
    }
};

export default CommentListItem;