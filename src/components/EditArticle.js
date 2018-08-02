import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';
import { editArticle, removeArticle } from '../actions/articlesActions';

export class EditArticle extends React.Component {
    onSubmit = (article) => {
        this.props.editArticle(this.props.article._id, article);
        this.props.history.push('/');
    }
    onRemoveClick = () => {
        this.props.removeArticle(this.props.article._id);
        this.props.history.push('/');
    }
    render () {
        return (
            <div>
                <h2>Editing Article</h2>
                <ArticleForm onSubmit={this.onSubmit} article={this.props.article}/>
                <button onClick={this.onRemoveClick}>Remove Article</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    article: state.articles.find((article) => article._id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
    editArticle: (id, article) => dispatch(editArticle(id, article)),
    removeArticle: (id) => dispatch(removeArticle(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);