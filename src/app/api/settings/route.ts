import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = await getStore();
  return NextResponse.json(store.settings);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const store = await getStore();

    store.settings = { ...store.settings, ...body };
    await saveStore(store);

    return NextResponse.json({ success: true, data: store.settings });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 });
  }
}
