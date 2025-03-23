
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Trophy, Home, LineChart, Wallet, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';
import { getCurrentUser, logout } from '@/lib/auth';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Pools', path: '/pools', icon: <Trophy size={18} /> },
    { name: 'Leaderboards', path: '/leaderboards', icon: <LineChart size={18} /> },
    { name: 'Wallet', path: '/wallet', icon: <Wallet size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300', 
      scrolled ? 'py-3 bg-white/90 shadow-sm backdrop-blur-lg' : 'py-4 bg-transparent'
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-bg font-bold shadow-md">
            SB
          </div>
          <h1 className="text-xl font-bold gradient-text">SoccerBet</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Authentication */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-1">
                <span className="text-sm font-medium">{user.username}</span>
                <span className="text-xs text-muted-foreground">${user.wallet.toFixed(2)}</span>
              </div>
              <Avatar className="h-9 w-9 transition-all border-2 border-primary/10 hover:border-primary/30">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground hover:text-foreground">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="gap-1">
                <Link to="/register">
                  Sign up
                  <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-lg animate-fade-in md:hidden">
          <div className="container py-8 flex flex-col gap-6">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 py-3 px-4 rounded-xl transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>
            
            <Separator />
            
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  className="mt-2 w-full flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-4">
                <Button asChild size="lg" className="gap-1">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-1">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Sign up
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
