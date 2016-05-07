import React from 'react';

export class BootstrapModal extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Modal';        
    }

    componentDidMount(){
      var _self = this;
      if(this.props.onClose){
        $('#react-modal').on('hidden.bs.modal', function(e){
          _self.props.onClose();
        });
      }  
    }

    openModal(){
      $('#' + this.props.id).modal('show');
    }

    closeModal(){
      $('#' + this.props.id).modal('hide');
    }

    render() {
        return(
          <div id={this.props.id} className="modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                  {this.props.children}
              </div>
            </div>
          </div>
        )
    }
}