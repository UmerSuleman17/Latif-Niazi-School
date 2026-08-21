"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AnnouncementBarProps {
  message: string;
  linkText?: string;
  linkHref?: string;
}

export default function AnnouncementBar({ message, linkText, linkHref }: AnnouncementBarProps) {
  return (
    <div className="bg-navy-900 rounded-xl p-4 md:p-6 flex items-center gap-4 flex-wrap w-full">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-3 h-3 rounded-full bg-cta-red animate-pulse" />
        <span className="text-cta-red font-bold text-xs tracking-wider uppercase">
          IMPORTANT NOTICE
        </span>
      </div>
      
      <p className="text-white/80 text-sm flex-1 min-w-[200px]">
        {message}
      </p>

      {linkText && linkHref && (
        <Link 
          href={linkHref}
          className="text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors flex items-center gap-1 group whitespace-nowrap"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
