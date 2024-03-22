import { useState } from "react"

const { default: DisplayElement } = require("./DisplayElement")

export default function MinuteSelector({ initialValue=0, text="", disabled=false, onUpdate=null }) {
  const [value, setValue] = useState(initialValue);

  function incrementValue() {
    if (onUpdate)
      onUpdate(value + 1);

    setValue(value + 1);
  } 
  
  function decrementValue() {
    if (onUpdate)
      onUpdate(value - 1);
    setValue(value - 1);
  } 
  
  return (
  <DisplayElement 
    text={text} 
    numbersBackground="88" 
    numbers={value}
    buttonAText="-"
    buttonBText="+"
    buttonAOnClick={decrementValue}
    buttonBOnClick={incrementValue}
  />
  );
}