import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Basic from './basic';
import BasicGroup from './basic_group';
import BasicSequence from './basic_sequence';
import ParallaxStarfield from './parallax_starfield';
import SpinningDots from './spinning_dots';
import AnimateCss from './animate_css';
import Scrolling from './scrolling';
import Welcome from './welcome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };

    this.onMenuClick = this.onMenuClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  onMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  getListItemStyle() {
    return {
      width: '100%',
      padding: '6px',
    };
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div className={`menu ${this.state.menuOpen ? 'active' : ''}`}>
          <button
            className={`menu-button ${this.state.menuOpen ? 'active' : ''}`}
            onClick={this.onMenuClick}
          >
            Menu
          </button>
          <ul style={{ listStyle: 'none', margin: 0, padding: '12px' }}>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/">Home</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/basic">Basic</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/basic-group">Basic Group</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/basic-sequence">Basic Sequence</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/parallax-starfield">Parallax Starfield</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/spinning-dots">Spinning Dots</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/animate-css">AnimateCSS</Link>
            </li>
            <li style={this.getListItemStyle()} onClick={this.closeMenu}>
              <Link to="/scrolling">Scrolling</Link>
            </li>
          </ul>
        </div>
        <div className="example-display">
          <Switch>
            <Route path="/basic" component={Basic} />
            <Route path="/basic-group" component={BasicGroup} />
            <Route path="/basic-sequence" component={BasicSequence} />
            <Route path="/parallax-starfield" component={ParallaxStarfield} />
            <Route path="/spinning-dots" component={SpinningDots} />
            <Route path="/animate-css" component={AnimateCss} />
            <Route path="/scrolling" component={Scrolling} />
            <Route component={Welcome} />
          </Switch>
        </div>
      </div>
    );
  }
}
