import React, { useState, useRef } from 'react';
import './Display.css';
import { Container } from '../container/Container';
import Button from '../container/button/Button';
import { generatePassword, copyToClipBoard } from '../../utils/Helper';
import Tooltip from '../container/tooltip/Tooltip.js';

const Display = () => {
  const [password, setPassword] = useState('');
  const [range, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const passwordRef = useRef(null);
  let pwdDescription = '';

  const generateNewPassword = () => {
    const pwd = generatePassword(passwordProps, range);

    setPassword(pwd);
  };

  const copyClipBoard = (e) => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);
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
                ref={passwordRef}
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
            <Button
              className='copy-btn'
              iconClass='far fa-copy'
              handleClick={(e) => copyClipBoard(e)}
            />
            <Button
              className='generate-btn'
              iconClass='fas fa-sync'
              handleClick={() => generateNewPassword()}
            />
            <Tooltip
              message='Copied'
              position='left'
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>

      <Container
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />
    </>
  );
};

export default Display;
