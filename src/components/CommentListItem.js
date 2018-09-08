import React from 'react';

class CommentListItem extends React.Component {
   
    onDelete = () => {
        this.props.onClickDeleteComment(this.props._id);
    };
    allowedDeleteComment = () => {
      if(this.props._creatorId === this.props.userId) {
          return true;
      } else {
          return false;
      }
    };
    render () { 
        return  (
                <li className="comment-list-item">
                    <div className="comment-list-item__top">
                        <p>Posted by: {this.props.creator} created on:{this.props.createdAt}</p>
                       { this.allowedDeleteComment()
                            ? <button className="btn btn--white" onClick={this.onDelete}>Delete</button>
                            : <div> </div>
                        }
                    </div>
                    <p>{this.props.text}</p>
                </li>
            );
    };
};

export default CommentListItem;