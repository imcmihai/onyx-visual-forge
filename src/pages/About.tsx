
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Video, Code, ExternalLink } from "lucide-react";
import SectionHeading from '@/components/ui/SectionHeading';
import RippleButton from '@/components/ui/RippleButton';
import * as THREE from 'three';

const About = () => {
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
    
    // Create torus
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -30;
    torus.rotation.x = 0.5;
    scene.add(torus);
    
    camera.position.z = 30;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.001;
      
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
            title="About Me"
            subtitle="Learn about my experience and background in video editing"
            align="center"
          />
          
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 h-full">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-accent/20 animate-pulse absolute -inset-1" />
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent to-black overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Luca S."
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-center text-gradient">Luca S.</h2>
                <p className="text-center text-sm text-accent mb-6">VIDEO EDITOR & MOTION DESIGNER</p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <User size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Based in</p>
                      <p className="font-medium">New York, USA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Video size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">6+ Years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <Code size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Specialties</p>
                      <p className="font-medium">Motion Graphics, Color Grading</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <RippleButton variant="accent" className="w-full">
                      <span className="flex items-center justify-center">
                        Download Resume
                        <ExternalLink size={16} className="ml-2" />
                      </span>
                    </RippleButton>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 text-gradient">My Journey</h3>
                
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    I'm a professional video editor with over 6 years of experience crafting compelling visual narratives for a diverse range of clients, from startups to established brands and creative agencies.
                  </p>
                  
                  <p>
                    My passion for video editing began during my time at the New York Film Academy, where I honed my technical skills while developing a keen eye for storytelling and visual composition. Since then, I've worked on numerous projects spanning commercials, documentaries, corporate videos, and social media content.
                  </p>
                  
                  <p>
                    What sets me apart is my ability to balance technical precision with creative vision. I believe that great video editing isn't just about cutting clips together—it's about creating an emotional journey for viewers through thoughtful pacing, transitions, and sound design.
                  </p>
                  
                  <p>
                    When I'm not in the editing room, I'm constantly exploring new techniques, staying updated with industry trends, and experimenting with emerging technologies to push the boundaries of what's possible in video production.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <h4 className="text-4xl font-bold text-accent mb-2">150+</h4>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </div>
                  
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <h4 className="text-4xl font-bold text-accent mb-2">45+</h4>
                    <p className="text-sm text-muted-foreground">Happy Clients</p>
                  </div>
                  
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <h4 className="text-4xl font-bold text-accent mb-2">6+</h4>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Experience Timeline */}
          <div className="mb-20">
            <SectionHeading 
              title="Professional Experience"
              subtitle="My journey as a video editor"
            />
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 h-full w-px bg-white/20 transform md:-translate-x-1/2" />
              
              {/* Timeline Items */}
              {[
                {
                  years: "2021 - Present",
                  position: "Senior Video Editor",
                  company: "Creative Minds Studio",
                  description: "Lead video editor for major brand campaigns and documentary projects, supervising a team of junior editors and motion designers.",
                },
                {
                  years: "2018 - 2021",
                  position: "Video Editor",
                  company: "VisualPulse Media",
                  description: "Created engaging content for social media platforms and edited promotional videos for various clients in the tech and fashion industries.",
                },
                {
                  years: "2016 - 2018",
                  position: "Junior Video Editor",
                  company: "NextGen Productions",
                  description: "Assisted senior editors in post-production workflows, color grading, and audio synchronization for corporate and commercial projects.",
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Circle */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 z-10" />
                  
                  {/* Timeline Year */}
                  <div className="md:w-1/2 p-4 text-center md:text-right md:pr-12">
                    <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {item.years}
                    </span>
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="glass-card md:w-1/2 p-6 md:pl-12">
                    <h3 className="text-xl font-bold">{item.position}</h3>
                    <p className="text-accent mb-3">{item.company}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <SectionHeading 
              title="Skills & Expertise"
              subtitle="Key areas of specialization"
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Video Editing",
                  description: "Expert in non-linear editing with seamless transitions, precise timing, and narrative flow.",
                  icon: "📹",
                },
                {
                  title: "Color Grading",
                  description: "Creating distinctive visual styles through advanced color correction and grading techniques.",
                  icon: "🎨",
                },
                {
                  title: "Motion Graphics",
                  description: "Designing eye-catching animations and kinetic typography for enhanced visual impact.",
                  icon: "✨",
                },
                {
                  title: "Sound Design",
                  description: "Implementing high-quality audio mixing, sound effects, and music synchronization.",
                  icon: "🔊",
                },
                {
                  title: "Visual Effects",
                  description: "Creating and integrating practical and digital effects for enhanced storytelling.",
                  icon: "💫",
                },
                {
                  title: "Project Management",
                  description: "Efficient workflow management, meeting deadlines, and client communication.",
                  icon: "📝",
                },
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
