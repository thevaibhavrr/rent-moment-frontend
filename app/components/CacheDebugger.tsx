'use client';

import { useState, useEffect } from 'react';
import { getCacheInfo, clearCache, clearCategoriesCache, clearProductsCache } from '../data/products';
import { cache } from '../utils/cache';

interface CacheDebuggerProps {
  show?: boolean;
}

export default function CacheDebugger({ show = false }: CacheDebuggerProps) {
  const [cacheInfo, setCacheInfo] = useState<{ key: string; size: number; expiresAt: Date }[]>([]);
  const [isVisible, setIsVisible] = useState(show);

  const refreshCacheInfo = () => {
    const info = getCacheInfo();
    setCacheInfo(info);
  };

  useEffect(() => {
    refreshCacheInfo();
    const interval = setInterval(refreshCacheInfo, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${minutes}m ${seconds}s`;
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Show Cache Debugger"
      >
        🗄️
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Cache Debugger</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-3">
        {cacheInfo.length === 0 ? (
          <p className="text-xs text-gray-500">No cached data</p>
        ) : (
          cacheInfo.map((item, index) => (
            <div key={index} className="text-xs bg-gray-50 p-2 rounded">
              <div className="font-medium text-gray-800">{item.key}</div>
              <div className="text-gray-600">
                Size: {formatBytes(item.size)} | 
                Expires: {formatTimeRemaining(item.expiresAt)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => {
            clearCategoriesCache();
            refreshCacheInfo();
          }}
          className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          Clear Categories
        </button>
        <button
          onClick={() => {
            clearProductsCache();
            refreshCacheInfo();
          }}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Clear Products
        </button>
        <button
          onClick={() => {
            clearCache();
            refreshCacheInfo();
          }}
          className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          Clear All
        </button>
        <button
          onClick={refreshCacheInfo}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Cache expires in 10 minutes
      </div>
    </div>
  );
}
