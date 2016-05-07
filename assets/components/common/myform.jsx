import React from 'react';
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

exports.MyForm = MyForm;