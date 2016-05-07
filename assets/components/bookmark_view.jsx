import React from 'react';
import ReactDOM from 'react-dom';

export class BookmarkView extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Bookmark View';
    }

    render() {
        return(
        	<div>
                <div>
            		<h4 className='inline-block'>{this.props.bookmark.title}</h4>
                    <button className='btn-bookmark-edit' onClick={this.props.onEdit.bind(this, this.props.bookmark)}>
                        <span className='glyphicon glyphicon-pencil'></span>
                    </button>
                </div>
        		<a href={this.props.bookmark.url} target='_blank'>{this.props.bookmark.url}</a>
        		<div>{this.props.bookmark.folder}</div>
        		<hr/>
        	</div>
        )
    }
}