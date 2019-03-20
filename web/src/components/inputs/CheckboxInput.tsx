import React from "react"

interface ICheckboxInputProps {
  label: string
  value?: string
  onChange?(val: string): void
}

export function CheckboxInput({ label, value, onChange }: ICheckboxInputProps) {
  return (
    <label
      className="input"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        flex: 1,
      }}
    >
      <input
        type="checkbox"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      />
      {label}
    </label>
  )
}
