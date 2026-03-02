'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';

export function FirebaseStatus() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{
    auth: boolean;
    db: boolean;
    storage: boolean;
  }>({
    auth: !!auth,
    db: !!db,
    storage: !!storage,
  });

  useEffect(() => {
    setMounted(true);
    // Update status after a short delay to catch async initializations
    const timer = setTimeout(() => {
      setStatus({
        auth: !!auth,
        db: !!db,
        storage: !!storage,
      });
      
      // eslint-disable-next-line no-console
      console.log('Firebase Status:', {
        auth: !!auth,
        db: !!db,
        storage: !!storage,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const allReady = status.auth && status.db && status.storage;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg text-sm font-mono ${
      allReady ? 'bg-green-100 border border-green-400 text-green-900' : 'bg-red-100 border border-red-400 text-red-900'
    }`}>
      <div className="font-bold mb-2">Firebase Status:</div>
      <div>🔥 Auth: {status.auth ? '✓' : '✗'}</div>
      <div>🔥 Firestore: {status.db ? '✓' : '✗'}</div>
      <div>🔥 Storage: {status.storage ? '✓' : '✗'}</div>
    </div>
  );
}
