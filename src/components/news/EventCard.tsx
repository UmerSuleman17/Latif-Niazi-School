"use client";

import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { EventItem, getStatusColor } from "@/data/news";

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-shadow">
      <div className="bg-navy-900 p-4 sm:w-32 flex flex-col justify-center items-center text-center shrink-0">
        <span className="text-3xl font-bold text-gold-400">{event.day}</span>
        <span className="text-xs uppercase text-white tracking-wider mt-1">{event.month}</span>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {event.status !== 'upcoming' ? (
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          ) : (
            <div></div> // placeholder for flex layout if no badge
          )}
        </div>
        
        <Link href={`/events/${event.slug}`} className="block">
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
            {event.title}
          </h3>
        </Link>
        
        <p className="text-sm text-navy-600 mt-1 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-3">
          {event.time && (
            <div className="flex items-center text-xs text-navy-500">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {event.time}
            </div>
          )}
          {event.location && (
            <div className="flex items-center text-xs text-navy-500">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              {event.location}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <Link 
            href={`/events/${event.slug}`}
            className="inline-flex items-center text-sm font-semibold text-navy-700 hover:text-gold-500 transition-colors group/link"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
