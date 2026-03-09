import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// --- Card Root ---
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hoverEffect?: boolean;
    variant?: 'default' | 'glass';
}

export function Card({ 
    children, 
    className, 
    hoverEffect = false,
    variant = 'default',
    ...props 
}: CardProps) {
    return (
        <div 
            className={cn(
                "rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300",
                variant === 'default' && "bg-white border border-navy-900/5 shadow-lg",
                variant === 'glass' && "bg-white/10 backdrop-blur-sm border border-white/20",
                hoverEffect && "hover:shadow-xl hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// --- Card Header ---
export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pb-3", className)} {...props}>
            {children}
        </div>
    );
}

// --- Card Title ---
export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn("text-2xl font-bold text-navy-900", className)} {...props}>
            {children}
        </h3>
    );
}

// --- Card Description ---
export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-navy-900/60 mt-2", className)} {...props}>
            {children}
        </p>
    );
}

// --- Card Content ---
export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    );
}

// --- Card Footer ---
export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 flex items-center pt-0", className)} {...props}>
            {children}
        </div>
    );
}
