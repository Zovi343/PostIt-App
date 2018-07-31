import React from 'react';
import moment from 'moment';

class ArticleForm extends React.Component {
    state = {
        title: this.props.article ? this.props.article.title : '',
        text: this.props.article ? this.props.article.text : '',
        createdAt: moment().format('D.M.Y'),
        error: ''
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({
            title
        }))
    }
    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            text
        }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.title.trim().length < 3 || this.state.text.trim().length < 3) {
            this.setState(() => ({ error: 'Your title and text must contain at least 3 characters' }))
        } else {
            this.props.onSubmit({
                title: this.state.title,
                text: this.state.text,
                createdAt: this.state.createdAt
            });
        }
    }
    render () {
       return ( 
            <form onSubmit={this.onSubmit}> 
                {this.state.error && <p>{this.state.error}</p>}
                <input 
                    onChange={this.onTitleChange} 
                    placeholder="Title" 
                    type="text" 
                    value={this.state.title}
                />
                <textarea 
                    onChange={this.onTextChange}
                    placeholder="Add text for your article"
                    value={this.state.text}
                >
                </textarea>
                <input type="submit" value="Save Article" />
            </form>
       );
    }
}

export default ArticleForm;