import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';
import ArticleListFilter from './ArticleListFilter';
import yourArticlesFilter from '../selectors/yourArticlesFilter';

export const ArticleList = (props) => (
    <div className="main-content responsive-scroll">
        <ArticleListFilter />
        <ol className="list">
            {
            !!props.networkError
                ? <p className="server-error"> We are sorry ,but server is not responding ,please try to reconnect later.</p>   
                : (props.articles.length === 0) 
                    ? <p className="no-articles"> No articles fulfill these search conditions. </p>
                    : props.articles.map((article) => <ArticleListItem key={article._id} {...article} />)
            }
        </ol>
    </div>
);
 

const mapStateToProps = (state) => ({
    articles: yourArticlesFilter(state.articles, state.auth.id, state.filter),
    networkError: state.networkError
});

export default connect(mapStateToProps)(ArticleList);