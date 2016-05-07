import React from 'react';
import ReactDOM from 'react-dom';

export class BookmarkView extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Bookmark View';
        this.SCREENSHOT_BASE_URL = "http://api.screenshotlayer.com/api/capture?access_key=bf6ea1cf3a39ec526e7eba15a46a7f3d&viewport=1440x900&width=250&url=";
    }

    render() {
        var imgUrl = this.SCREENSHOT_BASE_URL + this.props.bookmark.url;
        var style = {
            backgroundImage: 'url(' + imgUrl + ')',
        };
        return(
        	<div className='bookmark'>
                <div className='site-img' style={style}>
                </div>
                <div className='bookmark-text'>
                    <div>
                		<h4 className='inline-block'>{this.props.bookmark.title}</h4>
                        <button className='btn-bookmark-edit' title='Edit bookmark' onClick={this.props.onEdit.bind(this, this.props.bookmark)}>
                            <span className='glyphicon glyphicon-pencil'></span>
                        </button>
                    </div>
            		<a href={this.props.bookmark.url} target='_blank'>{this.props.bookmark.url}</a>
            		<div>
                        <span className='glyphicon glyphicon-folder-open foler-icon' title='Folder' />
                        {this.props.bookmark.folder}
                    </div>
                </div>
        	</div>
        )
    }
}