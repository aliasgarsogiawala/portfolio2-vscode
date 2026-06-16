import { NextApiRequest, NextApiResponse } from 'next';

// Knowledge base sourced from data/profile.ts and data/projects.ts
const aliasgarInfo = {
  name: "Aliasgar Sogiawala",
  firstName: "Aliasgar",
  role: "Full Stack Developer",
  roleShort: "Software Engineer",
  location: "Mumbai, India",
  bio: "Building modern web experiences and AI / ML solutions",
  bioLong: [
    "Hey! I'm a software engineer from Mumbai, India. I primarily work with JavaScript / TypeScript and the React ecosystem.",
    "I'm focused on frontend development with React, but you'll also find me working with Node.js, MongoDB and Express while building the backend for my personal projects.",
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "MongoDB", "Express", "Tailwind CSS", "Git", "Vercel"
  ],
  experience: [
    {
      company: "Tech Horizons Club",
      role: "Co-Founder",
      period: "Nov 2024 – Present",
      description: [
        "Co-founded a student-led tech community for enthusiasts to learn, build, and grow together.",
        "Drives startup, leadership, and community initiatives while leading web development for the club.",
      ],
    },
    {
      company: "Zillionite",
      role: "Full-stack Developer (Internship)",
      period: "Feb 2025 – Jan 2026",
      description: [
        "Built the complete Zillionite website from scratch using Next.js, Tailwind CSS, and Node.js.",
        "Integrated online payments with Razorpay.",
      ],
    },
    {
      company: "OVERTURES InfoTech",
      role: "Information Technology Intern",
      period: "Jan 2023 – Jul 2023",
      description: [
        "Worked on website development, debugging, and SEO.",
      ],
    },
  ],
  projects: [
    {
      name: "TourSafe",
      description: "A website for tourists to avoid getting scammed including features like emergency SOS, cab fare estimation, chatroom, etc.",
      technologies: ["Next.js", "TypeScript", "Neon", "Tailwind CSS", "Clerk", "Vercel"],
      liveLink: "https://toursafe.in",
      github: "https://github.com/aliasgarsogiawala/toursafe"
    },
    {
      name: "Zillionite",
      description: "A comprehensive wealth creation and management platform designed to guide users on their journey to financial prosperity.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Razorpay"],
      liveLink: "https://zillionite.com",
      github: "https://github.com/aliasgarsogiawala/zillionite"
    },
    {
      name: "ParaDoc",
      description: "A Parallel Reality Simulation for Medical Decision-Making. Hackathon winning project.",
      technologies: ["Next.js", "JavaScript", "Clerk", "Gemini API", "Tailwind CSS"],
      liveLink: "https://paradocc.vercel.app",
      github: "https://github.com/aliasgarsogiawala/paradoc"
    },
    {
      name: "Portfolio 1.0",
      description: "A previous version of my portfolio for non-tech people to view my work.",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Nodemailer"],
      liveLink: "https://aliasgar.vercel.app",
      github: "https://github.com/aliasgarsogiawala/portfolio1"
    },
    {
      name: "Tech Horizons Club",
      description: "Co-Founder and Web Dev of THC. A club for all tech enthusiasts to learn and grow together.",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Nodemailer"],
      liveLink: "https://techhorizonsclub.com"
    },
    {
      name: "GitHub Punchcard",
      description: "Visualize the hours and days you commit the most. Plug it into your readme.",
      technologies: ["Vercel Edge API", "Next.js", "Tailwind CSS", "GitHub API"],
      liveLink: "https://punchcardwidget.vercel.app",
      github: "https://github.com/aliasgarsogiawala/punchcard-widget"
    },
    {
      name: "Purchase Order Generator",
      description: "A Purchase Order Generator using JavaScript, React.js making use of JsPDF for document generation.",
      technologies: ["React.js", "JavaScript", "CSS", "jsPDF"],
      liveLink: "https://purchase-order-gen.vercel.app",
      github: "https://github.com/aliasgarsogiawala/purchase-order"
    },
    {
      name: "GitHub Last 3 Commits",
      description: "Fetch your or anyone's last 3 public repo commits and embed it in your README.md.",
      technologies: ["Vercel API", "Next.js", "Tailwind CSS", "GitHub API"],
      liveLink: "https://last-3-commits.vercel.app",
      github: "https://github.com/aliasgarsogiawala/last-3-commits"
    },
    {
      name: "Mini Python Projects",
      description: "Python mini projects and mini games including web scraping utilities and automation scripts.",
      technologies: ["Python", "Flask", "BeautifulSoup", "Web Scraping"],
      github: "https://github.com/aliasgarsogiawala/Codes"
    },
  ],
  contact: {
    email: "aliasgarsogiawala@gmail.com",
    github: "https://github.com/aliasgarsogiawala",
    linkedin: "https://www.linkedin.com/in/aliasgar-sogiawala/",
    twitter: "https://www.twitter.com/aliasgarsogiawala",
    instagram: "https://www.instagram.com/aliasgarsogiawala",
  },
  interests: "Aside from programming and writing, I like to read a good dystopian novel, listen to calm piano music or just laze around.",
  siteUrl: "https://aliasgar-vscode.vercel.app",
};

