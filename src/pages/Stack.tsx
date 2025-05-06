
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code } from "lucide-react";
import SectionHeading from '@/components/ui/SectionHeading';
import TechStack from '@/components/ui/TechStack';
import * as THREE from 'three';

const Stack = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Three.js effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x7777ff, 0x444477);
    gridHelper.position.y = -5;
    scene.add(gridHelper);
    
    camera.position.z = 10;
    camera.position.y = 2;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      gridHelper.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* 3D Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full -z-10"
      />
      
      <main className="min-h-screen pt-24 pb-12">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Header */}
          <SectionHeading 
            title="Technical Stack"
            subtitle="The software and tools I use for video editing and production"
            align="center"
          />
          
          {/* Introduction */}
          <motion.div 
            className="glass-card p-8 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-accent/20 p-3 rounded-full">
                <Code size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-gradient">My Editing Toolbox</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              As a professional video editor, I leverage a diverse set of industry-standard tools and software to deliver high-quality content. My technical stack enables me to handle everything from raw footage processing to sophisticated effects and color grading.
            </p>
            
            <p className="text-muted-foreground">
              I continuously update my skills and explore emerging technologies to stay at the cutting edge of video production capabilities, ensuring I can tackle any creative challenge.
            </p>
          </motion.div>
          
          {/* Tech Stack Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <TechStack
              title="Editing Software"
              items={[
                { name: "Adobe Premiere Pro", icon: "/placeholder.svg", level: 9.5 },
                { name: "Final Cut Pro", icon: "/placeholder.svg", level: 9 },
                { name: "DaVinci Resolve", icon: "/placeholder.svg", level: 8.5 },
                { name: "Avid Media Composer", icon: "/placeholder.svg", level: 7 }
              ]}
            />
            
            <TechStack
              title="Motion Graphics & VFX"
              items={[
                { name: "Adobe After Effects", icon: "/placeholder.svg", level: 9 },
                { name: "Cinema 4D", icon: "/placeholder.svg", level: 7.5 },
                { name: "Blender", icon: "/placeholder.svg", level: 6 },
                { name: "Nuke", icon: "/placeholder.svg", level: 5 }
              ]}
            />
            
            <TechStack
              title="Color Grading"
              items={[
                { name: "DaVinci Resolve Color", icon: "/placeholder.svg", level: 9 },
                { name: "Lumetri Color", icon: "/placeholder.svg", level: 8.5 },
                { name: "FilmConvert", icon: "/placeholder.svg", level: 8 }
              ]}
            />
            
            <TechStack
              title="Audio Editing"
              items={[
                { name: "Adobe Audition", icon: "/placeholder.svg", level: 8 },
                { name: "Pro Tools", icon: "/placeholder.svg", level: 6.5 },
                { name: "Logic Pro", icon: "/placeholder.svg", level: 7 }
              ]}
            />
          </div>
          
          {/* Workflow Section */}
          <div>
            <SectionHeading 
              title="My Workflow"
              subtitle="How I approach video editing projects"
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  phase: "01",
                  title: "Pre-Production",
                  steps: [
                    "Project briefing and goals definition",
                    "Creative concept development",
                    "Storyboarding and shot planning",
                    "Technical requirements assessment"
                  ]
                },
                {
                  phase: "02",
                  title: "Production",
                  steps: [
                    "Media management and organization",
                    "Rough cut assembly",
                    "Scene refinement and timing",
                    "Client feedback implementation"
                  ]
                },
                {
                  phase: "03",
                  title: "Post-Production",
                  steps: [
                    "Color grading and visual effects",
                    "Sound design and audio mixing",
                    "Motion graphics integration",
                    "Final delivery and archiving"
                  ]
                }
              ].map((phase, index) => (
                <motion.div 
                  key={index}
                  className="glass-card relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute top-0 right-0 bg-accent/20 text-accent p-3 text-xl font-bold">
                    {phase.phase}
                  </div>
                  
                  <div className="p-6 pt-16">
                    <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                    
                    <ul className="space-y-3">
                      {phase.steps.map((step, stepIndex) => (
                        <li 
                          key={stepIndex} 
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-accent mt-1">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Stack;
