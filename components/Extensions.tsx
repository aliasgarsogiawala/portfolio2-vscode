'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { VscExtensions, VscSearch, VscClose, VscCheck, VscAdd, VscCloudDownload } from 'react-icons/vsc';
import { usePluginStore } from '@/src/plugins/store';
import { ALL_PLUGINS } from '@/src/plugins/registry';
import { Plugin } from '@/src/plugins/types';

import styles from '@/styles/Extensions.module.css';

interface ExtensionsProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Extensions({ isOpen, onClose }: ExtensionsProps) {
  const [activeTab, setActiveTab] = useState<'installed' | 'marketplace'>('installed');
  const [searchQuery, setSearchQuery] = useState('');
  const { installedPlugins, install, uninstall, isInstalled } = usePluginStore();

  const filteredPlugins = ALL_PLUGINS.filter(plugin =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const installedPluginObjects = ALL_PLUGINS.filter(plugin => 
    installedPlugins.includes(plugin.id)
  );

  const handlePluginAction = (plugin: Plugin) => {
    if (isInstalled(plugin.id)) {
      uninstall(plugin.id);
    } else {
      install(plugin.id);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 350, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className={styles.extensionsPanel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <VscExtensions size={16} className={styles.headerIcon} />
          <h2 className={styles.title}>Extensions</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            <VscClose size={16} />
          </button>
        )}
      </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'marketplace' ? styles.active : ''}`}
              onClick={() => setActiveTab('marketplace')}
            >
              <VscAdd size={16} />
              Marketplace
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'installed' ? styles.active : ''}`}
              onClick={() => setActiveTab('installed')}
            >
              <VscCheck size={16} />
              Installed ({installedPlugins.length})
            </button>
          </div>

          {/* Search */}
          <div className={styles.searchContainer}>
            <VscSearch size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search extensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            {activeTab === 'marketplace' && (
              <div className={styles.marketplace}>
                {filteredPlugins.map((plugin, index) => (
                  <motion.div
                    key={plugin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={styles.extensionCard}
                  >
                    <div className={styles.extensionHeader}>
                      <div className={styles.extensionIcon}>
                        <div className={styles.iconPlaceholder}>
                          {plugin.icon === 'Heart' && '❤️'}
                          {plugin.icon === 'FileText' && '📄'}
                          {plugin.icon === 'Award' && '🏆'}
                          {plugin.icon === 'Mic' && '🎤'}
                          {plugin.icon === 'Trophy' && '🏆'}
                          {plugin.icon === 'GitBranch' && '🌿'}
                        </div>
                      </div>
                      <div className={styles.extensionInfo}>
                        <h3 className={styles.extensionName}>{plugin.name}</h3>
                        <p className={styles.extensionAuthor}>{plugin.author}</p>
                      </div>
                    </div>
                    
                    <p className={styles.extensionDescription}>{plugin.description}</p>
                    
                    <div className={styles.extensionMeta}>
                      <div className={styles.rating}>
                        <span>⭐</span>
                        <span>{plugin.rating}</span>
                      </div>
                      <div className={styles.downloads}>
                        <VscCloudDownload size={12} />
                        <span>{plugin.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePluginAction(plugin)}
                      className={`${styles.actionButton} ${
                        isInstalled(plugin.id) ? styles.uninstall : styles.install
                      }`}
                    >
                      {isInstalled(plugin.id) ? 'Uninstall' : 'Install'}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'installed' && (
              <div className={styles.installed}>
                {installedPluginObjects.length === 0 ? (
                  <div className={styles.emptyState}>
                    <VscAdd size={48} className={styles.emptyIcon} />
                    <h3 className={styles.emptyTitle}>No Extensions Installed</h3>
                    <p className={styles.emptyDescription}>Browse the marketplace to install extensions</p>
                    <button
                      onClick={() => setActiveTab('marketplace')}
                      className={styles.browseButton}
                    >
                      Browse Marketplace
                    </button>
                  </div>
                ) : (
                  <div className={styles.extensionsList}>
                    {installedPluginObjects.map((plugin, index) => (
                      <motion.div
                        key={plugin.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={styles.installedExtension}
                      >
                        <div className={styles.extensionHeader}>
                          <div className={styles.extensionIcon}>
                            <div className={styles.iconPlaceholder}>
                              {plugin.icon === 'Heart' && '❤️'}
                              {plugin.icon === 'FileText' && '📄'}
                              {plugin.icon === 'Award' && '🏆'}
                              {plugin.icon === 'Mic' && '🎤'}
                              {plugin.icon === 'Trophy' && '🏆'}
                              {plugin.icon === 'GitBranch' && '🌿'}
                            </div>
                          </div>
                          <div className={styles.extensionInfo}>
                            <h3 className={styles.extensionName}>{plugin.name}</h3>
                            <p className={styles.extensionAuthor}>{plugin.author}</p>
                          </div>
                        </div>
                        
                        <p className={styles.extensionDescription}>{plugin.description}</p>
                        
                        <button
                          onClick={() => handlePluginAction(plugin)}
                          className={`${styles.actionButton} ${styles.uninstall}`}
                        >
                          Uninstall
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
  );
}
