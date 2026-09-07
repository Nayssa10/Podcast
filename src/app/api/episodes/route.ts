import { NextResponse } from 'next/server';
import { getStore, saveStore, Episode } from '@/lib/store';

export async function GET() {
  const store = getStore();
  return NextResponse.json(store.episodes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const store = getStore();

    const newEpisode: Episode = {
      id: body.id || `ep-${Date.now()}`,
      number: body.number || `EP ${store.episodes.length + 1}`.padStart(5, 'EP 0'),
      date: body.date || new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
      title: body.title,
      type: body.type || 'forensic',
      coverImage: body.coverImage || '/logo-clean.png',
      evidenceImage: body.evidenceImage || body.coverImage || '/ep1_library_cover.jpg',
      photoStrip1: body.photoStrip1 || '/ep1_library_cover.jpg',
      photoStrip2: body.photoStrip2 || '/ep3_forensic_cover.jpg',
      photoStrip3: body.photoStrip3 || body.coverImage || '/ep2_perfume_cover.jpg',
      description: body.description || '',
      url: body.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: body.duration || '00:00',
      status: body.status || 'published',
      bookDetails: body.bookDetails,
      forensicDetails: body.forensicDetails,
      snippet: body.snippet,
      annotations: body.annotations
    };

    store.episodes.unshift(newEpisode);
    saveStore(store);

    return NextResponse.json({ success: true, data: newEpisode });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear episodio' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const store = getStore();
    const index = store.episodes.findIndex(ep => ep.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Episodio no encontrado' }, { status: 404 });
    }

    store.episodes[index] = { ...store.episodes[index], ...body };
    saveStore(store);

    return NextResponse.json({ success: true, data: store.episodes[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar episodio' }, { status: 500 });
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
    store.episodes = store.episodes.filter(ep => ep.id !== id);
    saveStore(store);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar episodio' }, { status: 500 });
  }
}
