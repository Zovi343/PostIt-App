import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';

export const ArticleList = (props) => (
    <div>
        <ol>
            {
                props.articles.map((article) => <ArticleListItem key={article._id} {...article} />)
            }
        </ol>
    </div>
)

const mapStateToProps = (state) => ({
    articles: state.articles
})

export default connect(mapStateToProps)(ArticleList)