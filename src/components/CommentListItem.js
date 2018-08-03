import React from 'react';

class CommentListItem extends React.Component {
   
    onDelete = () => {
        this.props.onClickDeleteComment(this.props._id);
    }
    render () { 
        return  (
                <li>
                    <p>Posted by: {this.props.name} created at:{this.props.createdAt}</p>
                    <p>{this.props.text}</p>
                    <button onClick={this.onDelete}>Delete</button>
                </li>
            )
    }
};

export default CommentListItem;