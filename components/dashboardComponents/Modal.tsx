"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'
import { AiOutlineFileExcel } from 'react-icons/ai'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadStatus('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setUploadStatus('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Por favor selecciona un archivo primero');
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus('Subiendo archivo...');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/extract`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      setUploadStatus('Archivo subido exitosamente');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setUploadStatus(`Error al subir el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title || 'Modal'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="p-6">
          {children || (
            <form onSubmit={handleSubmit}>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
                  isDragging ? 'border-orange-500 bg-orange-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <AiOutlineFileExcel className="mx-auto text-gray-400 dark:text-gray-300 text-4xl mb-2" />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Solo archivos CSV (MAX. 10MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                  id="fileUpload"
                />
                <label 
                  htmlFor="fileUpload" 
                  className="mt-4 inline-flex items-center px-4 py-2 bg-orange-100 text-orange-600 border border-orange-200 rounded-md cursor-pointer hover:bg-orange-200 dark:bg-gray-700 dark:text-orange-400 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  <FiUpload className="mr-2" />
                  Seleccionar archivo
                </label>
              </div>
              
              {fileName && (
                <div className="flex items-center p-2 mb-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <AiOutlineFileExcel className="text-green-600 dark:text-green-400 mr-2" size={20} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{fileName}</span>
                </div>
              )}
              
              {uploadStatus && (
                <div className={`p-2 mb-4 rounded text-sm ${
                  uploadStatus.includes('error') || uploadStatus.includes('Error') 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                    : uploadStatus.includes('exitosamente')
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {uploadStatus}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full inline-flex justify-center items-center rounded-md px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500 text-white'
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <FiUpload className="mr-2" />
                    Subir archivo
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal