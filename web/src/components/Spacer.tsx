import React from "react"

interface IProps {
  width?: keyof typeof sizes
  height?: keyof typeof sizes
}

const sizes = {
  small: 8,
  medium: 16,
  large: 32,
}

export function Spacer({ width, height }: IProps) {
  const cssWidth = width ? sizes[width] : 0
  const cssHeight = height ? sizes[height] : 0
  return <div style={{ width: cssWidth, height: cssHeight }} />
}
