import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            default: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
            outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent',
            ghost: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 bg-transparent',
        };

        const sizes = {
            default: 'px-4 py-2 text-sm rounded-lg',
            lg: 'px-8 py-4 text-lg rounded-xl',
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
