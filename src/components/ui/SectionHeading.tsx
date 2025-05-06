
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  align = 'left' 
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-xl mb-12 ${alignmentClasses[align]}`}>
      <motion.h2 
        className="text-4xl font-bold mb-4 text-gradient"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className="h-1 w-24 bg-accent mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? 80 : 100 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        style={{ 
          marginLeft: align === 'right' ? 'auto' : align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0
        }}
      />
    </div>
  );
};

export default SectionHeading;
