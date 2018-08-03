import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';
import { startEditArticle, startRemoveArticle } from '../actions/articlesActions';

export class EditArticle extends React.Component {
    onSubmit = (article) => {
        this.props.startEditArticle(this.props.article._id, article).then(() => {
            this.props.history.push('/'); // I calling this in then, so it renders article list smoothly
        });
    };
    onRemoveClick = () => {
        this.props.startRemoveArticle(this.props.article._id).then(() => {
            this.props.history.push('/');//I calling this in then, so it renders article list smoothly
        });
    };
    render () {
        return (
            <div>
                {
                    !this.props.article // so this first line chechks if article exists, I need to do this because when I delete  article I redirecting up there -->
                    ? ( <p>You haven't created this article</p> ) // in then, that means that when article is deleted user is for tiny bit of second on this page but article doesn't exists any more -->
                    : this.props.article._creatorId === this.props.userId// so If i would not check if article exits I would try then reac creatorId of undefiend on this line which would throw an error
                    ? ( 
                        <div>
                            <h2>Editing Article</h2>
                            <ArticleForm onSubmit={this.onSubmit} article={this.props.article}/>
                            <button onClick={this.onRemoveClick}>Remove Article</button>
                        </div>
                    ) 
                    : ( <p>You haven't created this article</p> )
                }
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    userId: state.auth.id,
    article: state.articles.find((article) => article._id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
    startEditArticle: (id, article) => dispatch(startEditArticle(id, article)),
    startRemoveArticle: (id) => dispatch(startRemoveArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);