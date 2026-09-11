import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

export interface Episode {
  id: string;
  number: string;
  date: string;
  title: string;
  type: 'forensic' | 'book';
  coverImage: string;
  evidenceImage?: string;
  photoStrip1?: string;
  photoStrip2?: string;
  photoStrip3?: string;
  description: string;
  url: string;
  duration: string;
  status: 'published' | 'draft' | 'scheduled';
  bookDetails?: {
    title: string;
    author: string;
    description: string;
    coverIcon?: string;
    startDate?: string;
    endDate?: string;
    pages?: number | string;
    rating?: number;
    isRecommended?: boolean;
    formats?: {
      physical?: boolean;
      digital?: boolean;
      audiobook?: boolean;
    };
    sagaInfo?: string;
    opinion?: string;
    characters?: Array<{ name: string; role: string }>;
    tropeRatings?: {
      love?: number;
      anger?: number;
      sadness?: number;
      fantasy?: number;
      spicy?: number;
      laugh?: number;
      ending?: number;
    };
  };
  forensicDetails?: {
    criminologyDetails: string;
    keyPhysicalEvidence: string[];
    forensicFocus: string | string[];
    evidenceCaption?: string;
  };
  snippet?: {
    text: string;
    highlights: string[];
  };
  annotations?: Array<{
    text: string;
    position: string;
  }>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  emailSentToGmail?: boolean;
}

export interface HostProfile {
  name: string;
  subtitle: string;
  roleBadge: string;
  basicInfo: string;
  extraInfoText: string;
  investigationFocus: string;
  quote: string;
}

export interface SiteSettings {
  contactNotificationEmail: string;
  resendApiKey?: string;
  spotifyUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}

