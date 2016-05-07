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
      $('#react-modal').modal('show');
    }

    closeModal(){
      $('#react-modal').modal('hide');
    }

    render() {
        return(
          <div id='react-modal' className="modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                  {this.props.children}
              </div>
            </div>
          </div>
        )
    }
}