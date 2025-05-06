
import React from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  level: number; // 1-10
}

interface TechStackProps {
  title: string;
  items: TechItem[];
}

const TechStack: React.FC<TechStackProps> = ({ title, items }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-6 text-accent">{title}</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <img 
                    src={item.icon} 
                    alt={item.name} 
                    className="w-6 h-6 object-contain" 
                  />
                )}
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {item.level * 10}%
              </span>
            </div>
            
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/60"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.level * 10}%` }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
