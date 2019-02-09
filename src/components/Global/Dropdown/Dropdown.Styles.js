import {
  secondary,
  gray500,
} from '../../../styles/pulse.bootswatch.min.css';

const customStyles = {
  multiValueLabel: provided => ({
    ...provided,
    backgroundColor: secondary,
    color: 'white',
    borderRadius: '0rem',
    letterSpacing: '0.3px',
  }),

  multiValueRemove: provided => ({
    ...provided,
    backgroundColor: secondary,
    color: 'white',
    borderRadius: '0rem',
    ':hover': {
      backgroundColor: gray500,
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
    backgroundColor: secondary,
    color: 'white',
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
