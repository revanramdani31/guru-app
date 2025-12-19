import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'lg' | 'sm';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            default: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5',
            outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent',
            ghost: 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 bg-transparent',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs rounded-lg',
            default: 'px-5 py-2.5 text-sm rounded-xl',
            lg: 'px-8 py-4 text-lg rounded-2xl',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
