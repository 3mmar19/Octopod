"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClose?: () => void;
}

export function SidebarItem({ href, label, icon, onClose }: SidebarItemProps) {
  const pathname = usePathname();
  // Update isActive condition to correctly identify when we're on the search page
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`
        flex items-center gap-3 px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 group
        border border-transparent backdrop-blur-sm
        ${
          isActive
            ? "bg-[#3b82f6] text-white shadow-lg border-[#3b82f6]/20"
            : "text-gray-300 hover:text-white hover:bg-[#1e1f30]/60 hover:border-[#2a2b3d]/50 hover:shadow-md"
        }
      `}
    >
      <div className={`transition-transform duration-300 ${
        isActive ? "scale-110" : "group-hover:scale-105"
      }`}>{icon}</div>
      <span className="transition-all duration-300">{label}</span>
    </Link>
  );
}