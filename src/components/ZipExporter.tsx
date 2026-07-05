import React, { useState } from 'react';
import { Download, Check, RefreshCw, FileArchive } from 'lucide-react';
import { motion } from 'motion/react';

export default function ZipExporter() {
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    setCompleted(false);
    try {
      // Trigger browser download by requesting the server-side export endpoint
      const response = await fetch('/api/export-zip');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'love-memories-hub.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setCompleted(true);
        setTimeout(() => setCompleted(false), 3000);
      } else {
        alert('Failed to pack the workspace. Make sure the server is fully running!');
      }
    } catch (err) {
      console.error(err);
      alert('Network error downloading the code package.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 md:p-8 rounded-3xl border border-rose-100 shadow-xs text-left space-y-4 max-w-xl mx-auto" id="zip-code-exporter">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl text-rose-500 shadow-xs">
          <FileArchive size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900">Export Entire Hub Source Code</h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            Download a fully prepared, offline-compatible **full-stack workspace ZIP archive** containing all features, styled assets, Express server proxies, and instructions to run locally!
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rose-200/30">
        <ul className="text-[10px] sm:text-xs text-gray-400 space-y-0.5 list-disc pl-4 text-left">
          <li>Complete React + Vite + TS SPA frontend</li>
          <li>Express server proxy for Gemini API keys security</li>
          <li>Tailwind CSS styling configuration</li>
        </ul>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white shadow-md transition-all cursor-pointer ${
            completed 
              ? 'bg-green-600 hover:bg-green-700' 
              : downloading 
              ? 'bg-rose-300 cursor-not-allowed' 
              : 'bg-rose-600 hover:bg-rose-700 hover:scale-[1.02]'
          }`}
        >
          {completed ? (
            <>
              <Check size={16} /> Ready in ZIP!
            </>
          ) : downloading ? (
            <>
              <RefreshCw size={16} className="animate-spin" /> Packing files...
            </>
          ) : (
            <>
              <Download size={16} /> Download Source Code (.zip)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
