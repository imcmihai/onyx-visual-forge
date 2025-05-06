
import { useState } from 'react';
import RippleButton from './RippleButton';
import { toast } from '@/components/ui/sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      
      <div className="mt-6 space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
        />
      </div>
      
      <div className="mt-8">
        <RippleButton
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </RippleButton>
      </div>
    </form>
  );
};

export default ContactForm;
