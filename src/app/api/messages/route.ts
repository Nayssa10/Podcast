import { NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json(store.messages);
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const store = getStore();

    const message = store.messages.find(m => m.id === id);
    if (!message) {
      return NextResponse.json({ error: 'Mensaje no encontrado' }, { status: 404 });
    }

    message.status = status;
    saveStore(store);

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar estado del mensaje' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const store = getStore();
    store.messages = store.messages.filter(m => m.id !== id);
    saveStore(store);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar mensaje' }, { status: 500 });
  }
}
