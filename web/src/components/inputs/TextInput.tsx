import React from "react"

interface ITextInputProps {
  label: string
  value?: string
  onChange?(val: string): void
}

export function TextInput({ label, value, onChange }: ITextInputProps) {
  return (
    <label className="input">
      {label}
      <br />
      <input
        type="text"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      />
    </label>
  )
}
