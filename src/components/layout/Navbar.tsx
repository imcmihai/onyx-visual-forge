
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

interface NavLinkData {
  path: string;
  label: string;
}

const navLinks: NavLinkData[] = [
  { path: "/", label: "About Me" },
  { path: "/stack", label: "Stack" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            <div className="bg-accent/20 rounded-full p-2 border border-accent/20">
              <span className="text-2xl font-bold text-accent">LS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Luca S.</h1>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">VIDEO EDITOR</p>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `relative text-sm uppercase tracking-widest font-medium transition-colors
                  ${isActive 
                    ? 'text-accent after:content-[""] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:bg-accent' 
                    : 'text-muted-foreground hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white hover:text-accent transition-colors"
          >
            <span className="sr-only">Open menu</span>
            {isOpen ? (
              <X size={24} />
            ) : (
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-4 h-0.5 bg-current ml-auto"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-end">
              <button onClick={toggleMenu} className="text-white hover:text-accent">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[80vh] space-y-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-3xl font-bold transition-colors
                    ${isActive ? 'text-accent' : 'text-white hover:text-accent'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
