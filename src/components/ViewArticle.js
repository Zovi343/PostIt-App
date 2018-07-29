import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ViewArticle = ({ article }) => (
    <div>
        {
            !!article ? (
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.createdAt}</p>
                    <p>{article.text}</p>
                    <Link to={`/edit/${article.id}`}>Edit Article</Link>
                </div>
            ) : (
                <h2> This article doesn't exist! </h2>
            )
        }
    </div>
);

const mapStateToProps = (state, props) =>({
    article: state.articles.find((article) => article.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewArticle);
