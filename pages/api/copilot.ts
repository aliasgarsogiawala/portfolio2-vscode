import { NextApiRequest, NextApiResponse } from 'next';

// This is where you can integrate your fine-tuned model
// For now, I'll create a knowledge base about Aliasgar
const aliasgarInfo = {
  name: "Aliasgar Sogiawala",
  role: "Full Stack Developer",
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
    "Python", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git"
  ],
  experience: "3+ years in web development",
  education: "Computer Science Graduate",
  projects: [
    {
      name: "VS Code Portfolio",
      description: "A portfolio website designed like VS Code interface",
      technologies: ["Next.js", "TypeScript", "CSS Modules"]
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    }
  ],
  contact: {
    email: "aliasgar@example.com",
    github: "https://github.com/aliasgar",
    linkedin: "https://linkedin.com/in/aliasgar"
  },
  interests: ["Web Development", "AI/ML", "Open Source", "Tech Innovation"],
  location: "India"
};

// Simple keyword-based response system
// You can replace this with your fine-tuned model API call
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm an AI assistant trained on ${aliasgarInfo.name}'s information. I can tell you about his skills, projects, experience, and more. What would you like to know?`;
  }
  
  // Skills
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return `${aliasgarInfo.name} is skilled in: ${aliasgarInfo.skills.join(', ')}. He specializes in full-stack development with a focus on modern web technologies.`;
  }
  
  // Experience
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('career')) {
    return `${aliasgarInfo.name} has ${aliasgarInfo.experience} and works as a ${aliasgarInfo.role}. He has experience building scalable web applications and working with modern development workflows.`;
  }
  
  // Projects
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
    const projectList = aliasgarInfo.projects.map(p => 
      `• ${p.name}: ${p.description} (Built with: ${p.technologies.join(', ')})`
    ).join('\n');
    return `Here are some of ${aliasgarInfo.name}'s notable projects:\n\n${projectList}`;
  }
  
  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
    return `${aliasgarInfo.name} is a ${aliasgarInfo.education} with a strong foundation in computer science principles and software development.`;
  }
  
  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return `You can reach ${aliasgarInfo.name} through:\n• Email: ${aliasgarInfo.contact.email}\n• GitHub: ${aliasgarInfo.contact.github}\n• LinkedIn: ${aliasgarInfo.contact.linkedin}`;
  }
  
  // Location
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based')) {
    return `${aliasgarInfo.name} is based in ${aliasgarInfo.location}.`;
  }
  
  // Interests
  if (lowerMessage.includes('interest') || lowerMessage.includes('hobby') || lowerMessage.includes('passionate')) {
    return `${aliasgarInfo.name} is passionate about ${aliasgarInfo.interests.join(', ')}. He enjoys staying up-to-date with the latest technology trends and contributing to innovative projects.`;
  }
  
  // About
  if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
    return `${aliasgarInfo.name} is a ${aliasgarInfo.role} with ${aliasgarInfo.experience}. He's passionate about creating innovative web solutions and has expertise in ${aliasgarInfo.skills.slice(0, 5).join(', ')} and more. Feel free to ask about his projects, skills, or experience!`;
  }
  
  // Default response
  return `I can help you learn about ${aliasgarInfo.name}! You can ask me about his skills, experience, projects, education, contact information, or anything else you'd like to know. Try asking specific questions like "What are his skills?" or "Tell me about his projects."`;
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

// TODO: Replace the generateResponse function with your fine-tuned model
// Example integration with OpenAI or other AI services:
/*
async function callFineTunedModel(message: string): Promise<string> {
  const response = await fetch('YOUR_MODEL_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI_MODEL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  
  const data = await response.json();
  return data.response || data.choices?.[0]?.text || 'Sorry, I could not process that.';
}
*/
