import React from 'react';
import uuid from 'uuid';
import moment from 'moment';

class CommentArticle extends React.Component {
    state = {
        comment: '',
        createdAt: moment().format('D. M. Y'),
        error: ''
    };
    onTextareaChange = (e) => {
        const comment = e.target.value;
        this.setState(() => ({
            comment
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.comment.trim().length < 3) {
            this.setState(() => ({
                error: 'Yout comment must contain at least 3 characters.'
            }));
        } else {
            const id = uuid();
            this.props.onSubmit({...this.state, id});
            this.setState(() =>  ({
                comment: '',
                error: ''
            }));
        }
    }
    render () {
        return (
            <form onSubmit={this.onSubmit}>
                { this.state.error && <p>{this.state.error}</p>}
                <textarea 
                    onChange={this.onTextareaChange} 
                    placeholder="What are your thoughts ?"
                    value={this.state.comment}
                >
                </textarea>
                <input type="submit" value="Comment" />
            </form>
        );
    };
};

export default CommentArticle;