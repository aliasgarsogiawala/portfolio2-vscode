import Head from 'next/head';
import profile from '@/data/profile';

interface CustomHeadProps {
  title?: string;
}

const CustomHead = ({ title }: CustomHeadProps) => {
  const pageTitle = title ?? profile.name;
  const description = `${profile.name} — ${profile.role}. ${profile.bio}.`;
  const keywords = [
    profile.name.toLowerCase(),
    profile.firstName.toLowerCase(),
    profile.lastName.toLowerCase(),
    'web developer portfolio',
    `${profile.firstName.toLowerCase()} web developer`,
    `${profile.firstName.toLowerCase()} developer`,
    'full stack developer',
    'next.js developer',
    'typescript developer',
    'vscode-portfolio',
  ].join(', ');

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={`${profile.name}'s Portfolio`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={profile.ogImage} />
      <meta property="og:url" content={profile.siteUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${profile.name}'s Portfolio`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={profile.ogImage} />
    </Head>
  );
};

export default CustomHead;
