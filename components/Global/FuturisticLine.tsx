"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FuturisticDividerProps {
    color?: string;
    className?: string;
    showCircle?: boolean;
    showDots?: boolean;
    showCornerBrackets?: boolean;
    showTopBottomLines?: boolean;
    showTechDetails?: boolean;
    showScanLine?: boolean;
}

const FuturisticDivider: React.FC<FuturisticDividerProps> = ({
    color = '#4A90E2',
    className = '',
    showCircle = true,
    showDots = true,
    showCornerBrackets = true,
    showTopBottomLines = true,
    showTechDetails = true,
    showScanLine = true,
}) => {
    // Convert hex to rgba for opacity variants
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div className={`relative w-full max-w-2xl mx-auto mt-8 mb-6 h-20 ${className}`}>
            {/* Center rotating circle */}
            {showCircle && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12">
                    <motion.div
                        className="absolute inset-0 rounded-full border"
                        style={{
                            width: '48px',
                            height: '48px',
                            left: '0',
                            top: '0',
                            borderColor: hexToRgba(color, 0.3)
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            )}

            {/* Main horizontal lines with segments */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-center gap-3">
                {/* Left section */}
                <div className="flex-1 flex items-center gap-1.5">
                    <motion.div
                        className="h-[2px] flex-1"
                        style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(color, 0.6)}, ${color})`
                        }}
                        initial={{ scaleX: 0, originX: 1 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                    />
                    <motion.div
                        className="w-8 h-[1px]"
                        style={{ backgroundColor: hexToRgba(color, 0.8) }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                    />
                </div>

                {/* Center orbital dots */}
                {showDots && (
                    <div className="flex gap-1.5 px-8">
                        <motion.div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: color }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: hexToRgba(color, 0.7) }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: hexToRgba(color, 0.5) }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                        />
                    </div>
                )}

                {/* Right section */}
                <div className="flex-1 flex items-center gap-1.5 flex-row-reverse">
                    <motion.div
                        className="h-[2px] flex-1"
                        style={{
                            background: `linear-gradient(to left, transparent, ${hexToRgba(color, 0.6)}, ${color})`
                        }}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                    />
                    <motion.div
                        className="w-8 h-[1px]"
                        style={{ backgroundColor: hexToRgba(color, 0.8) }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                    />
                </div>
            </div>

            {/* Secondary parallel lines above and below */}
            {showTopBottomLines && (
                <>
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
                        style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(color, 0.2)}, transparent)`
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
                        style={{
                            background: `linear-gradient(to right, transparent, ${hexToRgba(color, 0.2)}, transparent)`
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                </>
            )}

            {/* Corner UI Elements */}
            {showCornerBrackets && (
                <>
                    <motion.div
                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-8 border-l-2 border-t-2 border-b-2"
                        style={{ borderColor: hexToRgba(color, 0.4) }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div
                            className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-[1px]"
                            style={{ backgroundColor: hexToRgba(color, 0.6) }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-8 border-r-2 border-t-2 border-b-2"
                        style={{ borderColor: hexToRgba(color, 0.4) }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div
                            className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-[1px]"
                            style={{ backgroundColor: hexToRgba(color, 0.6) }}
                        />
                    </motion.div>
                </>
            )}

            {/* Tech corner details */}
            {showTechDetails && (
                <>
                    <motion.div
                        className="absolute top-2 left-16 w-8 h-[1px]"
                        style={{ backgroundColor: hexToRgba(color, 0.3) }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 }}
                    />
                    <motion.div
                        className="absolute top-2 right-16 w-8 h-[1px]"
                        style={{ backgroundColor: hexToRgba(color, 0.3) }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 }}
                    />
                </>
            )}

            {/* Animated scan line */}
            {showScanLine && (
                <motion.div
                    className="absolute top-1/2 left-0 w-1 h-8"
                    style={{
                        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`
                    }}
                    animate={{
                        x: [0, 800, 0],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    }}
                />
            )}
        </div>
    );
};

export default FuturisticDivider;