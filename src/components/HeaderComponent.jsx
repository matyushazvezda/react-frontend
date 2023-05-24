import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="navbar-brand afisha-link">
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Афиша</Link>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
