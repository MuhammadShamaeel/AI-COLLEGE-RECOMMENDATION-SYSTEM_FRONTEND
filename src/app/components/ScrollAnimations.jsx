import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ScrollAnimations() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      const parallaxFastElements = document.querySelectorAll('.parallax-fast');

      parallaxElements.forEach((el) => {
        const element = el;
        element.style.transform = `translateY(${scrolled * 0.3}px)`;
      });

      parallaxFastElements.forEach((el) => {
        const element = el;
        element.style.transform = `translateY(${scrolled * 0.6}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] origin-left z-[100]"
        style={{
          scaleX: scrollYProgress,
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
        }}
      />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div
          className="parallax-slow absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)'
          }}
        />
        <div
          className="parallax-fast absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)'
          }}
        />
        <div
          className="parallax-slow absolute top-96 left-1/3 w-36 h-36 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)'
          }}
        />
      </div>

      <style>{`
        .parallax-slow,
        .parallax-fast {
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </>
  );
}
