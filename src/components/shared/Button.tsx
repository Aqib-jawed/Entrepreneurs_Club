import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-[#E8A33D] text-[#0B0E14] hover:bg-[#f0b457] font-semibold',
    secondary: 'bg-[#141822] text-[#F5F3EE] hover:bg-[#1f2430] border border-white/10',
    outline: 'bg-transparent text-[#E8A33D] border border-[#E8A33D]/60 hover:bg-[#E8A33D] hover:text-[#0B0E14] font-medium transition-all shadow-sm',
    ghost: 'bg-transparent text-[#F5F3EE] hover:bg-white/10',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  }[size];

  return (
    <button
      className={`btn btn--${variant} btn--${size} inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 outline-none ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
