import React from 'react';
import moment from 'moment';

class ArticleForm extends React.Component {
    state = {
        title: '',
        text: '',
        createdAt: moment().format('D. M. Y')
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
        this.props.onSubmit(this.state)
    }
    render () {
       return ( 
        <div> 
            <form onSubmit={this.onSubmit}> 
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
                <input type="submit" value="Submit" />
            </form>
        </div>
       );
    }
}

export default ArticleForm;