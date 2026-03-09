import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    noPadding?: boolean;
    container?: boolean; // If true, wraps children in a container
    id?: string;
    className?: string; // Class for the section tag
    containerClassName?: string; // Class for the container div
}

export const Section = forwardRef<HTMLElement, SectionProps>(({ 
    children, 
    noPadding = false, 
    container = true,
    className,
    containerClassName,
    ...props 
}, ref) => {
    return (
        <section 
            ref={ref}
            className={cn(
                // Vertical rhythm: mobile vs desktop
                !noPadding && "py-[var(--spacing-section)] lg:py-[var(--spacing-section-lg)]",
                className
            )}
            {...props}
        >
            {container ? (
                <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
});

Section.displayName = "Section";
