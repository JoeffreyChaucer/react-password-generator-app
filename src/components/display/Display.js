import React from 'react';
import './Display.css';
import { Container } from '../container/Container';
import Button from '../container/button/Button';

const Display = () => {
  return (
    <>
      <div className='row'>
        <div className='col-12 password-display-container'>
          <div>
            <div className='password-display'>
              <input
                type='text'
                value='dsa5es534trsdf'
                readOnly
                className='password-display-input'
              />
            </div>
            <div className='password-description'>
              <i className='fas fa-check-circle'> Strong password</i>
            </div>
          </div>
          <div className='password-display-icons'>
            <Button className='copy-btn' iconClass='far fa-copy' />
            <Button className='generate-btn' iconClass='fas fa-sync' />
          </div>
        </div>
      </div>

      <Container />
    </>
  );
};

export default Display;
