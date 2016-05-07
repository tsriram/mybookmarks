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

    updateBookmarks(bookmark, _id){
        var bookmarks = this.state.bookmarks;
        if(_id){
            for (var i = bookmarks.length - 1; i >= 0; i--) {
                if(bookmarks[i]._id === _id){
                    bookmarks[i].url = bookmark.url;
                    bookmarks[i].title = bookmark.title;
                    bookmarks[i].folder = bookmark.folder;
                    break;
                }
            }
        }else{
            bookmarks.unshift(bookmark);
        }
        this.setState({
            bookmarks: bookmarks
        });
    }

    editBookmark(bookmark){
        console.log(bookmark);
        this.refs.editor.open(bookmark);
    }

    render() {
        var _self = this;
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
		        			<BookmarkView key={index} onEdit={_self.editBookmark.bind(_self)} bookmark={bookmark}> </BookmarkView>
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
