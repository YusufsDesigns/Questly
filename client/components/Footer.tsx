// app/components/Footer.tsx
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="flex max-sm:flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Questly</h3>
            <p className="text-sm text-gray-400">
              The ultimate fantasy RPG built on blockchain technology.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4"
          >
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2">Explore</h4>
              <ul className="space-y-1">
                <FooterLink href="#">Quests</FooterLink>
                <FooterLink href="#">Characters</FooterLink>
                <FooterLink href="#">Marketplace</FooterLink>
                <FooterLink href="#">Leaderboard</FooterLink>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-2">Resources</h4>
              <ul className="space-y-1">
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">Tutorials</FooterLink>
                <FooterLink href="#">Whitepaper</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
              <h4 className="text-sm font-bold text-gray-300 mb-2">Community</h4>
              <ul className="space-y-1">
                <FooterLink href="#">Discord</FooterLink>
                <FooterLink href="#">Twitter</FooterLink>
                <FooterLink href="#">Telegram</FooterLink>
                <FooterLink href="#">Medium</FooterLink>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-gray-500 mb-2 md:mb-0">
            © 2025 Questly. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-gray-500 hover:text-primary">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <a 
        href={href} 
        className="text-xs text-gray-500 hover:text-primary transition-colors duration-200"
      >
        {children}
      </a>
    </li>
  );
}