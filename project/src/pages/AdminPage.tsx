import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogOut, Plus, Pencil, Trash2, X, Save, ArrowLeft, Mail, Phone, Building2, Calendar,
  LayoutGrid, Inbox, Lock, Loader2,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { supabase, type Project, type ContactSubmission } from '@/lib/supabase';
import { services } from '@/lib/data';

type Tab = 'projects' | 'submissions';

export default function AdminPage() {
  const { t, lang, dir } = useI18n();
  const navigate = useNavigate();
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as any);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess as any);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadProjects();
      loadSubmissions();
    }
  }, [session]);

  const loadProjects = async () => {
    setDataLoading(true);
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
    setDataLoading(false);
  };

  const loadSubmissions = async () => {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (data) setSubmissions(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(t('admin.loginerror'));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.confirmdelete'))) return;
    await supabase.from('projects').delete().eq('id', id);
    loadProjects();
  };

  const handleSave = async (project: Partial<Project>) => {
    if (project.id) {
      await supabase.from('projects').update(project).eq('id', project.id);
    } else {
      await supabase.from('projects').insert(project);
    }
    setShowForm(false);
    setEditingProject(null);
    loadProjects();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('admin.login')}</h1>
                <p className="text-sm text-gray-500">{t('admin.welcometext')}</p>
              </div>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('admin.email')}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('admin.password')}</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                {t('admin.signin')}
              </button>
            </form>

            <Link to="/" className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
              <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {t('admin.back')}
            </Link>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            {lang === 'en'
              ? 'You need an admin account. Create one via Supabase Auth to manage projects.'
              : 'تحتاج حساب إدارة. أنشئ حساباً عبر Supabase Auth لإدارة المشاريع.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900">{t('admin.title')}</h1>
              <span className="text-sm text-gray-400">({session.user.email})</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 font-medium">
                {t('admin.back')}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t('admin.signout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              tab === 'projects' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {t('admin.projects')}
          </button>
          <button
            onClick={() => setTab('submissions')}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              tab === 'submissions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            {t('admin.submissions')}
            {submissions.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{submissions.length}</span>
            )}
          </button>
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{projects.length} {lang === 'en' ? 'projects' : 'مشروع'}</p>
              <button
                onClick={() => { setEditingProject(null); setShowForm(true); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('admin.add')}
              </button>
            </div>

            {dataLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="relative h-40">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100"></div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {p.featured && <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded">★</span>}
                        {!p.published && <span className="px-2 py-0.5 bg-gray-600 text-white text-xs rounded">Draft</span>}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{lang === 'en' ? p.title_en : p.title_ar}</h3>
                      <p className="text-xs text-gray-500 mt-1">{p.category} • {p.year}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => { setEditingProject(p); setShowForm(true); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          {t('admin.edit')}
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {t('admin.delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submissions Tab */}
        {tab === 'submissions' && (
          <div>
            {submissions.length === 0 ? (
              <div className="text-center py-20">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t('admin.nosubmissions')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            s.form_type === 'quotation' ? 'bg-blue-100 text-blue-700' :
                            s.form_type === 'site-survey' ? 'bg-green-100 text-green-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {s.form_type}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(s.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{s.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{s.email}</span>
                          {s.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{s.phone}</span>}
                          {s.company && <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{s.company}</span>}
                        </div>
                        {s.service && <p className="mt-2 text-sm text-gray-600"><strong>Service:</strong> {s.service}</p>}
                        <p className="mt-2 text-sm text-gray-700">{s.message}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await supabase.from('contact_submissions').delete().eq('id', s.id);
                          loadSubmissions();
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingProject(null); }}
        />
      )}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: {
  project: Project | null;
  onSave: (p: Partial<Project>) => void;
  onCancel: () => void;
}) {
  const { t, lang } = useI18n();
  const [form, setForm] = useState({
    title_en: project?.title_en || '',
    title_ar: project?.title_ar || '',
    slug: project?.slug || '',
    category: project?.category || 'cctv',
    client_type_en: project?.client_type_en || '',
    client_type_ar: project?.client_type_ar || '',
    location_en: project?.location_en || '',
    location_ar: project?.location_ar || '',
    year: project?.year || new Date().getFullYear(),
    description_en: project?.description_en || '',
    description_ar: project?.description_ar || '',
    scope_en: (project?.scope_en || []).join('\n'),
    scope_ar: (project?.scope_ar || []).join('\n'),
    images: (project?.images || []).join('\n'),
    featured: project?.featured || false,
    published: project?.published ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      title_en: form.title_en,
      title_ar: form.title_ar,
      slug: form.slug || form.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      category: form.category,
      client_type_en: form.client_type_en || null,
      client_type_ar: form.client_type_ar || null,
      location_en: form.location_en || null,
      location_ar: form.location_ar || null,
      year: Number(form.year),
      description_en: form.description_en,
      description_ar: form.description_ar,
      scope_en: form.scope_en.split('\n').filter(Boolean),
      scope_ar: form.scope_ar.split('\n').filter(Boolean),
      images: form.images.split('\n').filter(Boolean),
      featured: form.featured,
      published: form.published,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center p-4 overflow-y-auto pt-20 pb-8">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            {project ? t('admin.edit') : t('admin.new')}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title (EN)</label>
              <input type="text" required value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title (AR)</label>
              <input type="text" required value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} dir="rtl"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated if empty"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm bg-white">
                {services.map((s) => <option key={s.slug} value={s.category}>{s.category}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Type (EN)</label>
              <input type="text" value={form.client_type_en} onChange={(e) => setForm({ ...form, client_type_en: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location (EN)</label>
              <input type="text" value={form.location_en} onChange={(e) => setForm({ ...form, location_en: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Client Type (AR)</label>
              <input type="text" dir="rtl" value={form.client_type_ar} onChange={(e) => setForm({ ...form, client_type_ar: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location (AR)</label>
              <input type="text" dir="rtl" value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (EN)</label>
            <textarea required rows={3} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (AR)</label>
            <textarea required rows={3} dir="rtl" value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('admin.scope')} (EN)</label>
              <textarea rows={4} value={form.scope_en} onChange={(e) => setForm({ ...form, scope_en: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('admin.scope')} (AR)</label>
              <textarea rows={4} dir="rtl" value={form.scope_ar} onChange={(e) => setForm({ ...form, scope_ar: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t('admin.images')}</label>
            <textarea rows={3} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })}
              placeholder="https://images.pexels.com/..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm resize-none" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600" />
              {t('admin.featured')}
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600" />
              {t('admin.published')}
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              {t('admin.save')}
            </button>
            <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors">
              {t('admin.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
