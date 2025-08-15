import React from 'react';

export function Card({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border p-6 shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-col space-y-1.5 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
}

export function CardAction({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex items-center justify-end ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`pt-0 ${className}`}
      {...props}
    />
  );
}

export function CardFooter({ className = '', ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex items-center pt-0 ${className}`}
      {...props}
    />
  );
}


