'use client';

import { useEffect, useState } from 'react';

export function FirebaseDebugger() {
  const [debugInfo, setDebugInfo] = useState<{
    windowExists: boolean;
    envKeys: Record<string, boolean>;
    fbModuleImported: boolean;
  } | null>(null);

  useEffect(() => {
    // This runs on the client
    const info = {
      windowExists: typeof window !== 'undefined',
      envKeys: {
        apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      },
      fbModuleImported: true,
    };

    setDebugInfo(info);

    // eslint-disable-next-line no-console
    console.log('=== FIREBASE DEBUG INFO ===');
    // eslint-disable-next-line no-console
    console.log('Window exists:', info.windowExists);
    // eslint-disable-next-line no-console
    console.log('Env keys available:', info.envKeys);
    // eslint-disable-next-line no-console
    console.log('All env values:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }, []);

  if (!debugInfo) return null;

  const allEnvReady = Object.values(debugInfo.envKeys).every(v => v);

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg text-xs font-mono max-w-xs z-50 bg-slate-900 text-white border border-slate-700">
      <div className="font-bold mb-2">🔧 Firebase Debug</div>
      <div>Window: {debugInfo.windowExists ? '✓' : '✗'}</div>
      <div>Env Keys: {allEnvReady ? '✓ All' : '✗ Missing'}</div>
      <div className="text-xs mt-2 max-h-40 overflow-auto">
        <details>
          <summary>Details</summary>
          <pre className="text-xs">{JSON.stringify(debugInfo, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}
