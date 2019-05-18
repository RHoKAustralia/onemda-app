import React from 'react';
import Select from "react-select";


export function FilterList({ handleChange, options, isMulti = false }) {
  return (
    <Select options={options} onChange={v => handleChange(v.value)} isMulti={isMulti} />
  );

}

