'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export function FileUpload({ onUpload, accept, maxSize = 10 * 1024 * 1024, className = '' }: FileUploadProps) {
  const acceptedTypes = accept
    ? accept.split(',').reduce((acc: Record<string, string[]>, ext) => {
        const trimmed = ext.trim();
        if (trimmed === '.pdf') acc['application/pdf'] = ['.pdf'];
        if (trimmed === '.doc') acc['application/msword'] = ['.doc'];
        if (trimmed === '.docx') acc['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] = ['.docx'];
        if (trimmed === '.jpg' || trimmed === '.jpeg') acc['image/jpeg'] = ['.jpg', '.jpeg'];
        if (trimmed === '.png') acc['image/png'] = ['.png'];
        return acc;
      }, {})
    : undefined;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => onUpload(file));
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize,
    multiple: false,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      {...(getRootProps() as any)}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-gold bg-gold/10'
          : isDragReject
          ? 'border-red-500 bg-red-500/10'
          : 'border-white/20 hover:border-gold/50 hover:bg-white/5'
      } ${className}`}
    >
      <input {...getInputProps()} />
      <div className="text-4xl mb-3">📁</div>
      {isDragActive ? (
        <p className="text-gold font-medium">Drop the file here...</p>
      ) : isDragReject ? (
        <p className="text-red-400 font-medium">File type not accepted</p>
      ) : (
        <>
          <p className="text-white font-medium mb-1">Drag & drop a file here</p>
          <p className="text-sm text-gray-400">or click to select</p>
          {accept && (
            <p className="text-xs text-gray-500 mt-2">Accepted: {accept}</p>
          )}
        </>
      )}
    </motion.div>
  );
}
