import React from 'react';
import ReactDOM from 'react-dom';
import {BookmarkView} from './bookmark_view.jsx';
import {BookmarkEditor} from './bookmark_editor.jsx';

class Bookmarks extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Bookmarks';
        this.GET_BOOKMARKS_URL = '/bookmarks';
        this.state = {
        	bookmarks: []
        }
    }

    componentDidMount(){
    	var _self = this;
    	$.ajax({
    		url: this.GET_BOOKMARKS_URL,
    		dataType: 'json',
    		cache: false,
    		success: function(data){
    			_self.setState({
    				bookmarks: data
    			});
    		}
    	});
    }

    showModal(){
    	this.refs.editor.open();
    }

    render() {
        return(
        	this.state.bookmarks
        		?
        	<div>        		
        		<BookmarkEditor ref='editor' />
        		<button onClick={this.showModal.bind(this)}>Add Bookmark</button>
        		{
        			this.state.bookmarks.map(function(bookmark, index){
		        		return (
		        			<BookmarkView key={bookmark.title + index} {...bookmark}> </BookmarkView>
		        		)
		        	})
        		}	        	
        	</div>
        		:
        	<h2>No Bookmarks!</h2>
        );
    }
}

ReactDOM.render(<Bookmarks />, document.getElementById('react-root'));
