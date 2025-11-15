import { Link } from 'react-router-dom';
import { Play, Code, Users, BookOpen, Zap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Hero Section - Inspired by the bold layout */}
      <section className="w-full max-w-[120rem] mx-auto min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-secondary" />
            <span className="text-xl font-heading font-bold">MotionJS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/playground" className="text-sm font-paragraph hover:text-secondary transition-colors">
              PLAYGROUND
            </Link>
            <Link to="/gallery" className="text-sm font-paragraph hover:text-secondary transition-colors">
              GALLERY
            </Link>
            <Link to="/docs" className="text-sm font-paragraph hover:text-secondary transition-colors">
              DOCS
            </Link>
            <Link to="/submit" className="text-sm font-paragraph hover:text-secondary transition-colors">
              SUBMIT
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-secondary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-paragraph tracking-wider mb-6 text-staticgray">
              MODULAR JAVASCRIPT ANIMATION ENGINE
            </p>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-8">
              MOTION<span className="text-secondary">/</span>JS
            </h1>
            
            <p className="text-lg md:text-xl font-paragraph max-w-2xl mx-auto mb-12 leading-relaxed">
              Build stunning animations with our open-source, plugin-based engine. 
              Chain effects, create timelines, and bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph">
                <Link to="/playground">
                  <Play className="w-5 h-5 mr-2" />
                  Try Playground
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-paragraph">
                <Link to="/docs">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Docs
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Color Bar - Inspired by the neon stripe */}
        <div className="h-4 flex">
          <div className="flex-1 bg-neonblue"></div>
          <div className="flex-1 bg-secondary"></div>
          <div className="flex-1 bg-neoncyan"></div>
          <div className="flex-1 bg-neonmagenta"></div>
          <div className="flex-1 bg-neonred"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 max-w-[100rem] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Why Choose MotionJS?
          </h2>
          <p className="text-lg font-paragraph text-staticgray max-w-3xl mx-auto">
            A powerful, flexible animation library designed for modern web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-background text-foreground p-8 border-staticgray/20">
            <Code className="w-12 h-12 text-secondary mb-6" />
            <h3 className="text-xl font-heading font-bold mb-4">Modular Architecture</h3>
            <p className="font-paragraph text-staticgray">
              Import only what you need. Our plugin system keeps your bundle size minimal while maximizing functionality.
            </p>
          </Card>

          <Card className="bg-background text-foreground p-8 border-staticgray/20">
            <Users className="w-12 h-12 text-neoncyan mb-6" />
            <h3 className="text-xl font-heading font-bold mb-4">Community Driven</h3>
            <p className="font-paragraph text-staticgray">
              Explore animations created by developers worldwide. Share your own creations and inspire others.
            </p>
          </Card>

          <Card className="bg-background text-foreground p-8 border-staticgray/20">
            <Zap className="w-12 h-12 text-neonmagenta mb-6" />
            <h3 className="text-xl font-heading font-bold mb-4">Performance First</h3>
            <p className="font-paragraph text-staticgray">
              Optimized for 60fps animations with GPU acceleration and smart batching for smooth experiences.
            </p>
          </Card>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 px-6 lg:px-8 bg-background text-foreground">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Simple Yet Powerful
              </h2>
              <p className="text-lg font-paragraph text-staticgray mb-8">
                Create complex animations with intuitive chaining syntax. From simple fades to intricate timelines.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="font-paragraph">Chain multiple animations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neoncyan rounded-full"></div>
                  <span className="font-paragraph">Timeline control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neonmagenta rounded-full"></div>
                  <span className="font-paragraph">Easing functions</span>
                </div>
              </div>
            </div>

            <div className="bg-primary text-primary-foreground p-8 rounded-lg border border-staticgray/20">
              <pre className="font-paragraph text-sm overflow-x-auto">
                <code>{`import { motion } from 'motionjs';

// Simple fade in
motion('.element')
  .fadeIn(500)
  .scale(1.2, 300)
  .rotate(45, 200);

// Timeline animation
motion.timeline()
  .add('.box', { x: 100 })
  .add('.circle', { scale: 2 }, '-=200')
  .play();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg font-paragraph text-staticgray mb-12">
            Join thousands of developers creating amazing animations with MotionJS
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph">
              <Link to="/playground">
                <Play className="w-5 h-5 mr-2" />
                Start in Playground
              </Link>
            </Button>
            
            <Button asChild size="lg" className="bg-neoncyan text-primary hover:bg-neoncyan/90 font-paragraph">
              <Link to="/gallery">
                <Users className="w-5 h-5 mr-2" />
                Browse Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-staticgray/20 py-12 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-secondary" />
                <span className="text-lg font-heading font-bold">MotionJS</span>
              </div>
              <p className="font-paragraph text-staticgray text-sm">
                The modular JavaScript animation engine for modern web development.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4">Library</h4>
              <ul className="space-y-2 text-sm font-paragraph text-staticgray">
                <li><Link to="/docs" className="hover:text-secondary transition-colors">Documentation</Link></li>
                <li><Link to="/playground" className="hover:text-secondary transition-colors">Playground</Link></li>
                <li><a href="#" className="hover:text-secondary transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm font-paragraph text-staticgray">
                <li><Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
                <li><Link to="/submit" className="hover:text-secondary transition-colors">Submit Animation</Link></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Discord</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm font-paragraph text-staticgray">
                <li><a href="#" className="hover:text-secondary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">NPM</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Changelog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-staticgray/20 mt-12 pt-8 text-center">
            <p className="font-paragraph text-staticgray text-sm">
              © 2024 MotionJS. Open source under MIT License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}