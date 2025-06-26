import React, { useState, useRef } from 'react';
import { PrinterIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ResumeTemplateModern from './ResumeTemplateModern';
import ResumeTemplateClassic from './ResumeTemplateClassic';
import html2pdf from 'html2pdf.js';

const ResumePreview = ({ data, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const previewRef = useRef(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = previewRef.current;
    const opt = {
      margin: 1,
      filename: `${data.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Zoom Out"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Zoom In"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 transform rotate-180" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Print"
            >
              <PrinterIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Download PDF"
            >
              <ArrowDownTrayIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-4">
          <div
            ref={previewRef}
            className="mx-auto bg-white"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            {data.template === 'classic' ? (
              <ResumeTemplateClassic data={data} />
            ) : (
              <ResumeTemplateModern data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview; 