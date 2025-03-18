import { generateWebsiteFromPrompt } from '@/lib/openai';

export async function generateWebsite(prompt: string, image: File | null) {
  try {
    let imageBase64;
    if (image) {
      imageBase64 = await convertImageToBase64(image);
    }

    const generatedCode = await generateWebsiteFromPrompt(prompt, imageBase64);
    return { code: generatedCode };
  } catch (error) {
    console.error('Error generating website:', error);
    throw new Error('Failed to generate website');
  }
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}