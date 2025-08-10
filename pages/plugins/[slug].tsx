import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { slugToPluginId } from '../../src/plugins/utils';
import { ALL_PLUGINS } from '../../src/plugins/registry';
import { usePluginStore } from '../../src/plugins/store';

interface PluginPageProps {
  pluginSlug: string;
}

export default function PluginPage({ pluginSlug }: PluginPageProps) {
  const router = useRouter();
  const { isInstalled } = usePluginStore();
  const [PluginComponent, setPluginComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlugin = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const pluginId = slugToPluginId(pluginSlug);
        if (!pluginId) {
          setError('Plugin not found');
          return;
        }

        const plugin = ALL_PLUGINS.find(p => p.id === pluginId);
        if (!plugin) {
          setError('Plugin not found');
          return;
        }

        if (!isInstalled(pluginId)) {
          setError('Plugin not installed');
          return;
        }

        // Dynamically import the plugin component
        const module = await plugin.component();
        setPluginComponent(() => module.default);
      } catch (err) {
        console.error('Failed to load plugin:', err);
        setError('Failed to load plugin');
      } finally {
        setIsLoading(false);
      }
    };

    if (pluginSlug) {
      loadPlugin();
    }
  }, [pluginSlug, isInstalled]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading plugin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Plugin Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          {error === 'Plugin not installed' && (
            <button
              onClick={() => router.push('/plugins')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Go to Plugin Marketplace
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!PluginComponent) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-400">Plugin not available</h1>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1e1e1e] text-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PluginComponent />
    </Suspense>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all possible plugin slugs
  const paths = [
    { params: { slug: 'volunteer' } },
    { params: { slug: 'research' } },
    { params: { slug: 'certs' } },
    { params: { slug: 'talks' } },
    { params: { slug: 'awards' } },
    { params: { slug: 'oss' } },
  ];

  return {
    paths,
    fallback: false // Set to false since we know all possible paths
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pluginSlug = params?.slug as string;

  return {
    props: {
      pluginSlug,
      title: 'Plugin'
    }
  };
};
