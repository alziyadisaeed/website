import { cookies } from 'next/headers';
import { FileText, ExternalLink } from 'lucide-react';
import LeadStatusSelect from '@/components/admin/LeadStatusSelect';
import DeleteLeadButton from '@/components/admin/DeleteLeadButton';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const COUNTRY_NAMES: Record<string, string> = {
  sa: 'Saudi Arabia', ae: 'UAE', kw: 'Kuwait', qa: 'Qatar', bh: 'Bahrain',
  om: 'Oman', eg: 'Egypt', jo: 'Jordan', iq: 'Iraq', ye: 'Yemen',
  sd: 'Sudan', sy: 'Syria', lb: 'Lebanon', ps: 'Palestine', ly: 'Libya',
  dz: 'Algeria', ma: 'Morocco', tn: 'Tunisia', ru: 'Russia', other: 'Other',
};

const SPECIALTY_NAMES: Record<string, string> = {
  spec1: 'Ophthalmology', spec2: 'Orthopedics', spec3: 'Cardiology',
  spec4: 'Oncology', spec5: 'Neurology', spec6: 'Rehabilitation', other: 'Other',
};

interface LeadFile {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
}

interface Lead {
  _id: string;
  fullName: string;
  phone: string;
  country: string;
  specialty: string;
  notes?: string;
  files: LeadFile[];
  status: 'new' | 'contacted' | 'closed';
  source: 'home' | 'blog';
  locale: string;
  createdAt: string;
}

async function getLeads(): Promise<{ leads: Lead[]; total: number }> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');

  const res = await fetch(`${API_URL}/api/leads`, {
    headers: { cookie: cookieHeader },
    cache: 'no-store',
  });

  if (!res.ok) return { leads: [], total: 0 };
  return res.json();
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
};

export default async function LeadsPage() {
  const { leads, total } = await getLeads();

  const counts = {
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total</p>
        </div>
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {counts.new} New
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {counts.contacted} Contacted
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {counts.closed} Closed
          </span>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Applicant</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Country</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Specialty</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Files</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Date</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.fullName}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{lead.phone}</div>
                      {lead.notes && (
                        <div className="text-gray-400 text-xs mt-1 max-w-xs truncate italic">
                          {lead.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {COUNTRY_NAMES[lead.country] ?? lead.country}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {SPECIALTY_NAMES[lead.specialty] ?? lead.specialty}
                    </td>
                    <td className="px-6 py-4">
                      {lead.files.length === 0 ? (
                        <span className="text-gray-300 text-xs">—</span>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {lead.files.map((file) => (
                            <a
                              key={file.filename}
                              href={`${API_URL}/uploads/${file.filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#1A6DB5] hover:underline"
                            >
                              <FileText size={12} />
                              <span className="max-w-[120px] truncate">{file.originalName}</span>
                              <ExternalLink size={10} className="shrink-0" />
                            </a>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <LeadStatusSelect id={lead._id} current={lead.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      <div className="text-gray-300 mt-0.5">
                        {new Date(lead.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <DeleteLeadButton id={lead._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
