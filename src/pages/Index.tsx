
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Github, Linkedin, Instagram, Mail } from "lucide-react";
import RippleButton from '@/components/ui/RippleButton';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();
  
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
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x7777ff),
      transparent: true,
      opacity: 0.6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.0005;
      
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
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Professional Video Editor
              </motion.span>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Luca S.
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                I specialize in creating visually stunning and seamless video productions. With years of experience and a passion for creativity, I bring stories to life, crafting innovative solutions in the dynamic world of video editing.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Link to="/contact">
                  <RippleButton variant="accent" size="lg">
                    Get in Touch
                  </RippleButton>
                </Link>
                <Link to="/projects">
                  <RippleButton variant="outline" size="lg">
                    View Projects
                  </RippleButton>
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <GitHub size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="glass-card p-6 md:p-8 relative overflow-hidden">
                {/* Animated gradient border effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-accent via-accent/20 to-accent rounded-xl animate-pulse" />
                <div className="absolute inset-0 bg-background/90 rounded-xl" />

                <div className="relative py-6">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-accent/20 animate-pulse absolute -inset-1" />
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-black overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                          alt="Luca S."
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-center text-gradient">About Me</h2>
                  
                  <p className="text-muted-foreground mb-6">
                    With over 6 years of experience in video editing, I've worked with brands, creators, and agencies to bring their visions to life. My approach combines technical expertise with creative storytelling.
                  </p>
                  
                  <div className="flex justify-center">
                    <Link to="/about" className="flex items-center text-accent hover:text-accent/80 transition-colors">
                      <span className="mr-2">Read more about me</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
