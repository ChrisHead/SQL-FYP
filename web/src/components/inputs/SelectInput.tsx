import React from "react"

interface ISelectInputProps {
  label: string
  options: { key: number; value: string; label: string }[]
  value?: string
  blank?: string
  onChange?(val: string): void
  required?: boolean
}

export function SelectInput({
  label,
  blank,
  value,
  onChange,
  options,
  required,
}: ISelectInputProps) {
  return (
    <label className="input">
      {label}
      <br />
      <select
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        required={required}
      >
        {blank && <option>{blank}</option>}
        {options.map(option => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
