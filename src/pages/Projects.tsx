
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video } from "lucide-react";
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import RippleButton from '@/components/ui/RippleButton';
import * as THREE from 'three';

// Project categories
const categories = ['All', 'Commercial', 'Documentary', 'Music Video', 'Corporate'];

// Project data
const projectsData = [
  {
    id: 1,
    title: "Brand Commercial: Elevate",
    description: "A dynamic commercial for Elevate sportswear, featuring fast-paced editing and vibrant color grading to highlight their latest athletic collection.",
    imageUrl: "https://images.unsplash.com/photo-1574678720375-16a79ad13e10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Commercial",
    tags: ["Color Grading", "Motion Graphics"],
    link: "#"
  },
  {
    id: 2,
    title: "Documentary: Urban Explorers",
    description: "A short-form documentary following urban explorers as they discover abandoned architectural wonders, employing moody atmospherics and thoughtful pacing.",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Documentary",
    tags: ["Storytelling", "Sound Design"],
    link: "#"
  },
  {
    id: 3,
    title: "Music Video: Echo Chamber",
    description: "An experimental music video featuring abstract visuals and synchronized cuts, creating a hypnotic visual experience that complements the track.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Music Video",
    tags: ["VFX", "Music Sync"],
    link: "#"
  },
  {
    id: 4,
    title: "Corporate: Future Finance Summit",
    description: "Event highlight reel for a major financial technology conference, combining interviews, presentations, and networking moments into a cohesive narrative.",
    imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Corporate",
    tags: ["Interview Editing", "Motion Graphics"],
    link: "#"
  },
  {
    id: 5,
    title: "Commercial: Dream Away",
    description: "A luxury travel commercial showcasing exotic destinations with smooth transitions and cinematic color grading to evoke wanderlust.",
    imageUrl: "https://images.unsplash.com/photo-1518560423963-2146e7032df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Commercial",
    tags: ["Aerial Footage", "Color Grading"],
    link: "#"
  },
  {
    id: 6,
    title: "Documentary: Craftsmanship",
    description: "A mini-documentary series following artisans preserving traditional crafts, featuring intimate cinematography and thoughtful editing.",
    imageUrl: "https://images.unsplash.com/photo-1452802447250-470a88ac82bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Documentary",
    tags: ["Storytelling", "Interview Editing"],
    link: "#"
  },
];

const Projects = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter(project => project.category === selectedCategory);
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);
  
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
    
    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterials = Array(6).fill(0).map(() => {
      return new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
    });
    
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterials);
    scene.add(cubeMesh);
    
    // Create cube group for complex rotation
    const cubeGroup1 = new THREE.Group();
    const cubeGroup2 = new THREE.Group();
    const cubeGroup3 = new THREE.Group();
    
    // Clone cubes and add to groups
    for (let i = 0; i < 8; i++) {
      const clone = cubeMesh.clone();
      clone.scale.set(5, 5, 5);
      clone.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      cubeGroup1.add(clone);
    }
    
    for (let i = 0; i < 8; i++) {
      const clone = cubeMesh.clone();
      clone.scale.set(2, 2, 2);
      clone.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      cubeGroup2.add(clone);
    }
    
    scene.add(cubeGroup1, cubeGroup2, cubeGroup3);
    
    camera.position.z = 30;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      cubeGroup1.rotation.x += 0.001;
      cubeGroup1.rotation.y += 0.001;
      
      cubeGroup2.rotation.x += 0.002;
      cubeGroup2.rotation.y -= 0.001;
      
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
            title="My Projects"
            subtitle="A showcase of my video editing work across different genres"
            align="center"
          />
          
          {/* Project Introduction */}
          <motion.div 
            className="glass-card p-8 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-accent/20 p-3 rounded-full">
                <Video size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-gradient">Project Showcase</h2>
            </div>
            
            <p className="text-muted-foreground">
              Browse through my portfolio of video editing projects spanning various genres and styles. Each project represents a unique storytelling approach, technical challenge, and creative solution. Hover over any project to learn more about the editing process and techniques used.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                link={project.link}
                tags={project.tags}
              />
            ))}
          </div>
          
          {/* Contact CTA */}
          {filteredProjects.length > 0 && (
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground mb-6">
                Interested in working together on your next video project?
              </p>
              <RippleButton variant="accent" size="lg">
                Get in Touch
              </RippleButton>
            </motion.div>
          )}
          
          {/* No Projects Found */}
          {filteredProjects.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-xl mb-6">No projects found in this category.</p>
              <RippleButton onClick={() => setSelectedCategory('All')}>
                View All Projects
              </RippleButton>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Projects;
