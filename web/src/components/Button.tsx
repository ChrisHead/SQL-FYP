import * as React from "react"

interface IProps {
  children: React.ReactNode
  onClick(e: React.MouseEvent<HTMLDivElement>): void
}

export const Button = ({ onClick, children }: IProps) => (
  <div onClick={onClick}>{children}</div>
)
