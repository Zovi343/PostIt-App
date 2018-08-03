import React from 'react';

class CommentListItem extends React.Component {
   
    onDelete = () => {
        this.props.onClickDeleteComment(this.props._id);
    };
    allowedDeleteComment = () => {
      if(this.props._creatorId === this.props.userId) {
          return false;
      } else {
          return true;
      }
    };
    render () { 
        return  (
                <li>
                    <p>Posted by: {this.props.creator} created at:{this.props.createdAt}</p>
                    <p>{this.props.text}</p>
                    <button onClick={this.onDelete} disabled={this.allowedDeleteComment()}>Delete</button>
                </li>
            )
    }
};

export default CommentListItem;