import { ImageResponse } from 'next/og'

export const alt = 'Redcliffe Digital, UK technology consultancy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Required so the image is generated once at build time under `output: 'export'`.
export const dynamic = 'force-static'

// Generated at build time. Uses the default system font rather than the brand
// face to keep the build offline-safe; see NEXT_STEPS.md to embed it later.
// Colours mirror the tokens in globals.css.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#12161C',
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, backgroundColor: '#E8734F' }} />
        <div style={{ display: 'flex', marginLeft: 18, fontSize: 30, color: '#E8E4DC' }}>
          <span style={{ fontWeight: 600 }}>Redcliffe</span>
          <span style={{ marginLeft: 10, color: '#9AA3AE' }}>Digital</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 64,
          lineHeight: 1.12,
          fontWeight: 600,
          color: '#E8E4DC',
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
          color: '#9AA3AE',
          borderTop: '1px solid #252C36',
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
