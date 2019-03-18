import React from "react"

interface IPasswordInputProps {
  label: string
  value?: string
  onChange?(val: string): void
}

export function PasswordInput({ label, value, onChange }: IPasswordInputProps) {
  return (
    <label className="input">
      {label}
      <br />
      <input
        type="password"
        required
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
      />
    </label>
  )
}
