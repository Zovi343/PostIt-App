import React from 'react';
import { connect } from 'react-redux'
import ArticleForm from './ArticleForm';
import { startAddArticle } from '../actions/articlesActions';


export class AddArticle extends React.Component {
    onSubmit = (article) => {
        this.props.startAddArticle(article);
        this.props.history.push('/');
    };
    render () {
        return ( 
        <div>
            <h2>Creating Article</h2>
            <ArticleForm onSubmit={this.onSubmit} />
        </div>
        );
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddArticle: (article) => dispatch(startAddArticle(article))
});

export default connect( undefined, mapDispatchToProps)(AddArticle);

