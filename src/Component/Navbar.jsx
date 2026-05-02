import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'white',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>

      {/* Logo */}
      <span
        onClick={() => navigate('/')}
        style={{ fontSize: '22px', fontWeight: '800', color: '#6C63FF', cursor: 'pointer' }}>
        FreshHireX
      </span>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span
          onClick={() => navigate('/')}
          style={{ fontSize: '14px', color: '#555', cursor: 'pointer', fontWeight: '600' }}>
          Home
        </span>
        <span
          onClick={() => navigate('/joblist')}
          style={{ fontSize: '14px', color: '#555', cursor: 'pointer', fontWeight: '600' }}>
          Jobs
        </span>
        <button
          onClick={() => navigate('/login')}
          style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #ddd', background: 'transparent', cursor: 'pointer', fontSize: '14px', color: '#555', fontWeight: '600' }}>
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#6C63FF', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>
          Sign Up
        </button>
      </div>

    </div>
  )
}

export default Navbar