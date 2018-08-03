import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import CommentArticle from './CommentArticle';
import CommentList from './CommentList';
import { IoIosHeart } from "react-icons/io";
import { addLike ,commentArticle, removeComment } from '../actions/articlesActions'; 

export class ViewArticle extends React.Component {
    onSubmit = (comment) => {
        this.props.commentArticle(this.props.article._id ,comment);
    };
    onClickDeleteComment = (commentId) => {
        this.props.removeComment(this.props.article._id, commentId);
    };
    onClickLike = () => {
        const userId = uuid();
        this.props.addLike( this.props.article._id ,userId);
    };
    //this ensures that only user which owns article will be able to edit it 
    editingAllowed = () => {
        if (this.props.article._creatorId === this.props.userId) {
            return false;
        } else {
            return true;
        }
    };
    onClickEdit = () => {
        this.props.history.push(`/edit/${this.props.article._id}`)
    }
    render() {
        return (
            <div>
                {
                    !!this.props.article ? (
                        <div>
                            <button onClick={this.onClickEdit} disabled={this.editingAllowed()}>Edit Article</button>
                            <h2>{this.props.article.title}</h2>
                            <p>Posted by:{this.props.article.creator} at: {this.props.article.createdAt}</p>
                            {this.props.article.editedAt && <p>Edited at: {this.props.article.createdAt}</p>}
                            <p>{this.props.article.text}</p>
                            <CommentArticle onSubmit={this.onSubmit} />
                            <button onClick={this.onClickLike}> <IoIosHeart /></button>
                            <CommentList onClickDeleteComment={this.onClickDeleteComment} comments={this.props.article.comments}/>
                        </div> 
                    ) : (
                        <h2> This article doesn't exist! </h2>
                    )
                }
            </div>
        );
    };
};

const mapStateToProps = (state, props) =>({
    userId: state.auth.id,
    article: state.articles.find((article) => article._id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
   addLike: (id, userId) => dispatch(addLike(id, userId)),
   commentArticle: (id, comment) => dispatch(commentArticle(id, comment)),
   removeComment: (id, commentId) => dispatch(removeComment(id, commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
