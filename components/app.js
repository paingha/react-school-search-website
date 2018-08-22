import React, {Component} from 'react'
import Footer from './shared/footer'

export class App extends Component {
    render () {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
            
        );
    }
}