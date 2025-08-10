'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PluginId } from './types';
import { safeLocalStorageGet, safeLocalStorageSet } from './utils';
import { ALL_PLUGINS } from './registry';

const STORAGE_KEY = 'portfolio-plugins-installed';

interface PluginStore {
  installedPlugins: PluginId[];
  install: (id: PluginId) => void;
  uninstall: (id: PluginId) => void;
  isInstalled: (id: PluginId) => boolean;
  getInstalledCount: () => number;
}

const PluginContext = createContext<PluginStore | undefined>(undefined);

interface PluginProviderProps {
  children: ReactNode;
}

export function PluginProvider({ children }: PluginProviderProps) {
  const [installedPlugins, setInstalledPlugins] = useState<PluginId[]>([]);

  // Load installed plugins from localStorage on mount
  useEffect(() => {
    const saved = safeLocalStorageGet<PluginId[]>(STORAGE_KEY, []);
    setInstalledPlugins(saved);
  }, []);

  // Save to localStorage whenever installedPlugins changes
  useEffect(() => {
    safeLocalStorageSet(STORAGE_KEY, installedPlugins);
    
    // Update the registry to reflect installed state
    ALL_PLUGINS.forEach(plugin => {
      plugin.isInstalled = installedPlugins.includes(plugin.id);
      plugin.installDate = plugin.isInstalled ? new Date().toISOString() : null;
    });
  }, [installedPlugins]);

  const install = (id: PluginId) => {
    setInstalledPlugins(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const uninstall = (id: PluginId) => {
    setInstalledPlugins(prev => prev.filter(pluginId => pluginId !== id));
  };

  const isInstalled = (id: PluginId): boolean => {
    return installedPlugins.includes(id);
  };

  const getInstalledCount = (): number => {
    return installedPlugins.length;
  };

  const value: PluginStore = {
    installedPlugins,
    install,
    uninstall,
    isInstalled,
    getInstalledCount,
  };

  return (
    <PluginContext.Provider value={value}>
      {children}
    </PluginContext.Provider>
  );
}

export function usePluginStore(): PluginStore {
  const context = useContext(PluginContext);
  if (context === undefined) {
    throw new Error('usePluginStore must be used within a PluginProvider');
  }
  return context;
}
