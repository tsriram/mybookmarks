import React from 'react';
import {BootstrapModal} from './common/modal.jsx';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import {MyForm} from './common/myform.jsx';
const {Input} = FRC;

export class FolderEditor extends React.Component{
	constructor(props){
		super(props);
		this.SAVE_FOLDER_URL = '/folders';
	}

	setInitState(){
		this.refs.myform.refs.formsy.reset();
	}

	saveFolder(data){
		var _self = this;
		$.ajax({
      type: 'POST',
      url: this.SAVE_FOLDER_URL,
      dataType: 'json',
      data: data,
      success: function(result){
        _self.closeEditor();
        swal({
            type: 'success',
            title: result.msg
        });                
      },
      error: function(err){
    		swal({
    			type: 'error',
    			title: err.responseJSON.msg
    		});
      }
  	});
	}

	openEditor(){
		this.refs.folderModal.openModal();
	}

	closeEditor(){
		this.setInitState();
		this.refs.folderModal.closeModal();
	}

	render(){
		return(
			<BootstrapModal ref='folderModal' id='folder-editor' onClose={this.setInitState.bind(this)} >
    		<div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title">Folder</h4>
        </div>
        <MyForm layout='vertical' ref='myform' onSubmit={this.saveFolder.bind(this)}>
      		<div className="modal-body">	        			
      			<Input id='name' value={''} required name='name' label='Name' type='text' />
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
