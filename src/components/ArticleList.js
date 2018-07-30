import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';

const ArticleList = (props) => (
    <div>
        <ol>
            {
                props.articles.map((article) => <ArticleListItem key={article.id} {...article} />)
            }
        </ol>
    </div>
)

const mapStateToProps = (state) => ({
    articles: state.articles
})

export default connect(mapStateToProps)(ArticleList)