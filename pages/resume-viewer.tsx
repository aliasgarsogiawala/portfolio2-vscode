import { useState } from 'react';
import Head from '@/components/Head';
import styles from '@/styles/ContactPage.module.css';

const ResumeViewer = () => {
  return (
    <>
      <Head title="Resume - PDF Viewer" />
      <div style={{ height: '100vh', width: '100%' }}>
        <iframe
          src="/resume/resume.pdf"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Resume PDF"
        />
      </div>
    </>
  );
};

export default ResumeViewer;
