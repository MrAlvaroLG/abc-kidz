import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: ReactNode;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  variant?: 'home' | 'page';
  children?: ReactNode; // For CTAs or additional content
  className?: string;
  rightContent?: ReactNode; // For images/graphics on the right side
  topContent?: ReactNode; // For badges or tags above the title
  bottomContent?: ReactNode; // For scroll indicators or absolute positioned elements at bottom
}

export function Hero({ 
  title, 
  subtitle, 
  description, 
  align = 'left', 
  variant = 'page',
  children,
  className,
  rightContent,
  topContent,
  bottomContent
}: HeroProps) {
  return (
    <section className={cn(
      "relative overflow-hidden py-20 lg:py-28 min-h-[60vh] flex items-center",
      variant === 'home' 
        ? "bg-linear-to-br from-bg via-surface to-bg" 
        : "bg-linear-to-br from-navy-900 via-blue-900 to-navy-900",
      className
    )}>
      {/* Shared Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {variant === 'home' ? (
             <>
                <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl animate-pulse delay-700" />
             </>
         ) : (
             <>
                 <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
                </div>
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
             </>
         )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
            "grid gap-12 items-center",
            rightContent ? "lg:grid-cols-2" : "grid-cols-1"
        )}>
            {/* Text Content */}
            <div className={cn(
              "space-y-6 max-w-4xl",
              align === 'center' ? "mx-auto text-center" : "text-left"
            )}>
               {topContent && (
                   <div className={cn(
                       "flex mb-4",
                       align === 'center' ? "justify-center" : "justify-start"
                   )}>
                       {topContent}
                   </div>
               )}

               <h1 className={cn(
                 "text-4xl lg:text-7xl font-bold leading-tight",
                 variant === 'page' ? "text-white" : "text-navy-900"
               )}>
                 {title}
               </h1>
               
               {subtitle && (
                 <p className={cn(
                   "text-xl lg:text-3xl font-medium",
                   variant === 'page' ? "text-accent" : "text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-hover to-accent"
                 )}>
                   {subtitle}
                 </p>
               )}

               {description && (
                   <p className={cn(
                       "text-lg lg:text-xl leading-relaxed max-w-xl",
                       align === 'center' ? "mx-auto" : "",
                       variant === 'page' ? "text-white/80" : "text-navy-900/70"
                   )}>
                       {description}
                   </p>
               )}

               {children && <div className={cn(
                   "flex flex-wrap gap-4 pt-4",
                   align === 'center' ? "justify-center" : "justify-start"
                )}>
                   {children}
               </div>}
            </div>

            {/* Right Content (Image/Graphic) */}
            {rightContent && (
                <div className="relative">
                    {rightContent}
                </div>
            )}
        </div>
      </div>
      
      {bottomContent}
    </section>
  );
}
