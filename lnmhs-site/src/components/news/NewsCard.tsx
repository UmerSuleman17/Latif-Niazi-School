"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem, getCategoryColor } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden border border-navy-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
    >
      <Link href={`/news/${item.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
            {item.category}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-navy-500 mb-2">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        <Link href={`/news/${item.slug}`} className="block group/title mt-2">
          <h3 className="text-lg font-bold text-navy-900 line-clamp-2 group-hover/title:text-navy-700 transition-colors">
            {item.title}
          </h3>
        </Link>
        
        <p className="text-sm text-navy-600 mt-2 line-clamp-2 flex-grow">
          {item.excerpt}
        </p>
        
        <div className="mt-4 pt-4 border-t border-navy-50 flex items-center">
          <Link 
            href={`/news/${item.slug}`}
            className="inline-flex items-center text-sm font-semibold text-navy-700 hover:text-gold-500 transition-colors group/link"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
