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
        		<h2>{this.props.title}</h2>
        		<span>{this.props.url}</span>
        		<span>{this.props.folder}</span>
        	</div>
        )
    }
}