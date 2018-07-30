import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentArticle from './CommentArticle';
import { commentArticle} from '../actions/articlesActions'; 

class ViewArticle extends React.Component {
    onSubmit = (comment) => {
        this.props.dispatch(commentArticle(this.props.article.id ,comment));
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
