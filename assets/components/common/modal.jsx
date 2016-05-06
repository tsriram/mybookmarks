import React from 'react';

export class BootstrapModal extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Modal';
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