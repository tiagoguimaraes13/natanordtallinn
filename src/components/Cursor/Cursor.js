import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Cursor.css';

export const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);
    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    const handleCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
      const isClickable = hoveredElement?.matches('button, a, input, select, textarea, [role="button"]') || 
                         hoveredElement?.closest('button, a, input, select, textarea, [role="button"]');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseenter', mouseEnter);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mousemove', handleCursorType);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseenter', mouseEnter);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mousemove', handleCursorType);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className={`cursor-dot ${isClicking ? 'clicking' : ''} ${isPointer ? 'pointer' : ''}`}
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5
            }}
          />
          <motion.div
            className={`cursor-ring ${isClicking ? 'clicking' : ''} ${isPointer ? 'pointer' : ''}`}
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isClicking ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default Cursor;