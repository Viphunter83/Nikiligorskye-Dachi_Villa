'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Image from 'next/image';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    highlight?: boolean;
    image?: string;
}

export const GlassCard = ({
    children,
    className = "",
    highlight = false,
    image
}: GlassCardProps) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 group
            ${highlight
                ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                : 'bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60 shadow-lg'
            } ${className}`}
    >
        {/* Background Image */}
        {image && (
            <>
                <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </>
        )}

        <div className="relative z-10 h-full">
            {children}
        </div>
    </motion.div>
);
