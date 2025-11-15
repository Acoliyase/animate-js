import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, ExternalLink, Code, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const presetAnimations = [
  {
    name: 'Fade In',
    code: `motion('.target')
  .fadeIn(1000)
  .play();`
  },
  {
    name: 'Bounce Scale',
    code: `motion('.target')
  .scale(1.5, 500, 'bounce')
  .scale(1, 300)
  .play();`
  },
  {
    name: 'Slide & Rotate',
    code: `motion('.target')
  .translateX(200, 800)
  .rotate(360, 600)
  .translateX(0, 400)
  .play();`
  },
  {
    name: 'Complex Timeline',
    code: `motion.timeline()
  .add('.target', { 
    scale: 1.2, 
    rotate: 180 
  }, 0)
  .add('.target', { 
    x: 100, 
    backgroundColor: '#00FF00' 
  }, 500)
  .play();`
  }
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(presetAnimations[0].code);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState([1000]);
  const [easing, setEasing] = useState('ease');
  const animationRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate animation execution
    setTimeout(() => setIsPlaying(false), duration[0]);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reset animation state
  };

  const exportToCodePen = () => {
    const data = {
      title: 'MotionJS Animation',
      html: '<div class="target">Animated Element</div>',
      css: `.target {
  width: 100px;
  height: 100px;
  background: #00FF00;
  border-radius: 8px;
  margin: 50px auto;
}`,
      js: code
    };
    
    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="border-b border-staticgray/20 p-6">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Animation Playground</h1>
            <p className="font-paragraph text-staticgray mt-1">
              Experiment with MotionJS animations in real-time
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handlePlay}
              disabled={isPlaying}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Playing' : 'Play'}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={exportToCodePen}
              variant="outline"
              className="border-neoncyan text-neoncyan hover:bg-neoncyan hover:text-primary"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[100rem] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-background text-foreground h-full">
              <div className="p-6">
                <Tabs defaultValue="code" className="h-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code" className="flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-paragraph font-bold mb-2 block">
                          Animation Presets
                        </Label>
                        <Select
                          value={presetAnimations.find(p => p.code === code)?.name || ''}
                          onValueChange={(value) => {
                            const preset = presetAnimations.find(p => p.name === value);
                            if (preset) setCode(preset.code);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a preset..." />
                          </SelectTrigger>
                          <SelectContent>
                            {presetAnimations.map((preset) => (
                              <SelectItem key={preset.name} value={preset.name}>
                                {preset.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-paragraph font-bold mb-2 block">
                          JavaScript Code
                        </Label>
                        <Textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="font-paragraph text-sm h-96 bg-primary text-primary-foreground border-staticgray/20"
                          placeholder="Enter your MotionJS animation code..."
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-paragraph font-bold mb-3 block">
                          Duration: {duration[0]}ms
                        </Label>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          max={3000}
                          min={100}
                          step={100}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-paragraph font-bold mb-2 block">
                          Easing Function
                        </Label>
                        <Select value={easing} onValueChange={setEasing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ease">Ease</SelectItem>
                            <SelectItem value="ease-in">Ease In</SelectItem>
                            <SelectItem value="ease-out">Ease Out</SelectItem>
                            <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                            <SelectItem value="elastic">Elastic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-heading font-bold mb-3">Export Options</h4>
                        <div className="space-y-2">
                          <Button
                            onClick={exportToCodePen}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Export to CodePen
                          </Button>
                          <Button
                            onClick={() => {
                              const data = {
                                html: '<div class="target">Animated Element</div>',
                                css: `.target { width: 100px; height: 100px; background: #00FF00; }`,
                                js: code
                              };
                              window.open(`https://jsfiddle.net/?html=${encodeURIComponent(data.html)}&css=${encodeURIComponent(data.css)}&js=${encodeURIComponent(data.js)}`, '_blank');
                            }}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Export to JSFiddle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card className="bg-background text-foreground">
              <div className="p-6">
                <h3 className="font-heading font-bold mb-4">Live Preview</h3>
                
                {/* Animation Stage */}
                <div className="bg-primary rounded-lg p-8 mb-6 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                  <div
                    ref={animationRef}
                    className={`target w-20 h-20 bg-secondary rounded-lg transition-all duration-1000 ${
                      isPlaying ? 'animate-pulse scale-110' : ''
                    }`}
                  />
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-staticgray" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animation Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-paragraph">
                    <span className="text-staticgray">Status:</span>
                    <span className={isPlaying ? 'text-secondary' : 'text-primary-foreground'}>
                      {isPlaying ? 'Playing' : 'Ready'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-paragraph">
                    <span className="text-staticgray">Duration:</span>
                    <span>{duration[0]}ms</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-paragraph">
                    <span className="text-staticgray">Easing:</span>
                    <span>{easing}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-staticgray/20">
                  <h4 className="font-heading font-bold mb-3 text-sm">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCode(`motion('.target').fadeIn(500).play();`)}
                      className="text-xs"
                    >
                      Fade In
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCode(`motion('.target').scale(1.5, 300).play();`)}
                      className="text-xs"
                    >
                      Scale
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCode(`motion('.target').rotate(360, 600).play();`)}
                      className="text-xs"
                    >
                      Rotate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCode(`motion('.target').translateX(100, 400).play();`)}
                      className="text-xs"
                    >
                      Move
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Documentation Quick Reference */}
        <Card className="bg-background text-foreground mt-6">
          <div className="p-6">
            <h3 className="font-heading font-bold mb-4">Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-heading font-bold text-sm mb-2 text-secondary">Basic Methods</h4>
                <ul className="space-y-1 text-xs font-paragraph text-staticgray">
                  <li><code>.fadeIn(duration)</code></li>
                  <li><code>.fadeOut(duration)</code></li>
                  <li><code>.scale(value, duration)</code></li>
                  <li><code>.rotate(degrees, duration)</code></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-bold text-sm mb-2 text-neoncyan">Transform</h4>
                <ul className="space-y-1 text-xs font-paragraph text-staticgray">
                  <li><code>.translateX(value)</code></li>
                  <li><code>.translateY(value)</code></li>
                  <li><code>.skew(x, y)</code></li>
                  <li><code>.matrix(values)</code></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-bold text-sm mb-2 text-neonmagenta">Timeline</h4>
                <ul className="space-y-1 text-xs font-paragraph text-staticgray">
                  <li><code>motion.timeline()</code></li>
                  <li><code>.add(selector, props)</code></li>
                  <li><code>.pause()</code></li>
                  <li><code>.reverse()</code></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-bold text-sm mb-2 text-neonred">Easing</h4>
                <ul className="space-y-1 text-xs font-paragraph text-staticgray">
                  <li><code>'ease'</code></li>
                  <li><code>'bounce'</code></li>
                  <li><code>'elastic'</code></li>
                  <li><code>'cubic-bezier()'</code></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}