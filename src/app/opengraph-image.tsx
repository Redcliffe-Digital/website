import { ImageResponse } from 'next/og'

export const alt = 'Redcliffe Digital, UK technology consultancy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Required so the image is generated once at build time under `output: 'export'`.
export const dynamic = 'force-static'

// Generated at build time. Uses the default system font rather than Fraunces to
// keep the build offline-safe; see NEXT_STEPS.md to embed the brand face later.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAF7',
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, backgroundColor: '#8B1E2D' }} />
        <div style={{ display: 'flex', marginLeft: 18, fontSize: 30, color: '#0F1419' }}>
          <span style={{ fontWeight: 600 }}>Redcliffe</span>
          <span style={{ marginLeft: 10, color: '#5C6470' }}>Digital</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 64,
          lineHeight: 1.12,
          fontWeight: 600,
          color: '#0F1419',
          maxWidth: 940,
          letterSpacing: '-0.02em',
        }}
      >
        Engineering systems where the cost of failure is measured in millions.
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 22,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#5C6470',
          borderTop: '1px solid #E8E5DE',
          paddingTop: 28,
        }}
      >
        <div style={{ display: 'flex' }}>UK technology consultancy</div>
        <div style={{ display: 'flex' }}>redcliffedigital.co.uk</div>
      </div>
    </div>,
    { ...size },
  )
}
