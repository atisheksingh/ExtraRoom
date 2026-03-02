import { auth, db, storage } from '@/lib/firebase';

export async function GET() {
  return Response.json({
    firebase: {
      auth: !!auth,
      db: !!db,
      storage: !!storage,
      timestamp: new Date().toISOString(),
    },
    message: auth && db && storage ? 'Firebase initialized successfully' : 'Firebase initialization incomplete',
  });
}
