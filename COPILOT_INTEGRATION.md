# AI Copilot Integration Guide

This guide explains how to integrate your fine-tuned AI model with the VS Code Portfolio Copilot feature.

## Overview

The Copilot feature provides an interactive AI assistant that can answer questions about you (Aliasgar). It currently uses a simple keyword-based response system, but can be easily upgraded to use your fine-tuned AI model.

## Current Implementation

The current implementation is located in `/pages/api/copilot.ts` and uses a basic keyword matching system with predefined responses about:
- Skills and technologies
- Work experience
- Projects
- Education
- Contact information
- Interests and hobbies

## Integrating Your Fine-Tuned Model

### Option 1: OpenAI Fine-Tuned Model

```typescript
// In /pages/api/copilot.ts

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateResponse(message: string): Promise<string> {
  try {
    const response = await openai.createCompletion({
      model: "your-fine-tuned-model-id", // Replace with your model ID
      prompt: `User: ${message}\nAI Assistant about Aliasgar:`,
      max_tokens: 300,
      temperature: 0.7,
      stop: ["User:", "AI Assistant:"],
    });

    return response.data.choices[0]?.text?.trim() || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "Sorry, I'm having trouble connecting right now.";
  }
}
```

### Option 2: Hugging Face Model

```typescript
async function generateResponse(message: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Question about Aliasgar: ${message}`,
          parameters: {
            max_length: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    return data.generated_text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return "Sorry, I'm having trouble connecting right now.";
  }
}
```

### Option 3: Custom API Endpoint

```typescript
async function generateResponse(message: string): Promise<string> {
  try {
    const response = await fetch(process.env.AI_MODEL_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AI_MODEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        context: "answering questions about Aliasgar Sogiawala",
      }),
    });

    const data = await response.json();
    return data.response || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error('Custom API error:', error);
    return "Sorry, I'm having trouble connecting right now.";
  }
}
```

## Environment Variables Setup

1. Copy `.env.example` to `.env.local`
2. Add your API keys and configuration:

```bash
# For OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# For Hugging Face
HUGGINGFACE_API_KEY=your_huggingface_api_key
HUGGINGFACE_MODEL_ID=your_username/your_fine_tuned_model

# For Custom API
AI_MODEL_ENDPOINT=https://your-api-endpoint.com/generate
AI_MODEL_API_KEY=your_api_key
```

## Training Data Suggestions

When fine-tuning your model, consider including:

### Personal Information
- Full name, background, education
- Current role and experience level
- Location and availability

### Technical Skills
- Programming languages
- Frameworks and libraries
- Tools and technologies
- Certifications

### Projects
- Project descriptions
- Technologies used
- Your role and contributions
- Links to repositories or demos

### Professional Experience
- Previous roles and responsibilities
- Notable achievements
- Team experiences
- Industry knowledge

### Soft Skills and Interests
- Communication style
- Problem-solving approach
- Hobbies and interests
- Career goals

## Example Training Prompts

```
Q: What programming languages does Aliasgar know?
A: Aliasgar is proficient in JavaScript, TypeScript, Python, and has experience with React, Next.js, Node.js, and various other modern web technologies.

Q: Tell me about Aliasgar's experience
A: Aliasgar is a full-stack developer with 3+ years of experience building modern web applications. He specializes in React/Next.js development and has worked on various projects ranging from portfolio websites to full-scale web applications.

Q: What kind of projects has Aliasgar worked on?
A: Aliasgar has worked on several notable projects including this VS Code-themed portfolio website, e-commerce platforms, and various web applications using modern frameworks and technologies.
```

## Testing Your Integration

1. Start the development server: `npm run dev`
2. Open the website and click on the AI Assistant button
3. Test with various questions about yourself
4. Monitor the API logs for any errors
5. Adjust the model parameters as needed

## Customization Options

### Modify the UI
- Update `components/Copilot.tsx` for UI changes
- Modify `styles/Copilot.module.css` for styling
- Add new suggestion questions in the component

### Enhance Functionality
- Add conversation memory
- Implement typing indicators
- Add file upload for context
- Create conversation export feature

## Security Considerations

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement rate limiting if needed
- Consider adding authentication for production use

## Troubleshooting

### Common Issues
1. **API Key not working**: Verify your API key and permissions
2. **Model not responding**: Check your model ID and endpoint
3. **Rate limits**: Implement proper error handling and retry logic
4. **CORS issues**: Ensure your API endpoints allow requests from your domain

### Debugging
- Check browser console for errors
- Monitor API response in Network tab
- Add logging to the API route
- Test API endpoints separately

## Performance Optimization

- Implement response caching
- Add request debouncing
- Use streaming responses for longer content
- Optimize model parameters for faster responses

Remember to test thoroughly before deploying to production!
