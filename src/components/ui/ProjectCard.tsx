
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  tags?: string[];
}

const ProjectCard = ({ 
  title, 
  description, 
  imageUrl, 
  link, 
  tags = [] 
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl glass-card group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Description and Link */}
      <div 
        className={`absolute inset-0 bg-black/90 backdrop-blur-sm p-6 flex flex-col justify-center transform transition-transform duration-500 ease-in-out ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h3 className="text-xl font-bold mb-3 text-accent">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-accent transition-colors mt-auto"
          >
            View Project <ExternalLink size={16} className="ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
