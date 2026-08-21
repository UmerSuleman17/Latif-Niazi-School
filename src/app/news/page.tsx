"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/news/NewsCard";
import EventCard from "@/components/news/EventCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import AnnouncementBar from "@/components/news/AnnouncementBar";
import { newsItems as staticNews, upcomingEvents as staticEvents, newsCategories, getCategoryColor } from "@/data/news";
import { getAdminNews, getAdminEvents, getActiveNotification } from "@/lib/store";
import type { NewsItem, EventItem } from "@/data/news";
import type { Notification } from "@/lib/store";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [allNews, setAllNews] = useState<NewsItem[]>(staticNews);
  const [allEvents, setAllEvents] = useState<EventItem[]>(staticEvents);
  const [activeNotif, setActiveNotif] = useState<Notification | null>(null);

  useEffect(() => {
    const adminNews = getAdminNews();
    const adminEvents = getAdminEvents();
    const notif = getActiveNotification();
    setAllNews([...adminNews, ...staticNews]);
    setAllEvents([...adminEvents, ...staticEvents]);
    setActiveNotif(notif);
  }, []);

  // Get the first featured story
  const featuredStory = allNews.find(item => item.featured);

  // Filter news items based on category and search query
  const filteredNews = allNews.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchLower) ||
      item.excerpt.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const displayedNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <PageHero 
          title="What's Happening at Our School" 
          eyebrow="SCHOOL NEWS & EVENTS" 
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'News & Events', href: '/news' }
          ]} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col gap-12 md:gap-16">
          
          {/* Announcement Bar */}
          <section>
            <AnnouncementBar
              message={activeNotif?.message ?? "Admissions for the Academic Year 2026-2027 are now open. Apply before the deadline to secure a seat."}
              linkText={activeNotif?.linkText ?? "Apply Now"}
              linkHref={activeNotif?.linkHref ?? "/admissions"}
            />
          </section>

          {/* Featured Story */}
          {featuredStory && (
            <section>
              <div className="bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-sm flex flex-col lg:flex-row group">
                <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto">
                  <Image
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(featuredStory.category)}`}>
                      {featuredStory.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-navy-700 transition-colors">
                    {featuredStory.title}
                  </h2>
                  <p className="text-navy-600 mb-6 text-lg">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-navy-500 mb-8">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={featuredStory.date}>
                      {new Date(featuredStory.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div>
                    <Link 
                      href={`/news/${featuredStory.slug}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-sm"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* News Grid Section */}
          <section id="news-grid" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Latest Updates</h2>
              
              <div className="relative w-full md:w-72 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-navy-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-navy-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-shadow text-sm"
                />
              </div>
            </div>

            <div className="mb-8">
              <CategoryFilter 
                categories={newsCategories} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </div>

            {filteredNews.length > 0 ? (
              <>
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedNews.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        layoutId={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <NewsCard item={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button 
                      onClick={handleLoadMore}
                      className="inline-flex items-center px-6 py-3 border-2 border-navy-900 text-navy-900 font-semibold rounded-lg hover:bg-navy-900 hover:text-white transition-colors"
                    >
                      Load More Stories
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl border border-navy-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-navy-300" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">No Updates Found</h3>
                <p className="text-navy-600 mb-6">
                  We couldn't find any news matching your current filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex px-6 py-2 bg-navy-100 text-navy-900 font-medium rounded-lg hover:bg-navy-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* Upcoming Events Section */}
          <section>
            <div className="flex items-center justify-between mb-8 border-t border-navy-100 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900">Upcoming Events</h2>
              <Link href="/events" className="text-navy-700 font-semibold hover:text-gold-500 transition-colors flex items-center gap-1">
                View Calendar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {allEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-navy-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-navy-300" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">No Upcoming Events</h3>
                <p className="text-navy-600">
                  There are no scheduled events at the moment. Please check back later.
                </p>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
