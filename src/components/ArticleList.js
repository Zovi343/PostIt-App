import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';

const ArticleList = (props) => (
    <div>
        <ol>
            {
                props.articles.map((article) => <ListItem key={article.id} {...article} />)
            }
        </ol>
    </div>
)

const mapStateToProps = (state) => ({
    articles: state.articles
})

export default connect(mapStateToProps)(ArticleList)