import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-[var(--border)] mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-[var(--neon-purple)]" />
            <h3
              className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-blue)] to-[var(--neon-cyan)]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: '800' }}
            >
              EDUNOVA
            </h3>
            <Sparkles className="h-8 w-8 text-[var(--neon-cyan)]" />
          </div>
          <p
            className="text-[var(--muted-foreground)] max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Revolutionizing college discovery with AI-powered RAG technology.
            Find your perfect institution with intelligent, context-aware search.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div>
            <h4
              className="text-lg mb-4 text-[var(--foreground)]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}
            >
              Technology
            </h4>
            <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-purple)] transition-colors cursor-pointer">
                RAG Pipeline
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-purple)] transition-colors cursor-pointer">
                Vector Database
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-purple)] transition-colors cursor-pointer">
                Ollama LLM
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-purple)] transition-colors cursor-pointer">
                Semantic Search
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4 text-[var(--foreground)]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}
            >
              Features
            </h4>
            <ul className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-cyan)] transition-colors cursor-pointer">
                College Search
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-cyan)] transition-colors cursor-pointer">
                AI Chatbot
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-cyan)] transition-colors cursor-pointer">
                Course Details
              </li>
              <li className="text-[var(--muted-foreground)] hover:text-[var(--neon-cyan)] transition-colors cursor-pointer">
                Placement Info
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4 text-[var(--foreground)]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}
            >
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { Icon: Github, color: 'var(--neon-purple)' },
                { Icon: Twitter, color: 'var(--neon-blue)' },
                { Icon: Linkedin, color: 'var(--neon-cyan)' },
                { Icon: Mail, color: 'var(--neon-pink)' }
              ].map(({ Icon, color }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] transition-all"
                  style={{
                    background: 'rgba(15, 15, 45, 0.4)',
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-[var(--border)] text-center"
        >
          <p
            className="text-[var(--muted-foreground)] text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            &copy; {new Date().getFullYear()} EduNova. Powered by Advanced AI Technology.
          </p>
          <p
            className="text-[var(--muted-foreground)] text-xs mt-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Built with React, Django, and RAG Technology
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
