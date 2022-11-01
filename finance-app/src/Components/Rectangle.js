import './Rectangle.css';
import Navigation from './Navigation';
import MainField from './MainField';
// import MainFieldCosts from './MainFieldCosts';
import { useState } from 'react';
// import MainFieldStorage from './MainFieldStorage';

function Rectangle() {
  const [mainFieldBlock, setMainFieldBlock] = useState(MainField)
  function changeMainField(field) {
    setMainFieldBlock(field);
  }
  
  
  return (
    <div className="rectangle">
      <Navigation func={changeMainField} />
      {mainFieldBlock} 
    </div>
  );
}
export default Rectangle;

