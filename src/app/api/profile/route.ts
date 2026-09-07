import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json(store.profile);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const store = getStore();

    store.profile = { ...store.profile, ...body };
    saveStore(store);

    return NextResponse.json({ success: true, data: store.profile });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 });
  }
}
