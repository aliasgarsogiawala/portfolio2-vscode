import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Download, Terminal, X, ChevronDown, ChevronUp, ExternalLink, Code } from 'lucide-react';
import styles from '@/styles/TechStackPage.module.css';

interface Technology {
  name: string;
  icon: string;
  description: string;
  codeSnippet?: string;
  projectLink?: string;
  version?: string;
  category?: string;
}

interface TechCategory {
  title: string;
  icon: string;
  technologies: Technology[];
}

// Animated Counter Component
const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  label 
}: { 
  end: number; 
  duration?: number; 
  label: string; 
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(end * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className={styles.statItem}>
      <motion.span 
        className={styles.statNumber}
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}
      </motion.span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

// Terminal Component
const TechStackTerminal = ({ 
  isOpen, 
  onClose, 
  techCategories 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  techCategories: TechCategory[];
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to TechStack Terminal v1.0.0',
    '$ Type "help" for available commands',
  ]);

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
- stack --category [frontend|backend|cloud|auth|data|ui|others|deployment]
- random
- aliasgar  
- clear
- download`;
        break;
      case 'clear':
        setOutput(['$ Welcome to TechStack Terminal v1.0.0']);
        return;
      case 'random':
        const allTechs = techCategories.flatMap(cat => cat.technologies);
        const randomTech = allTechs[Math.floor(Math.random() * allTechs.length)];
        response = `🎲 Random tech: ${randomTech.name} - ${randomTech.description}`;
        break;
      case 'aliasgar':
        response = `👋 Hi! I'm Aliasgar, a full-stack developer passionate about modern web technologies.
🌐 Portfolio: https://aliasgar.xyz
📧 Let's connect and build something amazing together!`;
        break;
      case 'download':
        response = '📁 Downloading techstack.json...';
        downloadTechStack();
        break;
      default:
        if (cmd.startsWith('stack --category ')) {
          const category = cmd.replace('stack --category ', '');
          const foundCategory = techCategories.find(cat => 
            cat.title.toLowerCase().includes(category)
          );
          if (foundCategory) {
            response = `📚 ${foundCategory.title} Technologies:
${foundCategory.technologies.map(tech => `  - ${tech.name}`).join('\n')}`;
          } else {
            response = `❌ Category "${category}" not found. Available: frontend, backend, cloud, auth, data, ui, others, deployment`;
          }
        } else {
          response = `❌ Command not found: ${command}. Type "help" for available commands.`;
        }
    }

    setOutput(prev => [...prev, `$ ${command}`, response]);
  };

  const downloadTechStack = () => {
    const techData = {
      categories: techCategories,
      totalTechnologies: techCategories.reduce((sum, cat) => sum + cat.technologies.length, 0),
      lastUpdated: new Date().toISOString(),
      author: "Aliasgar Sogiawala"
    };
    
    const blob = new Blob([JSON.stringify(techData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'techstack.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={styles.terminal}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.terminalTitle}>
              <Terminal size={16} />
              <span>TechStack Terminal</span>
            </div>
            <button onClick={onClose} className={styles.terminalClose}>
              <X size={16} />
            </button>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalOutput}>
              {output.map((line, index) => (
                <div key={index} className={styles.terminalLine}>
                  {line}
                </div>
              ))}
            </div>
            <div className={styles.terminalInput}>
              <span className={styles.terminalPrompt}>$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCommand(input);
                    setInput('');
                  }
                }}
                placeholder="Type a command..."
                className={styles.terminalInputField}
                autoFocus
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TechStackPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const techCategories: TechCategory[] = [
    {
      title: 'Frontend',
      icon: '🎨',
      technologies: [
        { 
          name: 'Next.js', 
          icon: '/logos/nextjs_icon.svg', 
          description: 'Production-ready React framework with SSR, SSG, and full-stack capabilities.',
          codeSnippet: `// Next.js App Router
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 13+</h1>
    </div>
  );
}`,
          projectLink: 'https://aliasgar.xyz',
          version: '14.0+',
          category: 'frontend'
        },
        { 
          name: 'React', 
          icon: '/logos/react_icon.svg', 
          description: 'Modern component-based library for building interactive user interfaces.',
          codeSnippet: `// React Hook Example
const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
);`,
          version: '18.0+',
          category: 'frontend'
        },
        { 
          name: 'TypeScript', 
          icon: '/logos/typescript_icon.svg', 
          description: 'Statically typed superset of JavaScript for better code quality.',
          codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`,
          version: '5.0+',
          category: 'frontend'
        },
        { name: 'Vite', icon: '/logos/vite_icon.svg', description: 'Fast build tool and development server for modern web projects.', version: '4.0+', category: 'frontend' },
        { name: 'JavaScript', icon: '/logos/js_icon.svg', description: 'Core programming language for web development with ES6+ features.', version: 'ES2023', category: 'frontend' },
        { name: 'Astro', icon: '/logos/astro_icon.svg', description: 'Modern static site generator for content-focused websites.', version: '4.0+', category: 'frontend' },
        { name: 'HTML5', icon: '/logos/html_icon.svg', description: 'Semantic markup language with focus on accessibility and modern standards.', category: 'frontend' },
        { name: 'CSS3', icon: '/logos/css_icon.svg', description: 'Advanced styling with animations, flexbox, grid, and responsive design.', category: 'frontend' },
        { name: 'Tailwind CSS', icon: '/logos/tailwind_icon.svg', description: 'Utility-first CSS framework for rapid UI development.', version: '3.0+', category: 'frontend' },
        { name: 'React Native', icon: '/logos/react_icon.svg', description: 'Cross-platform mobile app development using React.', version: '0.72+', category: 'frontend' },
        { name: 'React Router', icon: '/logos/react_icon.svg', description: 'Declarative routing for React applications.', version: '6.0+', category: 'frontend' },
        { name: 'Bootstrap', icon: '/logos/bootstrap_icon.svg', description: 'Popular CSS framework for responsive web design.', version: '5.0+', category: 'frontend' },
        { name: 'WordPress', icon: '/logos/wordpress_icon.svg', description: 'Content management system and website builder.', version: '6.0+', category: 'frontend' },
      ]
    },
    {
      title: 'Backend & Databases',
      icon: '⚙️',
      technologies: [
        { 
          name: 'Node.js', 
          icon: '/logos/nodejs_icon.svg', 
          description: 'JavaScript runtime for scalable server-side applications.',
          codeSnippet: `// Express.js API Route
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
          version: '20.0+',
          category: 'backend'
        },
        { 
          name: 'Python', 
          icon: '/logos/python_icon.svg', 
          description: 'Versatile programming language for web development and automation.',
          codeSnippet: `# FastAPI Example
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}`,
          version: '3.11+',
          category: 'backend'
        },
        { name: 'Java', icon: '/logos/java_icon.svg', description: 'Enterprise-grade programming language for robust applications.', version: '17+', category: 'backend' },
        { name: 'Django', icon: '/logos/django_icon.svg', description: 'High-level Python web framework for rapid development.', version: '4.0+', category: 'backend' },
        { name: 'Flask', icon: '/logos/flask_icon.svg', description: 'Lightweight Python web framework for microservices.', version: '2.0+', category: 'backend' },
        { name: 'Prisma', icon: '/logos/prisma_icon.svg', description: 'Next-generation ORM for Node.js and TypeScript.', version: '5.0+', category: 'backend' },
        { name: 'ConvexDB', icon: '/logos/convex_icon.svg', description: 'Real-time backend-as-a-service platform.', category: 'backend' },
        { name: 'MongoDB', icon: '/logos/mongodb_icon.svg', description: 'NoSQL database for flexible, scalable data storage.', version: '7.0+', category: 'backend' },
        { name: 'MySQL', icon: '/logos/mysql_icon.svg', description: 'Relational database management system.', version: '8.0+', category: 'backend' },
        { name: 'SQLite', icon: '/logos/sqlite_icon.svg', description: 'Lightweight, embedded SQL database engine.', version: '3.40+', category: 'backend' },
        { name: 'Supabase', icon: '/logos/supabase_icon.svg', description: 'Open-source Firebase alternative with PostgreSQL.', category: 'backend' },
        { name: 'Firebase', icon: '/logos/firebase_icon.svg', description: 'Google\'s mobile and web application development platform.', version: '9.0+', category: 'backend' },
        { name: 'Amazon DynamoDB', icon: '/logos/dynamodb_icon.svg', description: 'Fast, flexible NoSQL database service.', category: 'backend' },
        { name: 'SQL', icon: '/logos/sql_icon.svg', description: 'Structured Query Language for database management.', category: 'backend' },
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁️',
      technologies: [
        { 
          name: 'AWS', 
          icon: '/logos/aws_icon.svg', 
          description: 'Amazon Web Services cloud computing platform.',
          codeSnippet: `// AWS SDK Example
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });

const uploadFile = async (file: File) => {
  const command = new PutObjectCommand({
    Bucket: "my-bucket",
    Key: file.name,
    Body: file,
  });
  
  return await s3Client.send(command);
};`,
          category: 'cloud'
        },
      ]
    },
    {
      title: 'Auth & Security',
      icon: '🔐',
      technologies: [
        { 
          name: 'Clerk', 
          icon: '/logos/clerk_icon.svg', 
          description: 'Complete authentication and user management solution.',
          codeSnippet: `// Clerk Authentication
import { useUser } from '@clerk/nextjs';

export default function Profile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return <h1>Hello {user?.firstName}!</h1>;
}`,
          category: 'auth'
        },
        { name: 'Auth.js', icon: '/logos/authjs_icon.svg', description: 'Simple, flexible authentication for web applications.', category: 'auth' },
        { name: 'SuperTokens', icon: '/logos/supertokens_icon.svg', description: 'Open-source authentication with session management.', category: 'auth' },
      ]
    },
    {
      title: 'Data & Visualization',
      icon: '📊',
      technologies: [
        { 
          name: 'Pandas', 
          icon: '/logos/pandas_icon.svg', 
          description: 'Powerful data manipulation and analysis library for Python.',
          codeSnippet: `# Pandas Data Analysis
import pandas as pd

# Read CSV file
df = pd.read_csv('data.csv')

# Data manipulation
result = df.groupby('category').agg({
    'sales': 'sum',
    'profit': 'mean'
}).round(2)

print(result)`,
          version: '2.0+',
          category: 'data'
        },
        { name: 'NumPy', icon: '/logos/numpy_icon.svg', description: 'Fundamental package for scientific computing with Python.', version: '1.24+', category: 'data' },
        { name: 'Matplotlib', icon: '/logos/matplotlib_icon.svg', description: 'Comprehensive library for creating static and interactive visualizations.', version: '3.7+', category: 'data' },
        { name: 'R Studio', icon: '/logos/rstudio_icon.svg', description: 'Integrated development environment for R programming.', category: 'data' },
        { name: 'Beautiful Soup', icon: '/logos/beautifulsoup_icon.svg', description: 'Python library for parsing HTML and XML documents.', version: '4.12+', category: 'data' },
        { name: 'PyTorch', icon: '/logos/pytorch_icon.svg', description: 'Machine learning framework for deep learning applications.', version: '2.0+', category: 'data' },
      ]
    },
    {
      title: 'UI/UX & Design',
      icon: '🎨',
      technologies: [
        { name: 'Figma', icon: '/logos/figma_icon.svg', description: 'Collaborative interface design and prototyping tool.', category: 'ui' },
        { name: 'Adobe', icon: '/logos/adobe_icon.svg', description: 'Creative software suite for design and multimedia.', category: 'ui' },
        { name: 'Illustrator', icon: '/logos/illustrator_icon.svg', description: 'Vector graphics editor and design program.', category: 'ui' },
        { name: 'Shadcn', icon: '/logos/shadcn_icon.svg', description: 'Modern UI component library for React applications.', category: 'ui' },
        { 
          name: 'Framer Motion', 
          icon: '/logos/framer_icon.svg', 
          description: 'Production-ready motion library for React.',
          codeSnippet: `// Framer Motion Animation
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1>Animated Content</h1>
</motion.div>`,
          version: '10.0+',
          category: 'ui'
        },
        { name: 'Canva', icon: '/logos/canva_icon.svg', description: 'Online graphic design platform for visual content.', category: 'ui' },
      ]
    },
    {
      title: 'Others',
      icon: '🔧',
      technologies: [
        { name: 'Raspberry Pi', icon: '/logos/raspberry_icon.svg', description: 'Single-board computer for IoT and embedded projects.', category: 'others' },
        { 
          name: 'Git', 
          icon: '/logos/git_icon.svg', 
          description: 'Distributed version control system for source code management.',
          codeSnippet: `# Git Commands
git add .
git commit -m "feat: add new feature"
git push origin main

# Create and switch to new branch
git checkout -b feature/new-feature`,
          version: '2.40+',
          category: 'others'
        },
        { name: 'GitHub', icon: '/logos/github_icon.svg', description: 'Code hosting platform for version control and collaboration.', projectLink: 'https://github.com/aliasgarsogiawala', category: 'others' },
        { name: 'ESLint', icon: '/logos/eslint_icon.svg', description: 'Static analysis tool for identifying JavaScript code issues.', version: '8.0+', category: 'others' },
      ]
    },
    {
      title: 'Deployment',
      icon: '🚀',
      technologies: [
        { 
          name: 'Vercel', 
          icon: '/logos/vercel.svg', 
          description: 'Modern deployment platform for frontend applications.',
          projectLink: 'https://aliasgar.xyz',
          category: 'deployment'
        },
        { name: 'Hostinger', icon: '/logos/hostinger_icon.svg', description: 'Web hosting service with domain and email solutions.', category: 'deployment' },
      ]
    }
  ];

  const getCurrentCategoryData = () => {
    return techCategories.find(cat => {
      let categoryId = cat.title.toLowerCase();
      if (categoryId.includes('backend')) categoryId = 'backend&databases';
      if (categoryId.includes('cloud')) categoryId = 'cloud&devops';  
      if (categoryId.includes('auth')) categoryId = 'auth&security';
      if (categoryId.includes('data')) categoryId = 'data&visualization';
      if (categoryId.includes('ui')) categoryId = 'ui/ux&design';
      categoryId = categoryId.replace(/\s+/g, '').replace(/&/g, '&');
      return categoryId === selectedCategory;
    });
  };

  const getStats = () => {
    const currentData = getCurrentCategoryData();
    if (!currentData) return { total: 0 };
    
    const total = currentData.technologies.length;
    
    return { total };
  };

  const downloadTechStack = () => {
    const techData = {
      categories: techCategories,
      totalTechnologies: techCategories.reduce((sum, cat) => sum + cat.technologies.length, 0),
      lastUpdated: new Date().toISOString(),
      author: "Aliasgar Sogiawala"
    };
    
    const blob = new Blob([JSON.stringify(techData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'techstack.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = getStats();

  return (
    <div className={styles.layout}>
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.heroSection}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Tech Stack</h1>
          <p className={styles.subtitle}>
            A comprehensive showcase of the technologies, frameworks, and tools that power my development workflow. 
            From frontend to backend, I leverage modern tech to build exceptional digital experiences.
          </p>
          
          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadTechStack}
            className={styles.downloadButton}
          >
            <Download size={18} />
            Download Tech Stack JSON
          </motion.button>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <div className={styles.categoryNavigation}>
        <h2 className={styles.navigationTitle}>Explore Technologies</h2>
        <div className={styles.categoryButtons}>
          {techCategories.map((category, index) => {
            let categoryId = category.title.toLowerCase();
            if (categoryId.includes('backend')) categoryId = 'backend&databases';
            if (categoryId.includes('cloud')) categoryId = 'cloud&devops';  
            if (categoryId.includes('auth')) categoryId = 'auth&security';
            if (categoryId.includes('data')) categoryId = 'data&visualization';
            if (categoryId.includes('ui')) categoryId = 'ui/ux&design';
            categoryId = categoryId.replace(/\s+/g, '').replace(/&/g, '&');
            
            const isActive = selectedCategory === categoryId;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${styles.categoryButton} ${isActive ? styles.active : ''}`}
                onClick={() => setSelectedCategory(categoryId)}
              >
                <span className={styles.categoryEmoji}>{category.icon}</span>
                <span className={styles.categoryName}>{category.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Animated Stats */}
      <div className={styles.categoryStats}>
        <AnimatedCounter 
          end={stats.total} 
          label="Technologies" 
        />
        <AnimatedCounter 
          end={techCategories.length} 
          label="Categories" 
        />
        <AnimatedCounter 
          end={techCategories.reduce((sum, cat) => sum + cat.technologies.length, 0)} 
          label="Total Stack" 
        />
      </div>

      {/* Tech Grid with Animations */}
      <motion.div className={styles.techGrid}>
        <AnimatePresence mode="wait">
          {getCurrentCategoryData()?.technologies.map((tech, index) => (
            <motion.div
              key={`${selectedCategory}-${index}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              className={styles.techCard}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <div className={styles.cardHeader}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className={styles.techIcon}
                  />
                </motion.div>
                <div className={styles.techInfo}>
                  <h3 className={styles.techName}>{tech.name}</h3>
                  {tech.version && (
                    <span className={styles.techVersion}>{tech.version}</span>
                  )}
                </div>
                <div className={styles.cardActions}>
                  {tech.projectLink && (
                    <motion.a
                      href={tech.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={styles.actionButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={styles.expandButton}
                  >
                    {expandedCard === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </motion.button>
                </div>
              </div>
              
              <p className={styles.techDescription}>{tech.description}</p>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.expandedContent}
                  >
                    {tech.codeSnippet && (
                      <div className={styles.codeSection}>
                        <div className={styles.codeHeader}>
                          <Code size={16} />
                          <span>Code Example</span>
                        </div>
                        <div className={styles.codeWrapper}>
                          <SyntaxHighlighter
                            language={tech.category === 'frontend' || tech.category === 'ui' ? 'jsx' : 'python'}
                            style={vscDarkPlus}
                            customStyle={{
                              background: 'var(--background-color)',
                              fontSize: '0.85rem',
                              borderRadius: '8px',
                              padding: '1rem',
                            }}
                          >
                            {tech.codeSnippet}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    
                    {tech.version && (
                      <div className={styles.techDetails}>
                        <strong>Version:</strong> {tech.version}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Terminal Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTerminalOpen(!terminalOpen)}
        className={styles.terminalToggle}
      >
        <Terminal size={20} />
        {terminalOpen ? 'Close Terminal' : 'Open Terminal'}
      </motion.button>

      {/* Terminal Component */}
      <TechStackTerminal 
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        techCategories={techCategories}
      />
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Tech Stack' },
  };
}

export default TechStackPage;
