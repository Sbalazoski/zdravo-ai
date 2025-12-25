export default function ClipCard({ clip, onDelete, onDownload }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(clip.content)
    alert('✓ Copied to clipboard!')
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'transform 0.2s'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px', color: 'white' }}>
            {clip.title || 'Untitled'}
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              padding: '4px 8px',
              background: 'rgba(102, 126, 234, 0.2)',
              borderRadius: '4px',
              fontSize: '11px',
              color: 'white'
            }}>
              {clip.platform}
            </span>
            {clip.is_code && (
              <span style={{
                padding: '4px 8px',
                background: 'rgba(76, 175, 80, 0.2)',
                borderRadius: '4px',
                fontSize: '11px',
                color: 'white'
              }}>
                {clip.language || 'code'}
              </span>
            )}
            {clip.tags && clip.tags.map(tag => (
              <span key={tag} style={{
                padding: '4px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                fontSize: '11px',
                color: 'white'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <pre style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '1rem',
        borderRadius: '8px',
        fontSize: '13px',
        maxHeight: '150px',
        overflow: 'hidden',
        margin: '0 0 1rem 0',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        color: '#ddd'
      }}>
        {clip.content.slice(0, 200)}...
      </pre>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '12px', color: '#999' }}>
          {new Date(clip.created_at).toLocaleDateString()}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={copyToClipboard}
            style={{
              padding: '6px 12px',
              background: 'rgba(102, 126, 234, 0.2)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Copy
          </button>
          <button
            onClick={() => onDownload(clip)}
            style={{
              padding: '6px 12px',
              background: 'rgba(76, 175, 80, 0.2)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Download
          </button>
          <button
            onClick={() => onDelete(clip.id)}
            style={{
              padding: '6px 12px',
              background: 'rgba(244, 67, 54, 0.2)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
