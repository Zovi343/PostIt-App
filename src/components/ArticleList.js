import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';
import ArticleListFilter from './ArticleListFilter';
import yourArticlesFilter from '../selectors/yourArticlesFilter';

export const ArticleList = (props) => (
    <div>
        {
            !!props.networkError 
            ? 
            (<h1>Server is down please try reconnect later </h1>)
            :
            (
                <div>
                    <ArticleListFilter />
                    <ol>
                        {
                            (props.articles.length === 0) 
                            ? <p> No articles fulfill these search conditions. </p>
                            : props.articles.map((article) => <ArticleListItem key={article._id} {...article} />)
                        }
                    </ol>
                </div>
            )
        }
    </div>
);
 

const mapStateToProps = (state) => ({
    articles: yourArticlesFilter(state.articles, state.auth.id, state.filter),
});

export default connect(mapStateToProps)(ArticleList);