// Simple keyword-based response system
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm an AI assistant for ${aliasgarInfo.name}'s portfolio. I can tell you about his skills, projects, work experience, and more. What would you like to know?`;
  }

  // Skills / Tech stack
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('stack')) {
    return `${aliasgarInfo.name} is skilled in: ${aliasgarInfo.skills.join(', ')}. He specialises in full-stack development with a strong focus on the React / Next.js ecosystem.`;
  }

  // Experience / Work / Job / Career
  if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('work') || lowerMessage.includes('intern')) {
    const expList = aliasgarInfo.experience
      .map(exp => `• **${exp.role}** at **${exp.company}** (${exp.period})`)
      .join('\n');
    return `Here's ${aliasgarInfo.firstName}'s experience:\n\n${expList}\n\nVisit the About page for the full timeline!`;
  }

  // Projects
  if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('portfolio work')) {
    const featured = aliasgarInfo.projects.slice(0, 4);
    const projectList = featured.map(p =>
      `• **${p.name}**: ${p.description} (${p.technologies.join(', ')})`
    ).join('\n');
    return `Here are some of ${aliasgarInfo.name}'s notable projects:\n\n${projectList}\n\nVisit the Projects page to see all ${aliasgarInfo.projects.length} projects!`;
  }

  // Contact / Email / Reach
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return `You can reach ${aliasgarInfo.name} through:\n• Email: ${aliasgarInfo.contact.email}\n• GitHub: ${aliasgarInfo.contact.github}\n• LinkedIn: ${aliasgarInfo.contact.linkedin}\n• Twitter: ${aliasgarInfo.contact.twitter}`;
  }

  // Location
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based') || lowerMessage.includes('city') || lowerMessage.includes('country')) {
    return `${aliasgarInfo.name} is based in **${aliasgarInfo.location}**.`;
  }

  // Interests / Hobbies
  if (lowerMessage.includes('interest') || lowerMessage.includes('hobby') || lowerMessage.includes('hobbies') || lowerMessage.includes('outside') || lowerMessage.includes('free time')) {
    return `${aliasgarInfo.interests}`;
  }

  // About / Who / Bio
  if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me') || lowerMessage.includes('introduce')) {
    return `${aliasgarInfo.bioLong.join(' ')}\n\nHe works as **${aliasgarInfo.role}** at **${aliasgarInfo.experience[0].company}** and is passionate about building modern web experiences and AI/ML solutions.`;
  }

  // Website / Portfolio
  if (lowerMessage.includes('website') || lowerMessage.includes('site') || lowerMessage.includes('portfolio')) {
    return `You can view ${aliasgarInfo.name}'s portfolio at ${aliasgarInfo.siteUrl}. It's built with Next.js, TypeScript, and Tailwind CSS — designed to look like VS Code!`;
  }

  // Default response
  return `I can help you learn about ${aliasgarInfo.name}! Try asking about his **skills**, **projects**, **work experience**, **contact info**, or **interests**.`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Generate response
    const response = generateResponse(message);
    
    res.status(200).json({ response });
    
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

