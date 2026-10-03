'use client';

import * as React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// 1. Top reading / scroll progress bar
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}

// 2. Fade In with transform-only compositor
export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.45,
}: AnimatedProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '60px 0px 0px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple / Linear silky ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Slide Up Entrance
export function SlideUp({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}: AnimatedProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '60px 0px 0px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Staggered Container for Grids
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Staggered Item
export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Interactive Card Wrapper with Subtle 60fps Micro-interactions
export function MotionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      whileTap={{ scale: 0.985 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
