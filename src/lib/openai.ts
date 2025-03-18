import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use Vite environment variables
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
});

export const generateWebsiteFromPrompt = async (
  prompt: string,
  imageBase64?: string
) => {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is missing. Please check your environment variables.');
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert web developer. Generate clean, modern HTML/CSS/JS code for websites based on descriptions or images. Return only the complete HTML file with embedded CSS and JavaScript. Make sure the website is responsive and works on mobile devices.'
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt
          },
          ...(imageBase64 ? [{
            type: 'image_url',
            image_url: {
              url: imageBase64
            }
          }] : [])
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages as any,
      max_tokens: 4096,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};