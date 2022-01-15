import React, { useState, useEffect } from 'react';
import Button from './button/Button.js';
import './Container.css';
import Slider from './slider/Slider.js';
import CheckBox from './checkbox/CheckBox.js';
import { generatePassword, setPasswordLength } from '../../utils/Helper.js';

const CHECKBOX_LIST = [
  {
    id: 0,
    name: 'uppercase',
    label: 'Uppercase',
    isChecked: true,
  },
  {
    id: 1,
    name: 'lowercase',
    label: 'Lowercase',
    isChecked: true,
  },
  {
    id: 2,
    name: 'symbols',
    label: 'Symbols',
    isChecked: true,
  },
  {
    id: 3,
    name: 'numbers',
    label: 'Numbers',
    isChecked: true,
  },
];

const Container = (props) => {
  const { setPassword, setRange, setPasswordProps } = props;

  const [rangeValue, setRangeValue] = useState(12);
  const [checkBox, setCheckBox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });

  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState('');

  const { uppercase, lowercase, symbols, numbers } = checkBox;

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    setRangeValue(rangeValue);
    passwordGenerated(checkBox, rangeValue);
    checkBoxCount();

    //eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkBox).filter((key) => checkBox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];

    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName('');
    }
  };

  const passwordGenerated = (checkBox, rangeValue) => {
    const pwd = generatePassword(checkBox, rangeValue);
    setPassword(pwd);
    setPasswordProps(checkBox);
  };

  const onChangeSlider = (e) => {
    setPasswordLength(e.target.value);
    setRangeValue(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkBox, e.target.value);
  };

  const onChangeCheckBox = (e) => {
    let { name, checked } = e.target;
    CHECKBOX_LIST.map((checkBox) => {
      if (checkBox.name === name) {
        checkBox.isChecked = checked;
        setCheckBox((prevState) => ({
          ...prevState,
          [name]: checkBox.isChecked,
        }));
        setPasswordLength(rangeValue);
        setRangeValue(rangeValue);
      }
      return '';
    });
  };

  return (
    <div className='row password-settings'>
      <h3>Use the slider, and select from the options</h3>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            &nbsp;
            <Slider
              min={1}
              max={60}
              step={1}
              value={parseInt(rangeValue, 10)}
              defaultLength={parseInt(rangeValue, 10)}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='row checkbox-container'>
            {CHECKBOX_LIST.map((checkBox) => (
              <CheckBox
                key={checkBox.id}
                name={checkBox.name}
                label={checkBox.label}
                value={checkBox.isChecked}
                checked={checkBox.isChecked}
                onChange={onChangeCheckBox}
                disabled={
                  checked && checkBox.isChecked && checkedName === checkBox.name
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className='text-center'>
        <div className='row'>
          <div className='col-md-12'>
            <Button className='btn password-btn' label='Copy Password' />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Container };
