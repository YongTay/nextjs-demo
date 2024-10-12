import { useEffect, useRef } from 'react';

const useWakeLock = () => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          console.log('Wake Lock is active');
        } catch (err) {
          const error = err as Error;
          console.error(`${error.name}, ${error.message}`);
        }
      } else {
        console.log('Wake Lock API not supported');
      }
    };

    requestWakeLock();

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        if ('wakeLock' in navigator && !wakeLockRef.current) {
          try {
            wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
            console.log('Wake Lock is active again');
          } catch (err) {
            const error = err as Error;
            console.error(`${error.name}, ${error.message}`);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLockRef.current) {
        wakeLockRef.current.release()
          .then(() => {
            wakeLockRef.current = null;
            console.log('Wake Lock released');
          });
      }
    };
  }, []);
};

export default useWakeLock;
