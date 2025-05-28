import React from 'react';
import { Camera } from 'lucide-react';

interface ImageUploadProps {
  maxImages: number;
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ maxImages, images, onImageUpload }) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: maxImages }, (_, index) => (
          <div 
            key={index} 
            className={`
              relative aspect-square border border-gray-300 rounded-lg overflow-hidden
              ${!images[index] ? 'hover:border-blue-500 transition-colors' : ''}
            `}
          >
            {images[index] ? (
              <>
                <img 
                  src={images[index]} 
                  alt={`Upload ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm">
                    COVER
                  </div>
                )}
              </>
            ) : (
              <label 
                htmlFor={`image-upload-${index}`} 
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              >
                <Camera className="w-8 h-8 text-gray-400 mb-1" />
                {index === 0 && !images[0] && (
                  <span className="text-xs text-gray-500">Add Photo</span>
                )}
              </label>
            )}
            <input
              type="file"
              id={`image-upload-${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => onImageUpload(e, index)}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-red-500">
        *This field is mandatory
      </div>
    </div>
  );
};

export default ImageUpload;