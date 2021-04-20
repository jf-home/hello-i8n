import React from 'react'
import { Link } from 'gatsby'
//import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import { stubString } from 'lodash'

const Navbar = class extends React.Component {
//class Navbar extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    console.log(this.props.locale)
    console.log(this.props.location)
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to={this.props.locale === "en" ? "/" : ["/",this.props.locale,"/"].join("")} className="navbar-item" title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to={this.props.locale === "en" ? "/about" : ["/",this.props.locale,"/about"].join("")}>
                {this.props.locale === "en" ? "About" : "Über"}
              </Link>
              <Link className="navbar-item" to={this.props.locale === "en" ? "/products" : ["/",this.props.locale,"/products"].join("")}>
                Products
              </Link>
              <Link className="navbar-item" to={this.props.locale === "en" ? "/blog" : ["/",this.props.locale,"/blog"].join("")}>
                Blog
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <div className="current-language">
                {this.props.locale === "en" 
                  ? 
                    (<span className='navbar-item'><strong>English</strong> <Link to={['/','de', this.props.location.pathname].join('')} className='navbar-item'>Deutsh</Link></span>)
                  : 
                    (<span className='navbar-item'><strong>Deutsh</strong> <Link to={this.props.location.pathname.substring(3)} className='navbar-item'>English</Link></span>)
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar