import { useState } from "react";


// Simple checkbox component
export function Checkbox({ label, checked, onChange }) {

  const [isChecked, setIsChecked] = useState(checked || false);


  function toggle() {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  }


  return (
    <label className="checkbox-wrapper">

      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
      />

      <span className="checkbox-box">
        {isChecked ? "✔" : ""}
      </span>

      {label && <span className="checkbox-label">{label}</span>}

    </label>
  );
}
