import React from 'react';


import './SectionHeader.css';


function SectionHeader(props) {
  return (
    <p className="section-header">{props.title}</p>
  );
}

export default SectionHeader;