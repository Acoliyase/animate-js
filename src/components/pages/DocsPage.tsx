import { useState, useEffect } from 'react';
import { Book, Search, ChevronRight, ExternalLink, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { Documentation } from '@/entities';

export default function DocsPage() {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Documentation[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Documentation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDocumentation();
  }, []);

  useEffect(() => {
    filterDocs();
  }, [docs, searchTerm, selectedCategory]);

  const loadDocumentation = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Documentation>('documentation');
      // Sort by order and then by title
      const sortedItems = items.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return (a.title || '').localeCompare(b.title || '');
      });
      setDocs(sortedItems);
      if (sortedItems.length > 0) {
        setSelectedDoc(sortedItems[0]);
      }
    } catch (error) {
      console.error('Failed to load documentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDocs = () => {
    let filtered = docs;

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((doc) => doc.category === selectedCategory);
    }

    setFilteredDocs(filtered);
  };

  const getCategories = () => {
    const categories = new Set<string>();
    docs.forEach((doc) => {
      if (doc.category) {
        categories.add(doc.category);
      }
    });
    return Array.from(categories).sort();
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-primary text-primary-foreground px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-paragraph">Loading documentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="border-b border-staticgray/20 p-6">
        <div className="max-w-[100rem] mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-2">Documentation</h1>
          <p className="font-paragraph text-staticgray">
            Complete guide to using MotionJS animation library
          </p>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-background text-foreground sticky top-6">
              <div className="p-6">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-staticgray" />
                  <Input
                    placeholder="Search docs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-primary text-primary-foreground border-staticgray/20"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-heading font-bold mb-3 text-sm">Categories</h3>
                  <div className="space-y-1">
                    <Button
                      size="sm"
                      variant={selectedCategory === '' ? 'default' : 'ghost'}
                      onClick={() => setSelectedCategory('')}
                      className={`w-full justify-start text-left ${
                        selectedCategory === '' 
                          ? 'bg-secondary text-secondary-foreground' 
                          : 'text-staticgray hover:text-primary-foreground'
                      }`}
                    >
                      All
                    </Button>
                    {getCategories().map((category) => (
                      <Button
                        key={category}
                        size="sm"
                        variant={selectedCategory === category ? 'default' : 'ghost'}
                        onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                        className={`w-full justify-start text-left ${
                          selectedCategory === category 
                            ? 'bg-secondary text-secondary-foreground' 
                            : 'text-staticgray hover:text-primary-foreground'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Documentation List */}
                <div>
                  <h3 className="font-heading font-bold mb-3 text-sm">Documentation</h3>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {filteredDocs.map((doc) => (
                      <Button
                        key={doc._id}
                        size="sm"
                        variant={selectedDoc?._id === doc._id ? 'default' : 'ghost'}
                        onClick={() => setSelectedDoc(doc)}
                        className={`w-full justify-start text-left ${
                          selectedDoc?._id === doc._id 
                            ? 'bg-secondary text-secondary-foreground' 
                            : 'text-staticgray hover:text-primary-foreground'
                        }`}
                      >
                        <div className="flex items-center w-full">
                          <Book className="w-3 h-3 mr-2 flex-shrink-0" />
                          <span className="truncate">{doc.title || 'Untitled'}</span>
                          <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {selectedDoc ? (
              <Card className="bg-background text-foreground">
                <div className="p-8">
                  {/* Document Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {selectedDoc.category && (
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                            {selectedDoc.category}
                          </Badge>
                        )}
                        {selectedDoc.lastUpdated && (
                          <span className="font-paragraph text-xs text-staticgray">
                            Updated: {new Date(selectedDoc.lastUpdated).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h1 className="text-3xl font-heading font-bold mb-4">
                      {selectedDoc.title || 'Untitled Document'}
                    </h1>
                  </div>

                  {/* Document Content */}
                  <div className="prose prose-invert max-w-none">
                    {selectedDoc.content ? (
                      <div
                        className="font-paragraph leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: `<p class="mb-4">${formatContent(selectedDoc.content)}</p>`
                        }}
                      />
                    ) : (
                      <p className="font-paragraph text-staticgray">
                        No content available for this document.
                      </p>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-staticgray/20">
                    <div>
                      {filteredDocs.findIndex(doc => doc._id === selectedDoc._id) > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = filteredDocs.findIndex(doc => doc._id === selectedDoc._id);
                            setSelectedDoc(filteredDocs[currentIndex - 1]);
                          }}
                          className="border-staticgray/20 text-staticgray hover:text-primary-foreground"
                        >
                          ← Previous
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      {filteredDocs.findIndex(doc => doc._id === selectedDoc._id) < filteredDocs.length - 1 && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = filteredDocs.findIndex(doc => doc._id === selectedDoc._id);
                            setSelectedDoc(filteredDocs[currentIndex + 1]);
                          }}
                          className="border-staticgray/20 text-staticgray hover:text-primary-foreground"
                        >
                          Next →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-background text-foreground">
                <div className="p-8 text-center">
                  <Book className="w-16 h-16 text-staticgray mx-auto mb-4" />
                  <h2 className="text-xl font-heading font-bold mb-2">No Documentation Selected</h2>
                  <p className="font-paragraph text-staticgray">
                    Choose a document from the sidebar to view its content.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-background text-foreground p-6 hover:shadow-lg transition-shadow">
              <Code className="w-8 h-8 text-secondary mb-3" />
              <h3 className="font-heading font-bold mb-2">API Reference</h3>
              <p className="font-paragraph text-staticgray text-sm mb-4">
                Complete method and property documentation
              </p>
              <Button size="sm" variant="outline" className="border-staticgray/20 text-staticgray hover:text-primary-foreground">
                <ExternalLink className="w-3 h-3 mr-2" />
                View API
              </Button>
            </Card>

            <Card className="bg-background text-foreground p-6 hover:shadow-lg transition-shadow">
              <Book className="w-8 h-8 text-neoncyan mb-3" />
              <h3 className="font-heading font-bold mb-2">Getting Started</h3>
              <p className="font-paragraph text-staticgray text-sm mb-4">
                Learn the basics and create your first animation
              </p>
              <Button size="sm" variant="outline" className="border-staticgray/20 text-staticgray hover:text-primary-foreground">
                <ExternalLink className="w-3 h-3 mr-2" />
                Start Guide
              </Button>
            </Card>

            <Card className="bg-background text-foreground p-6 hover:shadow-lg transition-shadow">
              <ExternalLink className="w-8 h-8 text-neonmagenta mb-3" />
              <h3 className="font-heading font-bold mb-2">Examples</h3>
              <p className="font-paragraph text-staticgray text-sm mb-4">
                Real-world examples and use cases
              </p>
              <Button size="sm" variant="outline" className="border-staticgray/20 text-staticgray hover:text-primary-foreground">
                <ExternalLink className="w-3 h-3 mr-2" />
                View Examples
              </Button>
            </Card>

            <Card className="bg-background text-foreground p-6 hover:shadow-lg transition-shadow">
              <ExternalLink className="w-8 h-8 text-neonred mb-3" />
              <h3 className="font-heading font-bold mb-2">GitHub</h3>
              <p className="font-paragraph text-staticgray text-sm mb-4">
                Source code, issues, and contributions
              </p>
              <Button size="sm" variant="outline" className="border-staticgray/20 text-staticgray hover:text-primary-foreground">
                <ExternalLink className="w-3 h-3 mr-2" />
                GitHub Repo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}