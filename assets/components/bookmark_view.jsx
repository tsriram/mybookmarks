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
        		<h4>{this.props.title}</h4>
        		<a href={this.props.url} target='_blank'>{this.props.url}</a>
        		<div>{this.props.folder}</div>
        		<hr/>
        	</div>
        )
    }
}