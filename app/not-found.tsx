import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          background: '#F4F8FC',
          color: '#0F1F3D',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Page Not Found
          </h1>
          <p style={{ color: '#6B7A99', marginBottom: '2rem' }}>
            The page you are looking for does not exist.
          </p>
          <Link
            href="/ar"
            style={{
              display: 'inline-block',
              background: '#1A6DB5',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
