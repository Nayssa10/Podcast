import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const store = await getStore();
  return NextResponse.json(store.profile, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const store = await getStore();

    store.profile = { ...store.profile, ...body };
    await saveStore(store);

    return NextResponse.json({ success: true, data: store.profile });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 });
  }
}
