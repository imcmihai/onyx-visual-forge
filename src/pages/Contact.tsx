
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Github, Instagram, Linkedin } from "lucide-react";
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';
import * as THREE from 'three';

const Contact = () => {
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
    
    // Create spheres
    const createSphere = (radius: number, position: THREE.Vector3) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      return sphere;
    };
    
    const spheres = [
      createSphere(2, new THREE.Vector3(-10, 0, -20)),
      createSphere(4, new THREE.Vector3(10, -5, -15)),
      createSphere(3, new THREE.Vector3(0, 5, -25)),
    ];
    
    spheres.forEach(sphere => scene.add(sphere));
    
    camera.position.z = 20;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      spheres.forEach((sphere, i) => {
        // Make spheres move slightly in different patterns
        const time = Date.now() * 0.001;
        sphere.position.y = Math.sin(time * (i * 0.2 + 0.5)) * 2;
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
      });
      
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
            title="Let's Connect"
            subtitle="Get in touch for collaborations or inquiries about your video projects"
            align="center"
          />
          
          {/* Contact Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Info */}
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 text-gradient">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-2 rounded-full mt-1">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a href="mailto:luca@example.com" className="text-muted-foreground hover:text-accent transition-colors">
                        luca@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-2 rounded-full mt-1">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Location</p>
                      <p className="text-muted-foreground">New York, NY, United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-2 rounded-full mt-1">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a href="tel:+12125551234" className="text-muted-foreground hover:text-accent transition-colors">
                        +1 (212) 555-1234
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent/20 p-2 rounded-full mt-1">
                      <Clock size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Working Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                      <p className="text-muted-foreground">Weekend: By appointment</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-10">
                  <p className="font-medium mb-4">Connect on Social Media</p>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="bg-muted hover:bg-muted/70 transition-colors p-3 rounded-full"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="#" 
                      className="bg-muted hover:bg-muted/70 transition-colors p-3 rounded-full"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="#" 
                      className="bg-muted hover:bg-muted/70 transition-colors p-3 rounded-full"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <SectionHeading 
              title="FAQ"
              subtitle="Common questions about my video editing services"
              align="center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What types of video projects do you work on?",
                  answer: "I specialize in commercial videos, documentaries, music videos, corporate videos, and social media content. However, I'm open to discussing any video project regardless of type or genre."
                },
                {
                  question: "What is your typical turnaround time?",
                  answer: "Turnaround time varies based on project complexity, length, and my current workload. For standard projects, I typically deliver a first draft within 1-2 weeks. We'll establish a clear timeline during our initial consultation."
                },
                {
                  question: "Do you offer revisions?",
                  answer: "Yes, my standard packages include 2-3 rounds of revisions. Additional revisions can be arranged at an hourly rate. I'm committed to ensuring you're completely satisfied with the final result."
                },
                {
                  question: "How do we get started on a project?",
                  answer: "The first step is to reach out through the contact form with details about your project. I'll then schedule a consultation call to discuss your vision, requirements, and timeline before providing a customized quote."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Map or CTA Section */}
          <motion.div 
            className="mt-20 glass-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to bring your vision to life?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Whether you have a specific project in mind or just want to discuss possibilities, I'm here to help transform your ideas into compelling visual stories.
            </p>
            <div className="inline-block">
              <a href="mailto:luca@example.com">
                <div className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors">
                  <Mail size={20} />
                  <span className="font-medium">luca@example.com</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Contact;
