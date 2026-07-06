import React from 'react';

/**
 * ContentCloud Button.
 * Variants: primary (ink fill), secondary (white w/ hairline border),
 * ghost (transparent), link (inline red text CTA). Sizes: sm | md | lg.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  disabled = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 14, gap: 6 },
    md: { padding: '11px 20px', fontSize: 15, gap: 8 },
    lg: { padding: '14px 26px', fontSize: 16, gap: 9 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--cc-ink)',
      color: 'var(--cc-white)',
      border: '1px solid var(--cc-ink)',
    },
    secondary: {
      background: 'var(--cc-white)',
      color: 'var(--cc-ink)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--cc-ink)',
      border: '1px solid transparent',
    },
    link: {
      background: 'transparent',
      color: 'var(--cc-red)',
      border: '1px solid transparent',
      padding: 0,
    },
    danger: {
      background: 'var(--cc-red)',
      color: 'var(--cc-white)',
      border: '1px solid var(--cc-red)',
    },
  };
  const v = variants[variant] || variants.primary;

  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: variant === 'link' ? 0 : s.padding,
    borderRadius: variant === 'link' ? 0 : 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: variant === 'link' ? 'none' : 'none',
    textUnderlineOffset: 3,
    transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    whiteSpace: 'nowrap',
    ...v,
    ...style,
  };

  const onEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary') e.currentTarget.style.background = 'var(--cc-ink-hover)';
    else if (variant === 'secondary' || variant === 'ghost') e.currentTarget.style.background = 'var(--cc-gray-100)';
    else if (variant === 'danger') e.currentTarget.style.background = 'var(--cc-red-hover)';
    else if (variant === 'link') { e.currentTarget.style.color = 'var(--cc-red-hover)'; e.currentTarget.style.textDecoration = 'underline'; }
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.color = v.color;
    e.currentTarget.style.textDecoration = 'none';
  };
  const onDown = (e) => { if (!disabled && variant !== 'link') e.currentTarget.style.transform = 'translateY(1px)'; };
  const onUp = (e) => { e.currentTarget.style.transform = 'none'; };

  const Tag = href ? 'a' : as;
  return (
    <Tag
      href={href}
      style={base}
      aria-disabled={disabled || undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft ? <span style={{ display: 'inline-flex' }}>{iconLeft}</span> : null}
      {children}
      {iconRight ? <span style={{ display: 'inline-flex' }}>{iconRight}</span> : null}
    </Tag>
  );
}
