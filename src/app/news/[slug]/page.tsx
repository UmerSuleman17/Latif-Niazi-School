import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import { newsItems } from '@/data/news';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find(n => n.slug === slug);
  return {
    title: item ? `${item.title} | LNMHS News` : 'News | LNMHS',
    description: item?.excerpt || 'Latest news from Latif Niazi Memorial Higher Secondary School',
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedNews = newsItems
    .filter((n) => n.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Article Hero */}
        <section className="bg-navy-900 py-20 md:py-28 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <nav className="flex items-center gap-2 text-sm text-navy-200 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/news" className="hover:text-gold-400 transition-colors">News & Events</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate">{item.title}</span>
            </nav>

            <div className="mb-4 inline-block px-3 py-1 bg-gold-500 text-navy-900 text-sm font-semibold rounded-full">
              {item.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {item.title}
            </h1>
            
            <div className="flex items-center text-white/60">
              <Calendar className="w-5 h-5 mr-2" />
              <time dateTime={item.date}>{item.date}</time>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <article className="max-w-4xl mx-auto py-12 px-4">
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg relative w-full aspect-video">
            <Image 
              src={item.image} 
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          <div className="prose-like styling text-navy-700 leading-relaxed text-lg flex flex-col gap-6">
            {item.content ? (
              item.content.split('\n').map((paragraph, index) => (
                paragraph.trim() !== '' && <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{item.excerpt}</p>
            )}
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="bg-white py-12 border-t border-navy-100">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Related News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((newsItem) => (
                  <Link href={`/news/${newsItem.slug}`} key={newsItem.id} className="group block bg-gray-50 rounded-lg overflow-hidden border border-navy-50 hover:shadow-md transition-shadow">
                    <div className="relative h-40">
                      <Image 
                        src={newsItem.image}
                        alt={newsItem.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gold-600 font-semibold mb-2">{newsItem.category}</div>
                      <h3 className="text-navy-900 font-semibold line-clamp-2 mb-2 group-hover:text-sky-blue transition-colors">{newsItem.title}</h3>
                      <div className="text-xs text-navy-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {newsItem.date}
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
