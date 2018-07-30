import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentArticle from './CommentArticle';
import CommentList from './CommentList';
import { IoIosHeart } from "react-icons/io";
import { commentArticle, removeComment } from '../actions/articlesActions'; 

class ViewArticle extends React.Component {
    onSubmit = (comment) => {
        this.props.dispatch(commentArticle(this.props.article.id ,comment));
       // this.props.history.push(`/view/${this.props.article.id}`); // is this right way to do it ?
    }
    onClickDeleteComment = (commentId) => {
        this.props.dispatch(removeComment(this.props.article.id, commentId));
        //this.props.history.push(`/view/${this.props.article.id}`);
    }
    render() {
        return (
            <div>
                {
                    !!this.props.article ? (
                        <div>
                            <Link to={`/edit/${this.props.article.id}`}>Edit Article</Link>
                            <h2>{this.props.article.title}</h2>
                            <p>{this.props.article.createdAt}</p>
                            <p>{this.props.article.text}</p>
                            <CommentArticle onSubmit={this.onSubmit} />
                            <button> <IoIosHeart /></button>
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
    article: state.articles.find((article) => article.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewArticle);
