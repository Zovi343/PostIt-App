import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';
import { startEditArticle, removeArticle } from '../actions/articlesActions';

export class EditArticle extends React.Component {
    onSubmit = (article) => {
        this.props.startEditArticle(this.props.article._id, article);
        this.props.history.push('/');
    };
    onRemoveClick = () => {
        this.props.removeArticle(this.props.article._id);
        this.props.history.push('/');
    };
    render () {
        return (
            <div>
                {
                    this.props.article._creatorId === this.props.userId ? ( 
                        <div>
                            <h2>Editing Article</h2>
                            <ArticleForm onSubmit={this.onSubmit} article={this.props.article}/>
                            <button onClick={this.onRemoveClick}>Remove Article</button>
                        </div>
                    ) : (
                        <p>You haven't created this article</p>
                    )
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
    removeArticle: (id) => dispatch(removeArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);