"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: string;
  onClose?: () => void;
}

export function SidebarItem({ href, label, icon, onClose }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/" && pathname === "/search");

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group
        border border-transparent backdrop-blur-sm
        ${
          isActive
            ? "bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white shadow-lg border-[#3b82f6]/20"
            : "text-gray-300 hover:text-white hover:bg-[#1e1f30]/60 hover:border-[#2a2b3d]/50 hover:shadow-md"
        }
      `}
    >
      <span className={`text-lg transition-transform duration-300 ${
        isActive ? "scale-110" : "group-hover:scale-105"
      }`}>{icon}</span>
      <span className="transition-all duration-300">{label}</span>
    </Link>
  );
}