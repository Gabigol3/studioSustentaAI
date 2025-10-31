'use client';

import { cn } from '@/lib/utils';
import { Camera, Image as ImageIcon, UploadCloud } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from '../ui/button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) e.dataTransfer.dropEffect = 'copy';
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleCameraClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que o clique se propague para o div pai
    if (!disabled && cameraInputRef.current) {
        cameraInputRef.current.click();
    }
  };

  const handleGalleryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        className={cn(
          "w-full rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center transition-colors duration-300 cursor-pointer",
          isDragging ? "bg-primary/10 border-primary" : "bg-card hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="font-semibold text-foreground">Arraste e solte uma imagem aqui</p>
        <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
        <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button variant="outline" className="w-full" onClick={handleCameraClick} disabled={disabled}>
              <Camera className="mr-2 h-4 w-4" />
              Tirar Foto
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGalleryClick} disabled={disabled}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Escolher da Galeria
          </Button>
      </div>
    </div>
  );
}
