import React from 'react';
import { connect } from 'react-redux';
import CommentArticle from './CommentArticle';
import CommentList from './CommentList';
//import { IoIosHeart } from "react-icons/io";
import { startAddLike, startRemoveLike , startCommentArticle, startRemoveComment } from '../actions/articlesActions'; 

export class ViewArticle extends React.Component {
    onSubmit = (comment) => {
        this.props.startCommentArticle(this.props.article._id ,comment);
    };
    onClickDeleteComment = (commentId) => {
        this.props.startRemoveComment(this.props.article._id, commentId);
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
    };
    onClickLike = () => {
        if (this.props.article.likes.includes(this.props.userId)){
            this.props.startRemoveLike( this.props.article._id, this.props.userId);
        } else {
            this.props.startAddLike( this.props.article._id , this.props.userId);
        }
    };
    likeStyle = () => {
        if (this.props.article.likes.includes(this.props.userId)){
            return { color: 'red' }
        } else {
            return { color: 'grey' }
        }
    };
    likeOrCommentAllowed = () => {
        if (!!this.props.userId){
            return false
        } else {
            return true
        }
    };
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
                            <CommentArticle likeOrCommentAllowed={this.likeOrCommentAllowed()} onSubmit={this.onSubmit} />
                            <button disabled={this.likeOrCommentAllowed()}  onClick={this.onClickLike}>{ /*<IoIosHeart style={this.likeStyle()}/>*/}test</button><p>Number of Likes: {this.props.article.likes.length}</p>
                            <CommentList userId={this.props.userId} onClickDeleteComment={this.onClickDeleteComment} comments={this.props.article.comments}/>
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
   startAddLike: (id, userId) => dispatch(startAddLike(id, userId)),
   startRemoveLike: (id, userId) => dispatch(startRemoveLike(id, userId)),
   startCommentArticle: (id, comment) => dispatch(startCommentArticle(id, comment)),
   startRemoveComment: (id, commentId) => dispatch(startRemoveComment(id, commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
