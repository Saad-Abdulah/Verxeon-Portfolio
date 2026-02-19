'use client'

import { useState, useEffect } from 'react'
import { getFileView } from '@/lib/appwrite'

interface StorageDiagnosticProps {
  fileId: string
  memberName: string
}

const StorageDiagnostic = ({ fileId, memberName }: StorageDiagnosticProps) => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [error, setError] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const testImage = async () => {
      try {
        const imageUrl = await getFileView(fileId)
        setUrl(imageUrl)
        
        const response = await fetch(imageUrl, { method: 'HEAD' })
        if (response.ok) {
          setStatus('success')
        } else {
          setStatus('error')
          setError(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    if (fileId) {
      testImage()
    }
  }, [fileId])

  if (!fileId) return null

  return (
    <div className="text-xs bg-gray-100 p-2 rounded mb-2">
      <div><strong>{memberName}:</strong></div>
      <div>File ID: {fileId}</div>
      <div>URL: {url}</div>
      <div>Status: 
        <span className={`ml-1 px-1 rounded ${
          status === 'success' ? 'bg-green-200 text-green-800' :
          status === 'error' ? 'bg-red-200 text-red-800' :
          'bg-yellow-200 text-yellow-800'
        }`}>
          {status}
        </span>
      </div>
      {error && <div className="text-red-600">Error: {error}</div>}
    </div>
  )
}

export default StorageDiagnostic
