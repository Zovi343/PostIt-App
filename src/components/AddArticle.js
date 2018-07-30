import React from 'react';
import { connect } from 'react-redux'
import ArticleForm from './ArticleForm';
import { addArticle } from '../actions/articlesActions'


export class AddArticle extends React.Component {
    onSubmit = (article) => {
        this.props.addArticle(article);
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

const mapDispatchToProps = (dispatch) => ({
    addArticle: (article) => dispatch(addArticle(article))
})

export default connect(undefined, mapDispatchToProps)(AddArticle);

