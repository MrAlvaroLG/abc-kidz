'use client';

import { 
    PuzzlePieceIcon, 
    PaintBrushIcon,
    BookOpenIcon,
    MusicalNoteIcon,
    HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid';
import Image from 'next/image';

export function HomeHeroVisual() {
    return (
        <div className="relative">
            {/* Puzzle Container */}
            <div className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl mx-auto px-4 md:px-0">
                {/* Puzzle piece background with gradient */}
                <div className="relative animate-float">
                    <PuzzlePieceIcon 
                        className="w-full h-auto text-accent drop-shadow-2xl"
                        style={{
                            filter: 'drop-shadow(0 25px 50px rgba(0, 29, 61, 0.2))',
                        }}
                    />
                    
                    {/* Image overlay positioned on top of puzzle */}
                    <div className="absolute inset-0 flex items-center justify-center p-16 sm:p-20 md:p-24 lg:p-26 animate-float">
                        <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/hero.jpeg" 
                                alt="ABC Kidz Preschool Daycare"
                                fill
                                className="object-cover"
                                priority
                                quality={75}
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                            />
                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Floating Elements - Hidden on mobile, visible on tablet+ */}
                <FloatingElement 
                    Icon={PaintBrushIcon}
                    className="hidden md:flex absolute top-10 -left-4 lg:-left-6 animate-float delay-100"
                />
                <FloatingElement 
                    Icon={BookOpenIcon}
                    className="hidden md:flex absolute top-1/3 -right-6 lg:-right-8 animate-float delay-300"
                />
                <FloatingElement 
                    Icon={MusicalNoteIcon}
                    className="hidden md:flex absolute bottom-20 -left-6 lg:-left-8 animate-float delay-500"
                />
                <FloatingElement 
                    Icon={HeartIconSolid}
                    className="hidden md:flex absolute bottom-10 -right-4 lg:-right-5 animate-float delay-700"
                />
                
                {/* Simplified mobile floating elements */}
                <FloatingElement 
                    Icon={PaintBrushIcon}
                    className="flex md:hidden absolute -top-2 left-5 animate-float delay-100 scale-90"
                />
                <FloatingElement 
                    Icon={BookOpenIcon}
                    className="flex md:hidden absolute top-5 -right-2 animate-float delay-300 scale-90"
                />
                <FloatingElement 
                    Icon={MusicalNoteIcon}
                    className="flex md:hidden absolute -bottom-2 -right-2 animate-float delay-500 scale-90"
                />
                <FloatingElement 
                    Icon={HeartIconSolid}
                    className="flex md:hidden absolute bottom-6 left-2 animate-float delay-700 scale-90"
                />
            </div>

            {/* Decorative circles - Hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute inset-0 border-4 border-accent/20 rounded-full animate-ping-slow" />
                <div className="absolute inset-8 border-2 border-blue-800/10 rounded-full animate-ping-slow delay-500" />
            </div>
        </div>
    );
}

// Floating Element Component
function FloatingElement({ 
    Icon, 
    className 
}: { 
    Icon: React.ComponentType<{ className?: string }>, 
    className: string 
}) {
    return (
        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-surface/90 backdrop-blur-md rounded-xl md:rounded-2xl items-center justify-center shadow-lg md:shadow-xl border border-navy-900/5 hover:scale-110 active:scale-95 transition-all duration-300 ${className}`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-accent" />
        </div>
    );
}
