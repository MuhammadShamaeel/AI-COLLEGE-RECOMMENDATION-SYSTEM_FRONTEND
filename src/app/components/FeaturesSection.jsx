import { motion } from 'motion/react';
import { Brain, Search, MessageSquare, Database, Zap, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'RAG Technology',
      description: 'Retrieval-Augmented Generation for accurate, context-aware responses from college brochures',
      color: 'var(--neon-purple)'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Semantic search powered by vector embeddings for precise college recommendations',
      color: 'var(--neon-blue)'
    },
    {
      icon: MessageSquare,
      title: 'AI Chatbot',
      description: '24/7 intelligent assistant powered by Ollama LLM for instant answers',
      color: 'var(--neon-cyan)'
    },
    {
      icon: Database,
      title: 'Vector Database',
      description: 'FAISS/ChromaDB powered semantic storage for lightning-fast information retrieval',
      color: 'var(--neon-pink)'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Instant college details, fees, placements, and admission information',
      color: 'var(--neon-purple)'
    },
    {
      icon: Shield,
      title: 'Verified Data',
      description: 'Information extracted directly from official college brochures and documents',
      color: 'var(--neon-blue)'
    }
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--neon-blue)] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[var(--neon-purple)] rounded-full blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl mb-4 text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: '700' }}
          >
            Powered by Advanced AI
          </h2>
          <p
            className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Experience the future of college discovery with cutting-edge technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
              className="group relative backdrop-blur-xl rounded-2xl p-8 border border-[var(--border)]"
              style={{
                background: 'rgba(15, 15, 45, 0.4)',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                    boxShadow: `0 0 30px ${feature.color}40`
                  }}
                >
                  <feature.icon className="h-8 w-8" style={{ color: feature.color }} />
                </div>

                <h3
                  className="text-2xl mb-3 text-[var(--foreground)] group-hover:text-[var(--neon-cyan)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: '600' }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-[var(--muted-foreground)] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
