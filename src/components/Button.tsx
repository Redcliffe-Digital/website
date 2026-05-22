import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'inverse'

const base =
  'inline-flex items-center justify-center gap-2 border-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-150 hover:border'

const variants: Record<Variant, string> = {
  // Filled oxblood — the leading call to action.
  primary: 'border-oxblood bg-oxblood text-white hover:border-oxblood-dark hover:bg-oxblood-dark',
  // Bordered ink — quieter, secondary action.
  secondary: 'border-ink bg-transparent text-ink hover:bg-ink/[0.04]',
  // For use on the dark ink CTA band.
  inverse: 'border-white bg-transparent text-white hover:bg-white hover:text-ink',
}

interface BaseProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonAsLink = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    'href' | 'className'
  >
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    ComponentProps<'button'>,
    'className'
  >

type ButtonProps = ButtonAsLink | ButtonAsButton

/**
 * Rectangular CTA. 2px border that thins to 1px on hover (box-border keeps the
 * outer size constant). Renders a next/link for internal routes, a plain anchor
 * for mailto/external, or a <button> when no href is given.
 */
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props
    const isExternal = /^(https?:|mailto:|tel:)/.test(href)
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(rest as ComponentProps<'a'>)}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ComponentProps<'button'>)}>
      {children}
    </button>
  )
}
