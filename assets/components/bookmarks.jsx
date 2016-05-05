import React from 'react';
import ReactDOM from 'react-dom';

class Bookmarks extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Bookmarks';
    }
    render() {
        return <div>Bookmarks</div>;
    }
}

ReactDOM.render(<Bookmarks />, document.getElementById('react-root'));
