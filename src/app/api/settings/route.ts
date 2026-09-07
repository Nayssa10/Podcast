import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json(store.settings);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const store = getStore();

    store.settings = { ...store.settings, ...body };
    saveStore(store);

    return NextResponse.json({ success: true, data: store.settings });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 });
  }
}
