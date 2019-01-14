import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-breakpoints';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Link from '../Link';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  noHeader: PropTypes.bool,
  permanentMenu: PropTypes.bool,
  noFooter: PropTypes.bool,
  customHeaderClasses: PropTypes.string,
  customMenuClasses: PropTypes.string,
  customFooterClasses: PropTypes.string,
  pageHeader: PropTypes.node,
};

const defaultProps = {
  noHeader: false,
  permanentMenu: false,
  noFooter: true,
  customHeaderClasses: '',
  customMenuClasses: '',
  customFooterClasses: '',
  pageHeader: null,
};

class Layout extends React.Component {
  state = {
    header: true,
    menu: false,
    footer: true,
  };

  componentDidMount() {
    const { noHeader, noFooter, permanentMenu } = this.props;

    if (noHeader) {
      this.setState({ header: false });
    }

    if (noFooter) {
      this.setState({ footer: false });
    }

    if (permanentMenu) {
      this.setState({ menu: true });
    }
  }

  handleMenuToggle = () => {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }));
  };

  render() {
    const {
      children,
      permanentMenu,
      customHeaderClasses,
      customMenuClasses,
      customFooterClasses,
      pageHeader,
    } = this.props;
    const { header, menu, footer } = this.state;

    const navLinks = [
      <Link key={1} to="/">
        Dashboard
      </Link>,
      <Link key={2} to="/test-runner">
        Test Runner
      </Link>,
      // <Link key={3} to="/deployments">
      //   Deployments
      // </Link>,
    ];

    return (
      <Media>
        {({ breakpoints, currentBreakpoint }) => {
          const isMobile = breakpoints[currentBreakpoint] <= breakpoints.tablet;

          return (
            <div className="d-flex flex-column wrapper">
              {header && (
                <div className="row">
                  <Header
                    handleMenuToggle={this.handleMenuToggle}
                    permanentMenu={permanentMenu}
                    customClasses={customHeaderClasses}
                  >
                    {navLinks}
                  </Header>
                </div>
              )}
              {isMobile
                && menu && (
                  <Menu
                    locationClassname="menu-top"
                    customClasses={customMenuClasses}
                  >
                    {navLinks}
                  </Menu>
              )}
              {pageHeader}
              {permanentMenu
                && !isMobile
                && menu && (
                  <div className="row flex-grow-1">
                    <div className="col-2">
                      <Menu
                        locationClassname="menu-left"
                        customClasses={customMenuClasses}
                      >
                        {navLinks}
                      </Menu>
                    </div>

                    <div className="col-9 ml-1 container">
                      {children}
                    </div>
                  </div>
              )}

              {(!permanentMenu || !menu || isMobile) && (
                <div className="row flex-grow-1">
                  <div className="container">{children}</div>
                </div>
              )}
              <div className="push" />

              {footer && (
                <div className="row">
                  <Footer customClasses={customFooterClasses}>
                    Footer
                  </Footer>
                </div>
              )}
            </div>
          );
        }}
      </Media>
    );
  }
}

export default Layout;

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
