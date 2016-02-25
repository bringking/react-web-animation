import React,{ Component } from 'react';
import {Link} from 'react-router';
import Welcome from './welcome';

export default class App extends Component {
    getListItemStyle() {
        return {
            width: '100%',
            padding: '6px'
        };
    }

    render() {
        return <div style={{display: 'flex'}}>
            <div style={{width: '20vw',height: '100vh', borderRight: '1px solid #ddd',padding: '12px'}}>
                <ul style={{listStyle: 'none',margin: 0, padding: 0, width: '100%'}}>
                    <li style={this.getListItemStyle()}><Link to='/'>Home</Link></li>
                    <li style={this.getListItemStyle()}><Link to='/basic'>Basic</Link></li>
                    <li style={this.getListItemStyle()}><Link to='/basic-group'>Basic Group</Link></li>
                    <li style={this.getListItemStyle()}><Link to='/basic-sequence'>Basic Sequence</Link></li>
                    <li style={this.getListItemStyle()}><Link to='/parallax-starfield'>Parallax Starfield</Link></li>
                    <li style={this.getListItemStyle()}><Link to='/spinning-dots'>Spinning Dots</Link></li>

                </ul>
            </div>
            <div style={{width: '80vw',height: '100vh',padding: '12px',position: 'relative',overflow:'hidden'}}>
                {this.props.children || <Welcome/>}
            </div>

        </div>;
    }
}
