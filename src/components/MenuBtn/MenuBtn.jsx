import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuBtn extends Component {
  render() {
    return (
      <Link to='/breakfast'>
        <button type='button' className='btn btn-success btn-lg text-capitalize mx-2'>
          Our full menu
        </button>
      </Link>
    );
  }
}

export default MenuBtn;
