import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';

export function useTrackRoute() {
  const pathname = usePathname();
  const { setLastVisitSite } = useAuth();

  useEffect(() => {
    if (!pathname) return;

    const isAuthRoute = pathname.includes('login') || pathname.includes('register');
    if (!isAuthRoute) {
      setLastVisitSite(pathname);
    }
  }, [pathname, setLastVisitSite]);
}
