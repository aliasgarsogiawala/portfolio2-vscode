'use client';

import { motion } from 'framer-motion';
import { usePluginStore } from '../src/plugins/store';
import PluginMarketplace from '../src/plugins/components/PluginMarketplace';
import { Plugin } from '../src/plugins/types';
import { useState } from 'react';

export default function PluginsPage() {
  const { getInstalledCount } = usePluginStore();
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <PluginMarketplace onPluginSelect={setSelectedPlugin} />
      
      {/* Plugin Details Modal */}
      {selectedPlugin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#2d2d30] border border-gray-700 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-400">{selectedPlugin.name}</h2>
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 leading-relaxed">{selectedPlugin.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Version:</span>
                    <span className="ml-2 text-gray-300">{selectedPlugin.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Author:</span>
                    <span className="ml-2 text-gray-300">{selectedPlugin.author}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Category:</span>
                    <span className="ml-2 text-gray-300 capitalize">{selectedPlugin.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <span className="ml-2 text-gray-300">{selectedPlugin.size}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlugin.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#3c3c3c] text-xs text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <p className="text-sm text-gray-400">
                    This plugin adds a new page to your portfolio showcasing {selectedPlugin.category} information.
                    Once installed, it will appear in the sidebar and you can access it via the route {selectedPlugin.route}.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
