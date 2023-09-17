import { useContext } from 'react';
import { SignContext } from '../../Context/SignContext.js';

export default function InputLine(props) {

  const { values, handleChange, errors } = useContext(SignContext);

  return (
    <label className="input-line">
      {props.children}
      <input className="input-line__input"
        name={props.name}
        value={values[props.name] || ''}
        onChange={handleChange}
        type={props.type}
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required />
      <span className={`input-line__error ${errors[props.name] ? "input-line__error_active" : ""}`}>{errors[props.name]}</span>
    </label>
  )
}
