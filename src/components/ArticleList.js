import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';
import yourArticlesFilter from '../selectors/yourArticlesFilter';

export const ArticleList = (props) => (
    <div>
        {
            !!props.networkError 
            ? 
            (<h1>Server is down please try reconnect later </h1>)
            :
            (<ol>
                {
                    (props.articles.length === 0 && !!props.filter ) 
                    ? <p> You haven't created any articles yet. </p>
                    :props.articles.map((article) => <ArticleListItem key={article._id} {...article} />)
                }
            </ol>)
        }
    </div>
);

const mapStateToProps = (state) => ({
    articles: state.filter ? yourArticlesFilter(state.articles, state.auth.id) : state.articles,
    filter: state.filter,
    networkError: state.networkError
});

export default connect(mapStateToProps)(ArticleList);