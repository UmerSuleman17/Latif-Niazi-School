'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/lib/adminAuth';
import {
  getAdminNews, addNewsItem, updateNewsItem, deleteNewsItem,
  getAdminEvents, addEventItem, updateEventItem, deleteEventItem,
  getNotifications, addNotification, updateNotification, deleteNotification,
  generateId, slugify,
  type Notification
} from '@/lib/store';
import { newsItems as staticNews, upcomingEvents as staticEvents, newsCategories } from '@/data/news';
import type { NewsItem, EventItem } from '@/data/news';
import { LogOut, Plus, Trash2, Edit2, Bell, Newspaper, Calendar, Eye, EyeOff, X, Check, AlertCircle, ChevronDown } from 'lucide-react';

type Tab = 'notifications' | 'news' | 'events';

// ── Login Screen ───────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(pw)) {
      setError('Incorrect password. Please try again.');
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2244] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0a2244] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#DDA63A] text-2xl font-black">L</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0a2244]">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Latif Niazi Memorial Higher Secondary School</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a2244] text-sm"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0a2244] text-white py-3 rounded-xl font-semibold hover:bg-[#0d2d5e] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Notification Manager ────────────────────────────────────────────────
function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ message: '', linkText: '', linkHref: '' });

  const refresh = () => setNotifications(getNotifications());

  useEffect(() => { refresh(); }, []);

  const handleAdd = () => {
    if (!form.message.trim()) return;
    addNotification({
      id: generateId('notif'),
      message: form.message.trim(),
      linkText: form.linkText.trim() || undefined,
      linkHref: form.linkHref.trim() || undefined,
      active: true,
      createdAt: new Date().toISOString(),
    });
    setForm({ message: '', linkText: '', linkHref: '' });
    setShowForm(false);
    refresh();
  };

  const toggleActive = (n: Notification) => {
    updateNotification({ ...n, active: !n.active });
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0a2244]">Announcement Bar</h2>
          <p className="text-sm text-gray-500">Manages the scrolling announcement at the top of the News page.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#0a2244] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0d2d5e] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Notification
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-800">New Notification</h3>
          <textarea
            placeholder="Notification message (e.g. 'Admissions are now open for 2026-2027...')"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244] resize-none"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Link Text (e.g. Apply Now)"
              value={form.linkText}
              onChange={e => setForm({ ...form, linkText: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
            />
            <input
              type="text"
              placeholder="Link URL (e.g. /admissions)"
              value={form.linkHref}
              onChange={e => setForm({ ...form, linkHref: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex items-center gap-1.5 bg-[#0a2244] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d2d5e] transition-colors">
              <Check className="w-4 h-4" /> Post Notification
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No notifications yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`bg-white rounded-xl border p-4 flex items-start gap-4 ${n.active ? 'border-green-200' : 'border-gray-200 opacity-70'}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium">{n.message}</p>
                {n.linkText && <p className="text-xs text-[#0a2244] mt-1">Link: {n.linkText} → {n.linkHref}</p>}
                <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(n)}
                  title={n.active ? 'Deactivate' : 'Activate'}
                  className={`p-2 rounded-lg transition-colors ${n.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {n.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(n.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── News Manager ─────────────────────────────────────────────────────────
function NewsManager() {
  const [adminNews, setAdminNews] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Announcement' as NewsItem['category'],
    date: new Date().toISOString().split('T')[0], image: '', featured: false,
  });

  const refresh = () => setAdminNews(getAdminNews());
  useEffect(() => { refresh(); }, []);

  const resetForm = () => {
    setForm({ title: '', excerpt: '', content: '', category: 'Announcement', date: new Date().toISOString().split('T')[0], image: '', featured: false });
    setEditItem(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditItem(item);
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, category: item.category, date: item.date, image: item.image, featured: item.featured });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.excerpt.trim()) return;
    if (editItem) {
      updateNewsItem({ ...editItem, ...form, slug: slugify(form.title) });
    } else {
      addNewsItem({
        id: generateId('news'),
        slug: slugify(form.title),
        ...form,
        image: form.image.trim() || '/images/social/news.jpeg',
      });
    }
    resetForm();
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this news post?')) { deleteNewsItem(id); refresh(); }
  };

  const allNews = [...adminNews, ...staticNews];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0a2244]">News Posts</h2>
          <p className="text-sm text-gray-500">Admin-posted news appears at the top of the News page.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-[#0a2244] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0d2d5e] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-800">{editItem ? 'Edit News Post' : 'New News Post'}</h3>
          <input
            type="text" placeholder="Title *" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
          />
          <textarea
            placeholder="Excerpt / Short Description *" value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244] resize-none"
            rows={2}
          />
          <textarea
            placeholder="Full Content (HTML allowed)" value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244] resize-none"
            rows={4}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as NewsItem['category'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
              >
                {newsCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
              <input
                type="date" value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
              />
            </div>
          </div>
          <input
            type="text" placeholder="Image URL (leave blank for default)" value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-[#0a2244]" />
            Mark as Featured Story
          </label>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-1.5 bg-[#0a2244] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d2d5e] transition-colors">
              <Check className="w-4 h-4" /> {editItem ? 'Update Post' : 'Publish Post'}
            </button>
            <button onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {allNews.map((item, i) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">{item.category}</span>
                {item.featured && <span className="text-xs font-semibold px-2 py-0.5 bg-[#DDA63A]/20 text-[#8B6914] rounded-full">Featured</span>}
                {i < adminNews.length && <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Admin Post</span>}
              </div>
              <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
            {i < adminNews.length && (
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Event Manager ─────────────────────────────────────────────────────────
function EventManager() {
  const [adminEvents, setAdminEvents] = useState<EventItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', date: new Date().toISOString().split('T')[0],
    time: '', location: '', status: 'upcoming' as EventItem['status'],
  });

  const refresh = () => setAdminEvents(getAdminEvents());
  useEffect(() => { refresh(); }, []);

  const handleSave = () => {
    if (!form.title.trim()) return;
    const d = new Date(form.date);
    addEventItem({
      id: generateId('event'),
      slug: slugify(form.title),
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      day: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleString('en-US', { month: 'short' }),
      time: form.time || undefined,
      location: form.location || undefined,
      status: form.status,
    });
    setForm({ title: '', description: '', date: new Date().toISOString().split('T')[0], time: '', location: '', status: 'upcoming' });
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this event?')) { deleteEventItem(id); refresh(); }
  };

  const allEvents = [...adminEvents, ...staticEvents];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0a2244]">Events</h2>
          <p className="text-sm text-gray-500">Admin-posted events appear at the top of the Events section.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#0a2244] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0d2d5e] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-800">New Event</h3>
          <input
            type="text" placeholder="Event Title *" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]"
          />
          <textarea
            placeholder="Event Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244] resize-none"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
              <input type="text" placeholder="e.g. 09:00 AM - 01:00 PM" value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
              <input type="text" placeholder="e.g. Main School Ground" value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as EventItem['status'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2244]">
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-1.5 bg-[#0a2244] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0d2d5e] transition-colors">
              <Check className="w-4 h-4" /> Add Event
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {allEvents.map((evt, i) => (
          <div key={evt.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0a2244] rounded-xl flex flex-col items-center justify-center shrink-0">
              <span className="text-[#DDA63A] font-bold text-base leading-none">{evt.day}</span>
              <span className="text-white text-xs">{evt.month}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-gray-900 truncate">{evt.title}</p>
                {i < adminEvents.length && <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded-full shrink-0">Admin</span>}
              </div>
              {evt.location && <p className="text-xs text-gray-400">{evt.location}</p>}
            </div>
            {i < adminEvents.length && (
              <button onClick={() => handleDelete(evt.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Admin Page ─────────────────────────────────────────────────────
export default function AdminPage() {
  const { authed, loading, login, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>('notifications');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0a2244] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={login} />;
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'news', label: 'News Posts', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-[#0a2244] text-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#DDA63A] rounded-lg flex items-center justify-center">
            <span className="text-[#0a2244] font-black text-sm">L</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-none">LNMHS Admin</p>
            <p className="text-white/60 text-xs mt-0.5">Content Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-white/70 hover:text-white text-xs font-medium transition-colors">View Site ↗</a>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0a2244]">Content Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Post and manage school news, events, and announcements.</p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0a2244] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'notifications' && <NotificationManager />}
          {activeTab === 'news' && <NewsManager />}
          {activeTab === 'events' && <EventManager />}
        </div>
      </div>
    </div>
  );
}
