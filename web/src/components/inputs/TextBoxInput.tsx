import React from "react"

interface ITextBoxInputProps {
  label: string
  value?: string
  onChange?(val: string): void
}

export function TextBoxInput({ label, value, onChange }: ITextBoxInputProps) {
  return (
    <label className="input">
      {label + ":"}
      <br />
      <textarea
        style={{ display: "flex" }}
        required
        cols={106}
        rows={10}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      />
    </label>
  )
}
