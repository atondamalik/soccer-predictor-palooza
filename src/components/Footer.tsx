
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-bg font-bold shadow-md">
                SB
              </div>
              <h3 className="text-xl font-bold gradient-text">SoccerBet</h3>
            </div>
            <p className="text-muted-foreground">
              The premium soccer betting pool platform for fans to predict match outcomes and compete for exciting prizes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                {name: 'Home', path: '/'},
                {name: 'Pools', path: '/pools'},
                {name: 'Leaderboards', path: '/leaderboards'},
                {name: 'Wallet', path: '/wallet'},
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <ChevronRight size={14} className="text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Legal</h4>
            <ul className="space-y-3">
              {[
                {name: 'Terms of Service', path: '/terms'},
                {name: 'Privacy Policy', path: '/privacy'},
                {name: 'Responsible Gaming', path: '/responsible-gaming'},
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <ChevronRight size={14} className="text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground flex items-start gap-2">
                <Mail size={18} className="text-primary mt-0.5" />
                <span>support@soccerbet.com</span>
              </p>
              <div className="pt-3">
                <h5 className="font-medium mb-2">Newsletter</h5>
                <div className="flex gap-2">
                  <input type="email" placeholder="Enter your email" className="px-3 py-2 text-sm rounded-lg border border-gray-200 flex-grow focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  <Button size="sm">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SoccerBet. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
            <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
