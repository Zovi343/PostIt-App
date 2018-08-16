import React from 'react';
import { connect } from 'react-redux';
import ArticleListItem from './ArticleListItem';
import yourArticlesFilter from '../selectors/yourArticlesFilter';
import { setYourArticlesFilter, removeYourArticlesFilter } from '../actions/filterActions';

export class ArticleList extends React.Component { 
    handleSeeAll = () => {
            this.props.removeYourArticlesFilter();
    }
    handleSeeYours = () => {
        this.props.setYourArticlesFilter();
    }
    disablingBtnSeeAll = () => {
        if(this.props.filter) {
            return false;
        } else {
            return true;
        }
    }
    disablingBtnSeeYours = () => {
        if(this.props.user.name && !this.props.filter) {
            return false;
        } else {
            return true;
        }
    }
    
    render () { 
        return  ( 
            <div>
                {
                    !!this.props.networkError 
                    ? 
                    (<h1>Server is down please try reconnect later </h1>)
                    :
                    (
                        <div>
                            <div>
                                <button onClick={this.handleSeeAll} disabled={this.disablingBtnSeeAll()}>See All Articles</button>
                                <button onClick={this.handleSeeYours} disabled={this.disablingBtnSeeYours()}>See Your Articles</button>
                            </div>
                            <ol>
                                {
                                    (this.props.articles.length === 0 && !!this.props.filter ) 
                                    ? <p> You haven't created any articles yet. </p>
                                    : this.props.articles.map((article) => <ArticleListItem key={article._id} {...article} />)
                                }
                            </ol>
                        </div>
                    )
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    articles: state.filter ? yourArticlesFilter(state.articles, state.auth.id) : state.articles,
    filter: state.filter,
    networkError: state.networkError,
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    setYourArticlesFilter: () => dispatch(setYourArticlesFilter()),
    removeYourArticlesFilter: () => dispatch(removeYourArticlesFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);