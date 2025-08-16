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
        flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 group
        ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-300 hover:text-white hover:bg-white/5"
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