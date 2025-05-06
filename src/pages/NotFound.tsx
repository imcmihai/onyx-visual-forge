
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RippleButton from "@/components/ui/RippleButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center glass-card p-12 max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-6 text-gradient">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <RippleButton variant="accent">
            Return to Home
          </RippleButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
