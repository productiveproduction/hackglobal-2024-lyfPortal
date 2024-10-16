import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;

  ${props => props.variant === 'primary' && `
    background-color: var(--primary);
    color: var(--primary-foreground);

    &:hover {
      background-color: var(--primary-hover);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: var(--secondary);
    color: var(--secondary-foreground);

    &:hover {
      background-color: var(--secondary-hover);
    }
  `}

  ${props => props.size === 'small' && `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}

  ${props => props.size === 'medium' && `
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `}

  ${props => props.size === 'large' && `
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `}
`

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <StyledButton
      className={className}
      variant={variant}
      size={size}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button }