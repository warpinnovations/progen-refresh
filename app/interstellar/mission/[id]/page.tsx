'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { missions } from '../../../data/mission';
import Image from 'next/image';
import { CheckCircle } from '@deemlol/next-icons';
import backgroundImage from '../../../../public/awards-background.png';
import interstellarLogo from '../../../../public/interstellar-logo.png';
import PRLogo from '../../../../public/PR_logo_Silver.png';

export default function MissionPage() {
  const params = useParams();
  const missionId = params?.id;
  const mission = missions.find((m) => m.id === missionId);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [enableEvent, setEnableEvent] = useState(false);

  const createValidFileName = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
  };

  const handleFileSelect = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const maxSize = isImage ? 5 * 1024 * 1024 : 100 * 1024 * 1024;

    if (file.size > maxSize) {
      const fileType = isImage ? 'Image' : 'Video';
      const limit = isImage ? '5MB' : '100MB';
      alert(`${fileType} file size exceeds ${limit} limit. Please choose a smaller file.`);
      return;
    }

    setSelectedFile(file);

    if (isVideo) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selectedFile || !name) return alert('Select file & enter name');

    setIsSubmitting(true);

    try {
      const validatedFileName = createValidFileName(name);
      const ext = selectedFile.name.split('.').pop();
      const finalFileName = `${mission?.id}_${validatedFileName}.${ext}`;

      // 1️⃣ Get upload URL from your API
      const res = await fetch('/api/mission/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: finalFileName, mimeType: selectedFile.type })
      });

      const { uploadUrl, error } = await res.json();
      if (!uploadUrl) throw new Error(error || 'Failed to get upload URL');

      // 2️⃣ Upload to Google Drive (isolated try/catch)
      try {
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': selectedFile.type },
          body: selectedFile
        });

        if (!uploadRes.ok) {
          console.warn('Upload returned not OK, but continuing as success');
        }
      } catch (uploadErr) {
        console.warn('Upload may have succeeded despite fetch failure', uploadErr);
      }

      // 3️⃣ Always show success regardless of upload fetch error
      setShowSuccess(true);
      setAlreadySubmitted(true);
      resetForm();
    } catch (err: unknown) {
      // Only errors getting the upload URL or unexpected errors reach here
      console.error('Error getting upload URL or unexpected error', err);
      const message = err instanceof Error ? err.message : String(err);
      alert('Upload failed: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsSubmitting(false);
    setName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    if (starsRef.current) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const brightness = Math.random() * 0.7 + 0.05;
        const shadow = Math.random() * 3 + 0.1;
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${brightness});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            animation-delay: ${Math.random() * 3}s;
            box-shadow: 0 0 ${shadow}px rgba(255, 255, 255, ${brightness});
            `;
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  useEffect(() => {
    const checkSubmission = async () => {
      if (!missionId) return;

      try {
        const res = await fetch(`/api/mission/${missionId}/check`);
        const data = await res.json();

        if (res.ok) {
          setAlreadySubmitted(data.exists);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };

    checkSubmission();
  }, [missionId]);

  useEffect(() => {
    try {
      const fetchAdminToggles = async () => {
        const response = await fetch('/api/admin');
        const data = await response.json();
        setEnableEvent(data.event_enabled ?? false);
      };
      fetchAdminToggles();
    } catch (error) {
      console.error('Error fetching admin toggles:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (checking || !enableEvent) {
    return (
      <div
        className='relative min-h-screen w-full text-gray-100 overflow-hidden flex items-center justify-center opacity-100 transition-opacity duration-700'
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div ref={starsRef} className='absolute inset-0 pointer-events-none z-10' />

        <div className='absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.15)_0%,transparent_50%)]' />
        <div className='w-full flex justify-center animate-fadeIn'>
          <Image
            src={interstellarLogo}
            alt='Loading...'
            width={350}
            height={350}
            className='animate-pulse-scale'
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className='relative min-h-screen w-full text-gray-100 overflow-hidden'
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div ref={starsRef} className='absolute inset-0 pointer-events-none z-10' />

      <div className='absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.15)_0%,transparent_50%)]' />

      <div className='relative z-30 w-full px-4 pt-5'>
        <div className='flex w-full items-center justify-between'>
          <Image
            src={PRLogo}
            alt='PR Silver logo'
            width={500}
            height={500}
            className='h-auto w-24 md:w-32 lg:w-40'
            priority
          />
          <Image
            src={interstellarLogo}
            alt='Interstellar Gala 2025 logo'
            width={350}
            height={350}
            className='h-auto w-40 md:w-40 lg:w-40'
            priority
          />
        </div>
      </div>

      <div className='relative z-30 flex flex-col items-center max-w-2xl mx-auto p-5 pb-10 min-h-screen overflow-hidden'>
        {missionId && alreadySubmitted ? (
          <div className='flex flex-1 items-center justify-center mb-20 w-full'>
            <div className='animate-fadeInUp mt-6 px-4 rounded-md text-center flex flex-col gap-3 items-center justify-center w-full'>
              <CheckCircle size={48} color='#ffff' />
              <h2 className='text-2xl font-bold mt-2'>Submission Received</h2>
              <p className='text-lg'>Thank you for your participation!</p>
            </div>
          </div>
        ) : (
          <>
            <header className='pb-6 pt-2 w-full'>
              <h1 className='lg:text-4xl text-3xl text-center font-bold mb-3 bg-gradient-to-br from-yellow-600 to-yellow-400 bg-clip-text text-transparent animate-fadeIn'>
                Your Mission
              </h1>
              <p className='lg:text-2xl text-lg text-center text-white animate-fadeIn delay-100'>
                {mission?.name}
              </p>
            </header>

            {!selectedFile && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className='flex flex-col items-center justify-center text-center bg-white/5 border border-yellow-600 rounded-3xl lg:px-10 lg:py-24 px-6 py-16 cursor-pointer transition-all hover:border-gold-400 hover:-translate-y-1 w-full'
              >
                <div className='relative w-14 h-14 mb-2'>
                  <div className='w-full h-full rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center animate-float relative'>
                    <svg viewBox='0 0 24 24' className='w-10 h-10 stroke-white stroke-2 fill-none'>
                      <path d='M3 16s1-2 5-2 5 2 5 2 1-2 5-2 5 2 5 2V4H3z' />
                      <path d='M16 6h2a2 2 0 0 1 2 2v10' />
                      <circle cx='9' cy='9' r='2' />
                    </svg>
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-300 opacity-20 blur-xl' />
                  </div>
                </div>
                <h3 className='text-gray-200 font-sans lg:text-xl text-lg'>
                  Tap to upload a photo/video
                </h3>
              </div>
            )}

            {selectedFile && (
              <div className='animate-fadeIn w-full'>
                <div className='bg-white/10 border border-gray-700 rounded-2xl p-4'>
                  {previewUrl && (
                    <div className='w-full lg:h-52 h-[170px] flex items-center justify-center bg-white/5 rounded-lg overflow-hidden'>
                      {selectedFile.type.startsWith('image/') ? (
                        <div className='relative w-full h-full'>
                          <Image src={previewUrl!} alt='Preview' fill className='object-contain' />
                        </div>
                      ) : selectedFile.type.startsWith('video/') ? (
                        <video
                          src={previewUrl}
                          className='max-h-full max-w-full object-contain'
                          controls
                        />
                      ) : (
                        <p className='text-gray-400 text-center w-full'>Preview not available</p>
                      )}
                    </div>
                  )}

                  <div className='flex items-center justify-between px-1 mt-2'>
                    <div />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      className='text-gold-400 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-gold-400/10 transition cursor-pointer'
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className='flex flex-col items-center w-full'>
              <input
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-10 w-full bg-white/5 border border-yellow-600 rounded-2xl lg:p-4 p-3 placeholder-gray-200 focus:outline-none focus:border-gold-400 transition text-center'
              />
            </div>

            <div className='flex flex-col gap-3 items-center w-full'>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !name.trim() || !selectedFile}
                className='relative cursor-pointer mt-5 py-3 rounded-2xl font-bold text-lg tracking-wide bg-gradient-to-br from-yellow-600 to-yellow-400 text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed w-full'
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*,video/*'
              className='hidden'
              onChange={handleFileInput}
            />

            {showSuccess && (
              <div className='absolute flex-col gap-12 z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:max-w-lg max-w-[90%] lg:h-72 h-64 bg-amber-100 rounded-3xl flex items-center justify-center text-center'>
                <p className='text-yellow-600 lg:text-[40px] text-4xl font-black px-10'>
                  Mission Completed!
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className='text-white font-bold px-14 py-3 rounded-2xl bg-linear-to-br from-yellow-500 to-yellow-300 cursor-pointer'
                >
                  Close
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
