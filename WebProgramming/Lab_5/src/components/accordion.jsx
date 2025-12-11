import React, { useState } from 'react';
import './accordion.css';

const accordion = ({ items }) => {
  const [activeindex, setactiveindex] = useState(null);
  const click = (index) => {
    setactiveindex(activeindex === index ? null : index);
  };
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="item">
          <div 
            className={`title ${activeindex === index ? 'active' : ''}`}
            onClick={() => click(index)}
          >
            <h3>{item.title}</h3>
            <span className="icon">
              {activeindex === index ? '−' : '+'}
            </span>
          </div>
          <div 
            className={`content ${activeindex === index ? 'active': ''}`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default accordion;