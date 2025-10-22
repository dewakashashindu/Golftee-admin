"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen splash page in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (!hasSeenSplash) {
      // First visit - show splash
      router.push('/splash');
    } else {
      // Return visit - go directly to home
      router.push('/home');
    }
  }, [router]);

  // Loading screen while redirecting
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f7a04 0%, #13a905ff 50%, #16a34a 100%)',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.3)',
          borderTop: '3px solid white',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Loading GolfTee Admin Portal...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}