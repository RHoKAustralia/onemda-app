import React from 'react';
import Select from "react-select"; 


export function FilterList ({handleChange, options}) {
  console.log(options); 


    return (    <Select options = {options} onChange= {v => handleChange(v.value)}/>

        );

}

