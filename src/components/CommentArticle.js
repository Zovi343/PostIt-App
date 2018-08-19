import React from 'react';
import moment from 'moment';

class CommentArticle extends React.Component {
    state = {
        comment: '',
        createdAt: moment().format('D.M.Y'),
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
            this.props.onSubmit({comment: this.state.comment, createdAt: this.state.createdAt});
            this.setState(() =>  ({
                comment: '',
                error: ''
            }));
        }
    }
    render () {
        return (
            <form className="comment-form" onSubmit={this.onSubmit}>
                { this.state.error && <p>{this.state.error}</p>}
                <textarea 
                    onChange={this.onTextareaChange} 
                    placeholder="What are your thoughts ?"
                    value={this.state.comment}
                >
                </textarea>
                <input className="btn btn--green" disabled={this.props.likeOrCommentAllowed} type="submit" value="Comment" />
            </form>
        );
    };
};

export default CommentArticle;