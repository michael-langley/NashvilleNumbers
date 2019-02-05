import scssStyles from './Dropdown.module.css';

const customStyles = {
  multiValueLabel: provided => ({
    ...provided,
    backgroundColor: scssStyles.secondary,
    color: 'black',
    borderRadius: '0rem',
    letterSpacing: '0.3px',
  }),

  multiValueRemove: provided => ({
    ...provided,
    backgroundColor: scssStyles.secondary,
    color: 'black',
    borderRadius: '0rem',
    ':hover': {
      backgroundColor: scssStyles.gray500,
      transition: 'all 0.4s',
      cursor: 'pointer',
    },
  }),

  singleValue: provided => ({
    ...provided,
    fontSize: '0.8rem',
    letterSpacing: '0.3px',
    overflow: 'hidden',
    padding: '.2rem 1rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    //backgroundColor: scssStyles.secondary,
    color: 'black',
    textTransform: 'capitalize',
  }),

  container: provided => ({
    ...provided,
    fontSize: '0.9rem',
  }),

  menuList: provided => ({
    ...provided,
    fontSize: '16px',
    letterSpacing: '0.3px',
    color: 'black',
    maxHeight: '10rem',
  }),
};

export default customStyles;
