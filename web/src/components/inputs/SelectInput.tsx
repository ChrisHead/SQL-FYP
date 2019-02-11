import React from "react"

interface ISelectInputProps {
  label: string
  options: { value: string; label: string }[]
  value?: string
  blank?: string
  onChange?(val: string): void
}

export function SelectInput({ label, blank, value, onChange, options }: ISelectInputProps) {
  return (
    <label className="input">
      {label}
      <br />
      <select value={value} onChange={e => onChange && onChange(e.target.value)}>
        {blank && <option>{blank}</option>}
        {options.map(option => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}
