import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0F1F3D] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-bold text-lg leading-tight">Dr. Saeed Admin</h1>
          <p className="text-white/50 text-xs mt-1">{session.user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors text-sm"
          >
            <LayoutDashboard size={16} />
            Articles
          </Link>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors text-sm"
          >
            <PlusCircle size={16} />
            New Article
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
