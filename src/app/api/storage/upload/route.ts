import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { randomUUID } from 'crypto';
import { authOptions } from '@/lib/auth';
import { uploadToStorage } from '@/services/storage';

const PREFIX: Record<string, string> = {
  projects: 'projects',
  certificates: 'certificates',
  profile: 'profile',
  misc: 'misc',
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file');
  const folder = String(form.get('folder') ?? 'misc');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const key = `${PREFIX[folder] ?? 'misc'}/${randomUUID()}.${ext}`;
  const url = await uploadToStorage(key, Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url, key });
}
