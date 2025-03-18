import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { generateWebsite } from '@/api/generate-website';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WebsiteGenerator() {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [stylePreset, setStylePreset] = useState('modern');
  const [useAceternityUI, setUseAceternityUI] = useState(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerateWebsite = async () => {
    if (!prompt) {
      setError('Please provide a description of your website');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const enhancedPrompt = `
        ${prompt}
        
        Technical requirements:
        - Create clean, properly formatted HTML, CSS, and JavaScript
        - ${useAceternityUI ? 'Use Aceternity UI style with glossy effects, smooth animations, and modern design patterns' : 'Use standard modern web design patterns'}
        - Style: ${stylePreset}
        - Ensure fully responsive design for all screen sizes
        - Include only the necessary code without explanatory comments in the output
        - Provide a complete, standalone HTML file with embedded CSS and JavaScript
        - Optimize for performance and visual appeal
      `;
      
      const result = await generateWebsite(enhancedPrompt, image);
      const processedCode = cleanupGeneratedCode(result.code);
      setGeneratedCode(processedCode);
      
      // Create a preview URL using Blob
      const htmlBlob = new Blob([processedCode], { type: 'text/html' });
      const url = URL.createObjectURL(htmlBlob);
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanupGeneratedCode = (code: string): string => {
    let cleanCode = code.replace(/```html|```|```css|```javascript/g, '');
    cleanCode = cleanCode.replace(/### Explanation:.*?(?=<|$)/gs, '');
    cleanCode = cleanCode.replace(/\*\*HTML\*\*:|\*\*CSS\*\*:|\*\*JavaScript\*\*:/g, '');
    
    if (!cleanCode.includes('<!DOCTYPE html>')) {
      cleanCode = '<!DOCTYPE html>\n' + cleanCode;
    }
    
    return cleanCode.trim();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">AI Website Generator</h1>
      <p className="text-gray-500 mb-8">Create modern, responsive websites with a simple prompt</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg border-0">
          <h2 className="text-2xl font-semibold mb-4">Input</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Design Reference (Optional)
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {image && <p className="text-sm text-green-600 mt-1">Image uploaded: {image.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Describe Your Website
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'Create a modern portfolio website header with a glossy navigation bar, animated menu transitions, and a hero section with a gradient background'"
                className="w-full h-32"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="style-preset" className="block text-sm font-medium mb-2">Style Preset</Label>
                <Select value={stylePreset} onValueChange={setStylePreset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern & Clean</SelectItem>
                    <SelectItem value="glassmorphism">Glassmorphism</SelectItem>
                    <SelectItem value="neumorphism">Neumorphism</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 h-full pt-6">
                <Switch 
                  id="aceternity-toggle" 
                  checked={useAceternityUI} 
                  onCheckedChange={setUseAceternityUI}
                />
                <Label htmlFor="aceternity-toggle">Aceternity UI Style</Label>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button
              onClick={handleGenerateWebsite}
              disabled={loading || !prompt}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Website'
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-lg border-0">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          {previewUrl ? (
            <div className="border rounded overflow-hidden">
              <iframe
                src={previewUrl}
                className="w-full h-[500px]"
                title="Website Preview"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            <div className="w-full h-[500px] border rounded flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <p className="mb-2">Your preview will appear here</p>
                <p className="text-sm">Generate a website to see the result</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {generatedCode && (
        <Card className="mt-8 p-6 shadow-lg border-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Generated Code</h2>
            <Button 
              onClick={() => {
                const blob = new Blob([generatedCode], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'generated-website.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              variant="outline"
            >
              Download HTML
            </Button>
          </div>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <pre className="text-sm">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
}