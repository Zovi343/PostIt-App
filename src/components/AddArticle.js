import React from 'react';
import { connect } from 'react-redux'
import ArticleForm from './ArticleForm';
import { addArticle } from '../actions/articlesActions'


class AddArticle extends React.Component {
    onSubmit = (article) => {
        this.props.dispatch(addArticle(article))
        this.props.history.push('/');
    }
    render () {
        return ( 
        <div>
            <ArticleForm onSubmit={this.onSubmit} />
        </div>
        );
    }
}

export default connect(undefined)(AddArticle);

