import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

const Slider = (props) => {
  const { step, min, max, value, defaultLength, onChangeValue } = props;

  const activeRangeColor = '#4aa1f3';
  const rangeBackground = '#d7dcdf';

  const handleOnChange = (max) => (e) => {
    onChangeValue(e);
  };

  const progressValue = defaultLength;

  const progress = (progressValue / max) * 100 + '%';
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`,
  };

  return (
    <div className='slider-container'>
      <div className='slider'>
        <input
          className='range-slider'
          type='range'
          step={step}
          min={min}
          max={max}
          value={value}
          defaultLength={defaultLength}
          onChange={handleOnChange(max)}
          style={styleInput}
        />
        <span className='range-slider-value'>10</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  defaultLength: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Slider;
