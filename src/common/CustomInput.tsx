import React, { ChangeEvent } from "react";
interface ICustomInputProps {
  label:string,
  type:string,
  name:string,
  value: string,
  placeholder:string;
  OnChange:(e: ChangeEvent<HTMLInputElement>)=>void
}
   
const CustomInput: React.FC<ICustomInputProps> = ({label, type, name, placeholder, value, onChange}) => {
    return (
      <div className="group_element">
          <label htmlFor={name}>{label}</label>
          <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      </div>
    )
  }
  export default CustomInput;