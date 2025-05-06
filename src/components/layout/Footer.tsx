
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-accent/20 rounded-full p-2 border border-accent/20">
                <span className="text-xl font-bold text-accent">LS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Luca S.</h1>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">VIDEO EDITOR</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground mt-4 max-w-md">
              Professional video editor specializing in commercial content, documentaries, and creative projects. Bringing stories to life through innovative visual storytelling.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium uppercase text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Me", path: "/" },
                { label: "Technical Stack", path: "/stack" },
                { label: "Projects", path: "/projects" },
                { label: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase text-white mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-muted-foreground">New York, NY</p>
              <p className="text-muted-foreground">United States</p>
              <p className="text-accent mt-2">luca@example.com</p>
              <p className="text-muted-foreground">+1 (212) 555-1234</p>
            </address>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Luca S. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
