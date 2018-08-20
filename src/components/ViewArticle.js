import React from 'react';
import { connect } from 'react-redux';
import CommentArticle from './CommentArticle';
import CommentList from './CommentList';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
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
            return  ( <IoIosHeart className="icon icon--loggedin" />);
        } else {
            return ( <IoIosHeartEmpty className="icon icon--loggedin"  />);;
        }
    };
    commentAllowed = () => {
        if (!!this.props.userId){
            return false
        } else {
            return true
        }
    };
    likeAllowed = () => {
        if (!!this.props.userId){
            return false
        } else {
            return true
        }
    };
    render() {
        return (
            <div className="main-content scroll-active">
                {
                    !!this.props.article ? (
                        <div className="article-view">
                            <div className="article-view__top">
                                <h2 className="article-view__header">{this.props.article.title}</h2>
                                <p>Posted by: {this.props.article.creator} on: {this.props.article.createdAt}</p>
                            </div>
                            <p className="article-view__text">{this.props.article.text}</p>
                            <div className="article-view__under-text">
                                <div 
                                className="rating-like">
                                    <button 
                                    className="btn-like" 
                                    disabled={this.likeAllowed()}  
                                    onClick={this.onClickLike}
                                    >
                                        { !!this.props.userId ? this.likeStyle() : <IoIosHeart className="icon icon--loggedout" /> }
                                    </button>
                                    <p>
                                        {this.props.article.likes.length}
                                    </p>
                                </div>
                                <div className="article-view__edit">
                                    <button className="btn btn--white" onClick={this.onClickEdit} disabled={this.editingAllowed()}>Edit Article</button>
                                    {this.props.article.editedAt && <p>Edited on: {this.props.article.createdAt}</p>}
                                </div>
                            </div>
                            <div className="article-view__comment">
                                <CommentArticle likeOrCommentAllowed={this.commentAllowed()} onSubmit={this.onSubmit} />
                            </div>
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
