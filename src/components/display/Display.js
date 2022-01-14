import React, { useState } from 'react';
import './Display.css';
import { Container } from '../container/Container';
import Button from '../container/button/Button';
import { generatePassword } from '../../utils/Helper';

const Display = () => {
  const [password, setPassword] = useState('');
  const [range, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  let pwdDescription = '';

  const generateNewPassword = () => {
    const pwd = generatePassword(passwordProps, range);

    setPassword(pwd);
  };

  const setBackgroundColor = (password) => {
    if (password && password.length === 1 && password.length <= 5) {
      pwdDescription = 'Bad Password';
      return '#cb473e';
    } else if (password && password.length >= 6 && password.length <= 10) {
      pwdDescription = 'Weak Password';
      return '#f07d58';
    } else if (password && password.length > 10) {
      pwdDescription = 'Strong Password';
      return '#55a95d';
    } else {
      pwdDescription = ' Bad Password';
      return '#cb473e';
    }
  };
  return (
    <>
      <div className='row'>
        <div
          className='col-12 password-display-container'
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: '100%' }}>
            <div className='password-display'>
              <input
                type='text'
                value={password}
                readOnly
                className='password-display-input'
              />
            </div>
            <div className='password-description'>
              {password && password.length > 10 ? (
                <i className='fas fa-check-circle'> {pwdDescription}</i>
              ) : (
                <i className='fas fa-exclamation-circle'> {pwdDescription}</i>
              )}
            </div>
          </div>
          <div className='password-display-icons'>
            <Button className='copy-btn' iconClass='far fa-copy' />
            <Button
              className='generate-btn'
              iconClass='fas fa-sync'
              handleClick={() => generateNewPassword()}
            />
          </div>
        </div>
      </div>

      <Container
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
      />
    </>
  );
};

export default Display;
