import { useState } from 'react';
import { Upload, Code, Eye, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BaseCrudService } from '@/integrations';
import { CommunityAnimations } from '@/entities';
import { Image } from '@/components/ui/image';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    animationName: '',
    description: '',
    authorName: '',
    codeSnippet: '',
    tags: '',
    liveDemoUrl: '',
    previewImage: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.animationName.trim() || !formData.codeSnippet.trim()) {
      setError('Animation name and code snippet are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newAnimation: Partial<CommunityAnimations> = {
        _id: crypto.randomUUID(),
        animationName: formData.animationName.trim(),
        description: formData.description.trim(),
        authorName: formData.authorName.trim() || 'Anonymous',
        codeSnippet: formData.codeSnippet.trim(),
        tags: formData.tags.trim(),
        liveDemoUrl: formData.liveDemoUrl.trim(),
        previewImage: formData.previewImage.trim()
      };

      await BaseCrudService.create('communityanimations', newAnimation as any);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        animationName: '',
        description: '',
        authorName: '',
        codeSnippet: '',
        tags: '',
        liveDemoUrl: '',
        previewImage: ''
      });
    } catch (error) {
      console.error('Failed to submit animation:', error);
      setError('Failed to submit animation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTagsArray = () => {
    return formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center">
        <Card className="bg-background text-foreground p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Animation Submitted!</h2>
            <p className="font-paragraph text-staticgray mb-6">
              Thank you for contributing to the MotionJS community. Your animation will be reviewed and published soon.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Submit Another
              </Button>
              <Button
                variant="outline"
                className="w-full border-staticgray/20 text-staticgray hover:text-primary-foreground"
                onClick={() => window.location.href = '/gallery'}
              >
                View Gallery
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="border-b border-staticgray/20 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-2">Submit Your Animation</h1>
          <p className="font-paragraph text-staticgray">
            Share your creative animations with the MotionJS community
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {error && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertDescription className="text-destructive font-paragraph">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-background text-foreground">
            <div className="p-6">
              <h2 className="text-xl font-heading font-bold mb-6">Animation Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="animationName" className="font-paragraph font-bold">
                    Animation Name *
                  </Label>
                  <Input
                    id="animationName"
                    value={formData.animationName}
                    onChange={(e) => handleInputChange('animationName', e.target.value)}
                    placeholder="e.g., Bouncing Ball, Morphing Shape"
                    className="mt-2 bg-primary text-primary-foreground border-staticgray/20"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="authorName" className="font-paragraph font-bold">
                    Your Name
                  </Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange('authorName', e.target.value)}
                    placeholder="Your name (optional)"
                    className="mt-2 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="font-paragraph font-bold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your animation, its purpose, and any special features..."
                    className="mt-2 h-24 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>

                <div>
                  <Label htmlFor="codeSnippet" className="font-paragraph font-bold">
                    Code Snippet *
                  </Label>
                  <Textarea
                    id="codeSnippet"
                    value={formData.codeSnippet}
                    onChange={(e) => handleInputChange('codeSnippet', e.target.value)}
                    placeholder="motion('.element').fadeIn(500).scale(1.2, 300).play();"
                    className="mt-2 h-32 font-paragraph text-sm bg-primary text-primary-foreground border-staticgray/20"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="font-paragraph font-bold">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="fade, scale, bounce, ui (comma-separated)"
                    className="mt-2 bg-primary text-primary-foreground border-staticgray/20"
                  />
                  {getTagsArray().length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {getTagsArray().map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-secondary/20 text-secondary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="liveDemoUrl" className="font-paragraph font-bold">
                    Live Demo URL
                  </Label>
                  <Input
                    id="liveDemoUrl"
                    value={formData.liveDemoUrl}
                    onChange={(e) => handleInputChange('liveDemoUrl', e.target.value)}
                    placeholder="https://codepen.io/your-demo"
                    className="mt-2 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>

                <div>
                  <Label htmlFor="previewImage" className="font-paragraph font-bold">
                    Preview Image URL
                  </Label>
                  <Input
                    id="previewImage"
                    value={formData.previewImage}
                    onChange={(e) => handleInputChange('previewImage', e.target.value)}
                    placeholder="https://static.wixstatic.com/media/9ee021_38ffacce7135462e80fc87bbcfc55839~mv2.png?originWidth=640&originHeight=320"
                    className="mt-2 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex-1 border-staticgray/20 text-staticgray hover:text-primary-foreground"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {previewMode ? 'Edit' : 'Preview'}
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Animation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* Preview */}
          <Card className="bg-background text-foreground">
            <div className="p-6">
              <h2 className="text-xl font-heading font-bold mb-6">Preview</h2>
              
              {previewMode ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-primary rounded-lg overflow-hidden">
                    {formData.previewImage ? (
                      <Image src={formData.previewImage} alt="Animation preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-secondary rounded-lg animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      {formData.animationName || 'Untitled Animation'}
                    </h3>
                    <p className="font-paragraph text-sm text-staticgray mt-1">
                      by {formData.authorName || 'Anonymous'}
                    </p>
                  </div>

                  <p className="font-paragraph text-sm">
                    {formData.description || 'No description provided'}
                  </p>

                  {getTagsArray().length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {getTagsArray().map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-staticgray/20 text-staticgray"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {formData.codeSnippet && (
                    <div>
                      <h4 className="font-heading font-bold text-sm mb-2">Code:</h4>
                      <pre className="bg-primary text-primary-foreground p-3 rounded text-xs font-paragraph overflow-x-auto">
                        <code>{formData.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold mb-3">Submission Guidelines</h3>
                    <ul className="space-y-2 font-paragraph text-sm text-staticgray">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Ensure your code uses MotionJS syntax
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-neoncyan rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Test your animation before submitting
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-neonmagenta rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Use descriptive names and clear descriptions
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-neonred rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Add relevant tags for better discoverability
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold mb-3">Code Example</h3>
                    <pre className="bg-primary text-primary-foreground p-4 rounded text-xs font-paragraph overflow-x-auto">
                      <code>{`// Basic animation
motion('.element')
  .fadeIn(500)
  .scale(1.2, 300)
  .play();

// Timeline animation
motion.timeline()
  .add('.box', { x: 100, duration: 800 })
  .add('.circle', { scale: 2 }, '-=400')
  .play();`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold mb-3">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['fade', 'scale', 'rotate', 'bounce', 'slide', 'ui', 'loading', 'hover', 'click', 'timeline'].map((tag) => (
                        <Button
                          key={tag}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
                            if (!currentTags.includes(tag)) {
                              const newTags = [...currentTags, tag].join(', ');
                              handleInputChange('tags', newTags);
                            }
                          }}
                          className="text-xs border-staticgray/20 text-staticgray hover:text-primary-foreground"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}