import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border-color py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} ApartHub. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
