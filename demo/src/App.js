import React, { Component } from 'react';
import { Link } from 'react-router';
import Welcome from './welcome';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    };

    this.onMenuClick = this.onMenuClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

  }

  onMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  getListItemStyle() {
    return {
      width: '100%',
      padding: '6px'
    };
  }

  render() {
    return <div style={{ display: 'flex' }}>
      <div className={`menu ${this.state.menuOpen ? 'active' : ''}`}>
        <button className={`menu-button ${this.state.menuOpen ? 'active' : ''}`} onClick={this.onMenuClick}>Menu
        </button>
        <ul style={{ listStyle: 'none', margin: 0, padding: '12px' }}>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/'>Home</Link></li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/basic'>Basic</Link></li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/basic-group'>Basic Group</Link></li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/basic-sequence'>Basic Sequence</Link>
          </li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/parallax-starfield'>Parallax
            Starfield</Link></li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/spinning-dots'>Spinning Dots</Link>
          </li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/animate-css'>AnimateCSS</Link></li>
          <li style={this.getListItemStyle()} onClick={this.closeMenu}><Link to='/scrolling'>Scrolling</Link></li>
        </ul>
      </div>
      <div className="example-display">
        {this.props.children || <Welcome/>}
      </div>
    </div>;
  }
}
