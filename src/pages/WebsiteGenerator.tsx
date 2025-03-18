import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { generateWebsite } from '@/api/generate-website';

export default function WebsiteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [stylePreset, setStylePreset] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const savedPrompt = sessionStorage.getItem('websitePrompt');
    const savedStyle = sessionStorage.getItem('stylePreset');
    
    if (savedPrompt) {
      setPrompt(savedPrompt);
    }
    
    if (savedStyle) {
      setStylePreset(savedStyle);
    }
    
    if (savedPrompt && savedStyle) {
      const timer = setTimeout(() => {
        handleGenerateWebsiteWithValues(savedPrompt, savedStyle);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGenerateWebsiteWithValues = async (promptValue, styleValue) => {
    if (!promptValue) {
      setError('No website description found. Please return to the homepage and enter a prompt.');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const enhancedPrompt = `
        ${promptValue}
        
        Technical requirements:
        - Create clean, properly formatted HTML, CSS, and JavaScript
        - Use modern web design patterns with glossy effects, smooth animations
        - Style: ${styleValue}
        - Ensure fully responsive design for all screen sizes
        - Include only the necessary code without explanatory comments in the output
        - Provide a complete, standalone HTML file with embedded CSS and JavaScript
        - Optimize for performance and visual appeal
      `;
      
      const result = await generateWebsite(enhancedPrompt, null);
      const processedCode = cleanupGeneratedCode(result.code);
      setGeneratedCode(processedCode);
      
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

  const handleGenerateWebsite = async () => {
    await handleGenerateWebsiteWithValues(prompt, stylePreset);
  };

  const cleanupGeneratedCode = (code) => {
    let cleanCode = code.replace(/```(html|css|javascript|jsx|typescript)?\n?|```/g, '');
    
    cleanCode = cleanCode.replace(/### Explanation:.*?(?=<|$)/gs, '');
    cleanCode = cleanCode.replace(/Here is a complete HTML file.*?(?=<!DOCTYPE|<html|<head|<body|<|$)/gs, '');
    cleanCode = cleanCode.replace(/This HTML file.*?(?=<!DOCTYPE|<html|<head|<body|<|$)/gs, '');
    cleanCode = cleanCode.replace(/\*\*HTML\*\*:|\*\*CSS\*\*:|\*\*JavaScript\*\*:/g, '');
    
    cleanCode = cleanCode.replace(/^#+\s+.*$/gm, '');
    
    cleanCode = cleanCode.split('\n')
      .filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine === '' || 
               trimmedLine.startsWith('<') || 
               trimmedLine.startsWith('}') || 
               trimmedLine.startsWith('{') ||
               trimmedLine.includes(':') ||
               trimmedLine.includes('=') ||
               trimmedLine.includes('(') ||
               trimmedLine.startsWith('.') ||
               trimmedLine.startsWith('@');
      })
      .join('\n');
    
    if (!cleanCode.includes('<!DOCTYPE html>') && 
        (cleanCode.includes('<html') || 
         cleanCode.includes('<head') || 
         cleanCode.includes('<body'))) {
      cleanCode = '<!DOCTYPE html>\n' + cleanCode;
    }
    
    return cleanCode.trim();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">AI Website Generator</h1>
      <p className="text-gray-500 mb-8">Creating your custom website based on your description</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg border-0">
          <h2 className="text-2xl font-semibold mb-4">Your Request</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Website Description
              </label>
              <div className="p-4 bg-gray-50 rounded-md min-h-32 whitespace-pre-wrap">
                {prompt || "No description provided"}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Selected Style
              </label>
              <div className="p-2 bg-gray-50 rounded-md">
                {stylePreset || "No style selected"}
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2">Generating your website...</span>
              </div>
            ) : !previewUrl ? (
              <Button
                onClick={handleGenerateWebsite}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Generate Website
              </Button>
            ) : (
              <Button
                onClick={handleGenerateWebsite}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Regenerate Website
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6 shadow-lg border-0">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          {loading ? (
            <div className="w-full h-[500px] border rounded flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Generating your website...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
              </div>
            </div>
          ) : previewUrl ? (
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
                <p className="text-sm">Click "Generate Website" to see the result</p>
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