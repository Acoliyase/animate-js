import { useState, useEffect } from 'react';
import { Search, Filter, Play, Code, Eye, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { CommunityAnimations } from '@/entities';
import { Image } from '@/components/ui/image';

export default function GalleryPage() {
  const [animations, setAnimations] = useState<CommunityAnimations[]>([]);
  const [filteredAnimations, setFilteredAnimations] = useState<CommunityAnimations[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedAnimation, setSelectedAnimation] = useState<CommunityAnimations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnimations();
  }, []);

  useEffect(() => {
    filterAnimations();
  }, [animations, searchTerm, selectedTag]);

  const loadAnimations = async () => {
    try {
      const { items } = await BaseCrudService.getAll<CommunityAnimations>('communityanimations');
      setAnimations(items);
    } catch (error) {
      console.error('Failed to load animations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAnimations = () => {
    let filtered = animations;

    if (searchTerm) {
      filtered = filtered.filter(
        (animation) =>
          animation.animationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animation.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((animation) =>
        animation.tags?.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }

    setFilteredAnimations(filtered);
  };

  const getAllTags = () => {
    const tagSet = new Set<string>();
    animations.forEach((animation) => {
      if (animation.tags) {
        animation.tags.split(',').forEach((tag) => {
          tagSet.add(tag.trim().toLowerCase());
        });
      }
    });
    return Array.from(tagSet);
  };

  const getAnimationTags = (animation: CommunityAnimations) => {
    return animation.tags ? animation.tags.split(',').map(tag => tag.trim()) : [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-paragraph">Loading animations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="border-b border-staticgray/20 p-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-2">Animation Gallery</h1>
          <p className="font-paragraph text-staticgray">
            Discover amazing animations created by the community
          </p>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto p-6">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-staticgray" />
              <Input
                placeholder="Search animations, authors, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background text-foreground border-staticgray/20"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-staticgray" />
              <span className="font-paragraph text-sm text-staticgray">Filter by tag:</span>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedTag === '' ? 'default' : 'outline'}
              onClick={() => setSelectedTag('')}
              className={selectedTag === '' ? 'bg-secondary text-secondary-foreground' : 'border-staticgray/20 text-staticgray hover:text-primary-foreground'}
            >
              All
            </Button>
            {getAllTags().map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={selectedTag === tag ? 'default' : 'outline'}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={selectedTag === tag ? 'bg-secondary text-secondary-foreground' : 'border-staticgray/20 text-staticgray hover:text-primary-foreground'}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-paragraph text-staticgray">
            Showing {filteredAnimations.length} of {animations.length} animations
          </p>
        </div>

        {/* Animation Grid */}
        {filteredAnimations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-staticgray/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-staticgray" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">No animations found</h3>
            <p className="font-paragraph text-staticgray">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimations.map((animation) => (
              <Card key={animation._id} className="bg-background text-foreground overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-primary relative overflow-hidden">
                  {animation.previewImage ? (
                    <Image
                      src={animation.previewImage}
                      alt={animation.animationName || 'Animation preview'}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-secondary rounded-lg animate-pulse"></div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          onClick={() => setSelectedAnimation(animation)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-bold text-lg leading-tight">
                      {animation.animationName || 'Untitled Animation'}
                    </h3>
                    {animation.liveDemoUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="text-neoncyan hover:text-neoncyan/80"
                      >
                        <a href={animation.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="font-paragraph text-staticgray text-sm mb-4 line-clamp-2">
                    {animation.description || 'No description available'}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-paragraph text-xs text-staticgray">
                      by {animation.authorName || 'Anonymous'}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {getAnimationTags(animation).slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-staticgray/20 text-staticgray hover:bg-staticgray/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {getAnimationTags(animation).length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-staticgray/20 text-staticgray">
                        +{getAnimationTags(animation).length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-staticgray/20 text-staticgray hover:text-primary-foreground"
                          onClick={() => setSelectedAnimation(animation)}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    
                    <Button
                      size="sm"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Try
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Animation Detail Modal */}
        {selectedAnimation && (
          <Dialog open={!!selectedAnimation} onOpenChange={() => setSelectedAnimation(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background text-foreground">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">
                  {selectedAnimation.animationName || 'Untitled Animation'}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preview */}
                <div>
                  <h4 className="font-heading font-bold mb-3">Preview</h4>
                  <div className="aspect-video bg-primary rounded-lg overflow-hidden mb-4">
                    {selectedAnimation.previewImage ? (
                      <Image
                        src={selectedAnimation.previewImage}
                        alt={selectedAnimation.animationName || 'Animation preview'}
                        className="w-full h-full object-cover"
                        width={600}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 bg-secondary rounded-lg animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-paragraph text-sm text-staticgray">Author:</span>
                      <span className="font-paragraph text-sm ml-2">
                        {selectedAnimation.authorName || 'Anonymous'}
                      </span>
                    </div>

                    <div>
                      <span className="font-paragraph text-sm text-staticgray">Description:</span>
                      <p className="font-paragraph text-sm mt-1">
                        {selectedAnimation.description || 'No description available'}
                      </p>
                    </div>

                    <div>
                      <span className="font-paragraph text-sm text-staticgray">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getAnimationTags(selectedAnimation).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-staticgray/20 text-staticgray"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-heading font-bold">Code</h4>
                    <div className="flex space-x-2">
                      {selectedAnimation.liveDemoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-neoncyan text-neoncyan hover:bg-neoncyan hover:text-primary"
                        >
                          <a href={selectedAnimation.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => {
                          if (selectedAnimation.codeSnippet) {
                            navigator.clipboard.writeText(selectedAnimation.codeSnippet);
                          }
                        }}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={selectedAnimation.codeSnippet || 'No code available'}
                    readOnly
                    className="font-paragraph text-sm h-64 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}