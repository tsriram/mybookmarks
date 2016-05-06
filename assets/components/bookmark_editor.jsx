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
        this.state = {
        	folders: []
        }
    }

    open(){
    	this.refs.modal.openModal();
    	setTimeout(function(){
    		$('#url').focus();	
    	}, 500);    	
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

    save(data){
    	console.log('saving...', data);
    }

    render() {
        return(
        	<BootstrapModal ref='modal' >
        		<div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <MyForm layout='vertical' onSubmit={this.save}>
	        		<div className="modal-body">	        			
		        			<Input id='url' name='url' label='URL' type='text' />
		        			<Input name='title' label='Title' type='text' />
		        			<Input name='folder' label='Folder' type='text' />		        			
		        	</div>
	        		<div className="modal-footer">
	              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
	              <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
	            </div>
            </MyForm>
        	</BootstrapModal>
        )
    }
}