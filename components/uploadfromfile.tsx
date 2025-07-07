'use client';

import { useState } from 'react';

export default function UploadFromFileButton() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadFromFile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload-from-file', {
        method: 'POST',
      });

      const result = await res.json();
      if (res.ok) {
        setStatus(`✅ Uploaded ${result.inserted.length} records`);
      } else {
        setStatus(`❌ ${result.error}`);
      }
    } catch (err) {
      setStatus('❌ Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={uploadFromFile}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Uploading...' : 'Upload JSON from File'}
      </button>
      {status && (
        <p className={`mt-2 text-sm ${status.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
          {status}
        </p>
      )}
    </div>
  );
}
