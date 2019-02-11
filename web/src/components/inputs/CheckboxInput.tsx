import React from "react"

interface ICheckboxInputProps {
  label: string
  value?: string
  onChange?(val: string): void
}

export function CheckboxInput({ label, value, onChange }: ICheckboxInputProps) {
  return (
    <label className="input">
      <input type="checkbox" value={value} onChange={e => onChange && onChange(e.target.value)} />
      {label}
    </label>
  )
}
