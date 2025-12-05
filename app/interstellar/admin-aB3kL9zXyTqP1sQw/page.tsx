'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [showPhotos, setShowPhotos] = useState(false);
  const [eventEnabled, setEventEnabled] = useState(false);

  async function updateToggle(field: 'show_photos' | 'event_enabled', value: boolean) {
    return fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    });
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin');
        const data = await res.json();

        setShowPhotos(data.show_photos ?? false);
        setEventEnabled(data.event_enabled ?? false);
      } catch (err) {
        console.error('Failed to load toggles:', err);
      }
    }

    load();
  }, []);

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Admin Controls</h1>

      {/* Show Photos Toggle */}
      <div className='flex items-center justify-between'>
        <span className='font-medium'>Show Guest Photos</span>
        <Toggle
          checked={showPhotos}
          onChange={async () => {
            const v = !showPhotos;
            setShowPhotos(v);
            await updateToggle('show_photos', v);
          }}
        />
      </div>

      {/* Enable Event Toggle */}
      <div className='flex items-center justify-between'>
        <span className='font-medium'>Enable Event</span>
        <Toggle
          checked={eventEnabled}
          onChange={async () => {
            const v = !eventEnabled;
            setEventEnabled(v);
            await updateToggle('event_enabled', v);
          }}
        />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
        checked ? 'bg-green-600' : 'bg-gray-400'
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ${
          checked ? 'translate-x-8' : ''
        }`}
      />
      <span
        className={`absolute right-2 text-sm font-bold ${checked ? 'text-white' : 'text-white'}`}
      >
        {checked ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
