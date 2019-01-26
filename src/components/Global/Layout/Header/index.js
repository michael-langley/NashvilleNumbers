import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Media } from 'react-breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import Button from '../../Button';
import buttonStyles from '../../Button/Button.module.scss';
import Link from '../../Link';
import linkStyles from '../../Link/Link.module.scss';

const propTypes = {
  customClasses: PropTypes.string,
  handleMenuToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  permanentMenu: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  htmlAttributes: PropTypes.instanceOf(Object),
};
const defaultProps = {
  customClasses: '',
  handleMenuToggle: () => {},
  permanentMenu: false,
  children: null,
  style: {},
  htmlAttributes: {},
};

const Header = ({
  customClasses,
  handleMenuToggle,
  permanentMenu,
  children,
  style,
  htmlAttributes,
}) => (
  <Media>
    {({ breakpoints, currentBreakpoint }) => {
      const classes = classNames(styles.header, {
        [customClasses]: !!customClasses,
      });

      const isMobile = breakpoints[currentBreakpoint] <= breakpoints.tablet;

      return (
        <nav className={classes} style={style} {...htmlAttributes}>
          <div className={styles['header-brand']}>
            <Link customClasses={linkStyles['link-brand']} to="/">
              Nashville Numbers
            </Link>
          </div>

          {!isMobile
            && !permanentMenu && (
              <div className={styles['header-links']}>{children}</div>
          )}

          {/* {(isMobile || permanentMenu) && (
            <Button
              customClasses={buttonStyles['btn-menutoggle']}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          )} */}
        </nav>
      );
    }}
  </Media>
);

export default Header;

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
