import React from 'react';

export function Input({ className = '', type = 'text', ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