export interface StoreData {
  episodes: Episode[];
  messages: ContactMessage[];
  profile: HostProfile;
  settings: SiteSettings;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

const DEFAULT_DATA: StoreData = {
  episodes: [
    {
      id: 'ep-01',
      number: 'EP 01',
      date: '05 de Agosto, 2026',
      title: 'Episodio 1: Sombras en la Biblioteca',
      type: 'forensic',
      coverImage: '/ep1_library_cover.jpg',
      description: 'Analizamos el thriller romántico gótico del año, discutiendo la tensión entre los protagonistas y los métodos de criminalística forense que desvelan el misterio de la mansión Blackwood.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: '06:12',
      status: 'published',
      bookDetails: {
        title: 'La Sombra de Blackwood',
        author: 'G. H. Vance',
        description: 'Un oscuro romance gótico donde una joven institutriz desvela secretos familiares ocultos tras las paredes de la mansión, enfrentando una red de mentiras y pasiones prohibidas.',
        coverIcon: '🏰'
      },
      forensicDetails: {
        criminologyDetails: 'Análisis del estrangulamiento manual y reconstrucción de la trayectoria de caída desde la torre oeste de la mansión.',
        keyPhysicalEvidence: ['Cuerda de cáñamo con nudo marinero', 'Fragmentos de vidrio azul cobalto', 'Huellas de botas de montar en el lodo'],
        forensicFocus: 'Toxicología forense (arsénico) e identificación de fibras textiles.'
      },
      snippet: {
        text: '“¿Segura de que quieres abrir esa puerta, institutriz?”, me susurró al oído. Su respiración era cálida contra mi cuello helado, pero sus manos firmes revelaban una verdad diferente.”',
        highlights: ['institutriz', 'verdad diferente']
      },
      annotations: [
        { text: '¡ESTÁ OBSESIONADO! 🥀', position: '15%' },
        { text: 'plssssss 😭', position: '48%' },
        { text: 'no puedo con esto 💔', position: '78%' }
      ]
    },
    {
      id: 'ep-02',
      number: 'EP 02',
      date: '29 de Julio, 2026',
      title: 'Episodio 2: El Perfume de la Coartada',
      type: 'book',
      coverImage: '/ep2_perfume_cover.jpg',
      description: 'Exploramos la química del amor y el veneno. Una inmersión profunda en la literatura de misterio y romance clásico, analizando las técnicas reales de toxicología utilizadas para resolver crímenes pasionales.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      duration: '07:05',
      status: 'published',
      bookDetails: {
        title: 'El Veneno del Amor',
        author: 'Clara Thorne',
        description: 'Una intriga de época victoriana donde una perfumista de la alta sociedad utiliza esencias mortales para vengar a sus seres queridos, mientras un inspector sigue su rastro aromático.',
        coverIcon: '🧪'
      },
      forensicDetails: {
        criminologyDetails: 'Estudio toxicológico de envenenamiento sistemático. Clasificación de toxinas orgánicas y sintomatología de la víctima.',
        keyPhysicalEvidence: ['Frasco de perfume de cristal tallado', 'Manchas de cianuro de hidrógeno en la taza', 'Carta perfumada con trazas de belladona'],
        forensicFocus: 'Espectrometría de masas y cromatografía líquida de alta resolución.'
      },
      snippet: {
        text: '“El veneno no tiene olor para el hombre que ama con locura. Bebió el elixir sin vacilar, mirándome directo a los ojos como si supiera que aquel trago sería su último aliento.”',
        highlights: ['veneno', 'último aliento']
      },
      annotations: [
        { text: '¡QUÉ INTENSO! 🧪', position: '25%' },
        { text: 'lloro literal 🥺', position: '65%' }
      ]
    },
    {
      id: 'ep-03',
      number: 'EP 03',
      date: '22 de Julio, 2026',
      title: 'Episodio 3: Susurros Celestiales y Evidencia Física',
      type: 'forensic',
      coverImage: '/ep3_forensic_cover.jpg',
      description: 'Una reseña detallada sobre novelas de romance policiaco contemporáneo. Analizamos la balística reconstructiva en la narrativa frente a la realidad del laboratorio forense.',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      duration: '05:44',
      status: 'published',
      bookDetails: {
        title: 'Susurros de la Bala',
        author: 'Marcus Vance',
        description: 'Un tenso romance policial contemporáneo. Una agente del FBI y un detective de homicidios deben confiar el uno en el otro para atrapar a un asesino selectivo en las calles lluviosas de Seattle.',
        coverIcon: '🔍'
      },
      forensicDetails: {
        criminologyDetails: 'Reconstrucción balística tridimensional de la escena. Ángulo de disparo y trayectoria del proyectil en espacio cerrado.',
        keyPhysicalEvidence: ['Casquillo percutido de 9mm de latón', 'Estrías de bala compatibles con cañón estriado', 'Residuos de disparo (pólvora) en guante de cuero'],
        forensicFocus: 'Balística forense y microscopía electrónica de barrido.'
      },
      snippet: {
        text: '“La bala había atravesado la pared de ladrillos, pero lo que realmente me detuvo fue el residuo de pólvora en su guante de cuero. Su coartada era perfecta; mi corazón, un desastre.”',
        highlights: ['residuo de pólvora', 'un desastre']
      },
      annotations: [
        { text: '¡SE PUSO TENSO! 🔍', position: '20%' },
        { text: 'no me lo esperaba 😱', position: '55%' }
      ]
    }
  ],
  messages: [
    {
      id: 'msg-01',
      name: 'Victoria Vance',
      email: 'victoria@example.com',
      message: '¡Excelente el análisis sobre la mansión Blackwood! Me gustaría sugerir para el próximo episodio la novela "Cumbres Borrascosas" bajo una perspectiva de peritaje criminal.',
      createdAt: '2026-09-06T14:32:00.000Z',
      status: 'unread',
      emailSentToGmail: true
    }
  ],
  profile: {
    name: 'Nayssa Kristel',
    subtitle: 'Creadora & Conductora',
    roleBadge: 'voz principal, mente analítica, creadora.',
    basicInfo: 'Voz única y creadora de Team Supernova. Especialista en entrelazar la belleza de la literatura gótica con la cruda realidad de la investigación criminal.',
    extraInfoText: 'Como única creadora de Team Supernova, Nayssa fusiona el análisis literario profundo con la rigurosidad científica.',
    investigationFocus: 'Desentrañando el misterio de la página a la escena del crimen.',
    quote: 'Deep into that darkness peering, long I stood there wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.'
  },
  settings: {
    contactNotificationEmail: 'nayssakristel@gmail.com',
    resendApiKey: '',
    spotifyUrl: 'https://open.spotify.com',
    instagramUrl: 'https://instagram.com/teamsupernova',
    youtubeUrl: 'https://youtube.com',
    tiktokUrl: 'https://tiktok.com/@teamsupernova'
  }
};

let memoryStoreCache: StoreData | null = null;

function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.REDIS_REST_API_URL;
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.REDIS_REST_API_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

function getLocalStore(): StoreData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      memoryStoreCache = DEFAULT_DATA;
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryStoreCache = parsed;
    return parsed;
  } catch (error) {
    console.error('Error reading local store data:', error);
    memoryStoreCache = DEFAULT_DATA;
    return DEFAULT_DATA;
  }
}

function saveLocalStore(data: StoreData): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    memoryStoreCache = data;
  } catch (error) {
    console.error('Error writing local store data:', error);
  }
}

export async function getStore(): Promise<StoreData> {
  if (memoryStoreCache) {
    return memoryStoreCache;
  }

  const redis = getRedis();
  if (redis) {
    try {
      const redisPromise = redis.get<StoreData>('podcast_store_data');
      // Timeout after 1.2 seconds so it never freezes local or dev
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1200));
      const data = await Promise.race([redisPromise, timeoutPromise]);

      if (data && data.episodes && Array.isArray(data.episodes)) {
        memoryStoreCache = data;
        return data;
      }
      const localData = getLocalStore();
      redis.set('podcast_store_data', localData).catch(() => {});
      memoryStoreCache = localData;
      return localData;
    } catch (error) {
      console.error('Error accessing Redis store, using local fallback:', error);
    }
  }
  return getLocalStore();
}

export async function saveStore(data: StoreData): Promise<void> {
  memoryStoreCache = data;
  saveLocalStore(data);

  const redis = getRedis();
  if (redis) {
    redis.set('podcast_store_data', data).catch((error) => {
      console.error('Error background-saving to Redis store:', error);
    });
  }
}
