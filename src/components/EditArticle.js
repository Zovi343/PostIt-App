import React from 'react';
import { connect } from 'react-redux';
import ArticleForm from './ArticleForm';
import { editArticle } from '../actions/articlesActions';

class EditArticle extends React.Component {
    onSubmit = (article) => {
        this.props.dispatch(editArticle(this.props.article.id, article));
        this.props.history.push('/');
    }
    render () {
        return (
            <div>
                <h2>Editing Article</h2>
                <ArticleForm onSubmit={this.onSubmit} article={this.props.article}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    article: state.articles.find((article) => article.id === props.match.params.id )
})

export default connect(mapStateToProps)(EditArticle);