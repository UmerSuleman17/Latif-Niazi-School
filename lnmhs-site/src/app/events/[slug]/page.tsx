import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, ArrowLeft, Clock, MapPin, Info } from 'lucide-react';
import { upcomingEvents } from '@/data/news';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return upcomingEvents.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = upcomingEvents.find(e => e.slug === slug);
  return {
    title: event ? `${event.title} | LNMHS Events` : 'Events | LNMHS',
    description: event?.description || 'Upcoming events at Latif Niazi Memorial Higher Secondary School',
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = upcomingEvents.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = upcomingEvents
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

  // Extract day and month if possible from "June 15, 2024" format
  let eventDay = "15";
  let eventMonth = "JUN";
  try {
    const parts = event.date.split(' ');
    if (parts.length >= 2) {
      eventMonth = parts[0].substring(0, 3).toUpperCase();
      eventDay = parts[1].replace(',', '');
    }
  } catch (e) {
    // fallback
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Event Hero */}
        <section className="bg-navy-900 py-20 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-navy-200 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-gold-400 transition-colors">News & Events</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news#events" className="hover:text-gold-400 transition-colors">Events</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate">{event.title}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0 bg-navy-800 border border-navy-700 p-6 rounded-2xl flex flex-col items-center justify-center min-w-[140px]">
                <span className="text-6xl font-bold text-gold-400 leading-none">{eventDay}</span>
                <span className="text-xl text-white uppercase mt-2 font-medium tracking-wider">{eventMonth}</span>
              </div>
              
              <div>
                <div className={`mb-4 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  event.status === 'upcoming' 
                    ? 'bg-sky-blue/20 text-sky-400 border border-sky-blue/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {event.status === 'upcoming' ? 'Upcoming Event' : 'Ongoing Event'}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <article className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-xl shadow-md p-8 border border-navy-100 mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Event Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg text-sky-blue mr-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-400 uppercase tracking-wider">Date</h3>
                  <p className="text-navy-900 font-medium text-lg">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-gold-50 rounded-lg text-gold-600 mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-400 uppercase tracking-wider">Time</h3>
                  <p className="text-navy-900 font-medium text-lg">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-red-50 rounded-lg text-cta-red mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-400 uppercase tracking-wider">Location</h3>
                  <p className="text-navy-900 font-medium text-lg">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-navy-50 rounded-lg text-navy-700 mr-4">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-400 uppercase tracking-wider">Status</h3>
                  <p className="text-navy-900 font-medium text-lg capitalize">{event.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="prose-like styling text-navy-700 leading-relaxed text-lg flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">About this Event</h3>
            {event.description ? (
              event.description.split('\n').map((paragraph, index) => (
                paragraph.trim() !== '' && <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>Join us for this exciting event at Latif Niazi Memorial Higher Secondary School. We look forward to seeing you there!</p>
            )}
          </div>
        </article>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="bg-white py-12 border-t border-navy-100">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Other Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEvents.map((e) => (
                  <Link href={`/events/${e.slug}`} key={e.id} className="group block bg-gray-50 rounded-lg overflow-hidden border border-navy-50 hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-xs text-gold-600 font-semibold px-2 py-1 bg-gold-50 rounded">{e.date.split(',')[0]}</div>
                        <div className={`text-xs px-2 py-1 rounded capitalize ${
                          e.status === 'upcoming' ? 'bg-sky-blue/10 text-sky-600' : 'bg-green-100 text-green-700'
                        }`}>
                          {e.status}
                        </div>
                      </div>
                      <h3 className="text-navy-900 font-semibold mb-2 group-hover:text-sky-blue transition-colors line-clamp-2">{e.title}</h3>
                      <div className="text-xs text-navy-500 flex items-center mb-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {e.time}
                      </div>
                      <div className="text-xs text-navy-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {e.location}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/news" className="inline-flex items-center text-sky-blue hover:text-navy-700 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News & Events
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
