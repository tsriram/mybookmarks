import React from 'react';
import {BootstrapModal} from './common/modal.jsx';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const { Input, Row, Select } = FRC;

const MyForm = React.createClass({

    mixins: [FRC.ParentContextMixin],

    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <Formsy.Form
                className={this.getLayoutClassName()}
                {...this.props}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }

});

export class BookmarkEditor extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Bookmark Editor';
        this.GET_FOLDERS_URL = '/folders';
        this.SAVE_BOOKMARK_URL = '/bookmarks';
        this.state = {
        	folders: [],
            edit: false,
            bookmark: {}
        }
    }

    setInitState(){
        console.log('BookmarkEditor setInitState');
        this.setState({
            folders: [],
            edit: false,
            bookmark: {}
        });
    }

    open(bookmark){
        if(bookmark){
            this.setState({
                bookmark: bookmark,
                edit: true
            });
        }
    	this.refs.modal.openModal();
    	setTimeout(function(){
    		$('#url').focus();	
    	}, 500);    	
    }

    closeEditor(){
        this.setInitState();
        this.refs.modal.closeModal();
    }

    componentDidMount() {
    	var _self = this;
    	$.ajax({
    		url: this.GET_FOLDERS_URL,
    		dataType: 'json',
    		cache: false,
    		success: function(data){
    			var folders = data.map(function(folder){ 
    				return {
    					label: folder.name
    				}; 
    			});
    			_self.setState({
    				folders: folders
    			});
    		}
    	});
    }

    saveBookmark(data){
        var _self = this;
    	$.ajax({
            type: this.state.edit ? 'PUT' : 'POST',
            url: this.state.edit ? this.SAVE_BOOKMARK_URL + '/' + this.state.bookmark._id : this.SAVE_BOOKMARK_URL,
            dataType: 'json',
            data: data,
            success: function(result){
                _self.refs.modal.closeModal();
                swal({
                    type: 'success',
                    title: result.msg
                });
                _self.props.updateBookmarks(data, _self.state.bookmark._id);
                _self.setInitState();
            }
        });
    }

    render() {
        return(
        	<BootstrapModal ref='modal' onClose={this.setInitState.bind(this)} >
        		<div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <MyForm layout='vertical' onSubmit={this.saveBookmark.bind(this)}>
	        		<div className="modal-body">	        			
	        			<Input id='url' value={this.state.bookmark.url} required name='url' label='URL' type='text' />
	        			<Input name='title' value={this.state.bookmark.title} label='Title' type='text' />
	        			<Input name='folder' value={this.state.bookmark.folder} label='Folder' type='text' />		        			
		        	</div>
	        		<div className="modal-footer">
	              <button type="button" className="btn btn-default" onClick={this.closeEditor.bind(this)}>Close</button>
	              <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
	            </div>
            </MyForm>
        	</BootstrapModal>
        )
    }
}