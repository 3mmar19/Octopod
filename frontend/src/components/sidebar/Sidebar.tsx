"use client";

import React, { useEffect } from 'react';
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { Twitter, Linkedin, Github, Home, Search } from 'lucide-react';

const sidebarItems = [
  { href: "/", label: "الرئيسية", icon: <Home className="w-5 h-5" /> },
  { href: "/search", label: "بحث", icon: <Search className="w-5 h-5" /> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Mobile Menu Button Component (moved from separate file)
export function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-lg bg-[#1e1f30] border border-[#2a2b3d] hover:bg-[#2a2b3d] transition-colors shadow-lg"
      aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 mb-1 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 mb-1 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </div>
    </button>
  );
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition-all duration-300 ease-in-out z-40 md:hidden`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Desktop Sidebar */}
      <aside className="fixed right-0 top-0 h-screen w-64 bg-[#141523]/90 backdrop-blur-md border-l border-[#2a2b3d]/50 flex-col hidden md:flex shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 right-0 z-50 w-72 h-screen flex-shrink-0 
          bg-[#141523]/95 backdrop-blur-md 
          border-l border-[#2a2b3d]/50 
          flex flex-col transition-all duration-300 ease-out
          shadow-2xl overflow-y-auto md:hidden
          ${
            isOpen 
              ? 'translate-x-0 opacity-100 scale-x-100' 
              : 'translate-x-full opacity-0 scale-x-95'
          }`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2b3d]/30 flex justify-center">
        <Link href="/" className="group" onClick={onClose}>
          <div className="w-24 h-24 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <img 
              src="/logoW.png" 
              alt="Octopod Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 pt-8">
        <div className="space-y-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClose={onClose}
            />
          ))}
        </div>
      </nav>

      {/* Footer - Simplified for the new design */}
      <div className="mt-auto p-4">
        <div className="text-center p-4 rounded-xl bg-[#1e1f30]/80 backdrop-blur-lg shadow-lg border border-[#2a2b3d]/50 transition-all duration-300">
          <div className="flex justify-center gap-3">
            {/* GitHub */}
            <a 
              href="https://github.com/thmanyah" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2a2b3d]/80 backdrop-blur-sm shadow-lg border border-[#3a3b4d]/50 text-gray-300 hover:text-white hover:bg-[#3a3b4d] hover:scale-110 hover:shadow-xl transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/company/thmanyah" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2a2b3d]/80 backdrop-blur-sm shadow-lg border border-[#3a3b4d]/50 text-gray-300 hover:text-blue-400 hover:bg-[#3a3b4d] hover:scale-110 hover:shadow-xl transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            
            {/* Twitter */}
            <a 
              href="https://twitter.com/thmanyah" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2a2b3d]/80 backdrop-blur-sm shadow-lg border border-[#3a3b4d]/50 text-gray-300 hover:text-blue-400 hover:bg-[#3a3b4d] hover:scale-110 hover:shadow-xl transition-all duration-300"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}