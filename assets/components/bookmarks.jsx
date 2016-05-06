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

    updateBookmarks(bookmark){
        var bookmarks = this.state.bookmarks;
        bookmarks.unshift(bookmark);
        this.setState({
            bookmarks: bookmarks
        });
    }

    render() {
        return(
        	this.state.bookmarks
        		?
        	<div>
                <h2 className='inline-block'>Bookmarks</h2>
        		<BookmarkEditor ref='editor' updateBookmarks={this.updateBookmarks.bind(this)} />
        		<button className='btn btn-primary btn-add-bookmark inline-block' onClick={this.showModal.bind(this)}>Add Bookmark</button>
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
