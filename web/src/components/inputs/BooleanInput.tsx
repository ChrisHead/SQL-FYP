import React from "react"

interface ISelectInputProps {
  label: string
  value?: boolean
  onChange?(val): void
}

export function BooleanInput({ label, onChange }: ISelectInputProps) {
  return (
    <label className="input">
      {label}
      <br />
      <select onChange={e => onChange && onChange(e.target.value)}>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </label>
  )
}
