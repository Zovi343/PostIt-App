import React from 'react';
import { connect } from 'react-redux';
import { setYourArticlesFilter, removeYourArticlesFilter, setTextFilter } from '../actions/filterActions';

export class ArticleListFilter extends React.Component {
    handleSeeAll = () => {
            this.props.removeYourArticlesFilter();
            this.props.setTextFilter('');
    }
    handleSeeYours = () => {
        this.props.setYourArticlesFilter();
    }
    disablingBtnSeeAll = () => {
        if(this.props.filter.yourArticles || !!this.props.filter.text) {
            return false;
        } else {
            return true;
        }
    }
    disablingBtnSeeYours = () => {
        if(this.props.user.name && !this.props.filter.yourArticles) {
            return false;
        } else {
            return true;
        }
    }
    onTextFilterChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    onSubmit = (e) => {
        //This is here in order to prevent user on mobile from sunmiting form
        e.preventDefault();
    }
    
    render () { 
        return  ( 
            <div className="filter">
                <form onSubmit={this.onSubmit} className="filter__group filter-form"> 
                    <input
                        className="filter-form__input"
                        onChange={this.onTextFilterChange} 
                        type="text" 
                        placeholder="Search Article By Name"
                        value={this.props.filter.text}
                    />
                </form>
                <button className="filter__group btn btn--green" onClick={this.handleSeeAll} disabled={this.disablingBtnSeeAll()}>See All Articles</button>
                <button className="filter__group btn btn--green" onClick={this.handleSeeYours} disabled={this.disablingBtnSeeYours()}>See Your Articles</button>
            </div>                
        )
    };
}

const mapStateToProps = (state) => ({
    filter: state.filter,
    user: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    setYourArticlesFilter: () => dispatch(setYourArticlesFilter()),
    removeYourArticlesFilter: () => dispatch(removeYourArticlesFilter()),
    setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListFilter);

