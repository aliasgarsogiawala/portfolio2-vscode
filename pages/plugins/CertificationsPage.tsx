'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Shield, Plus, CheckCircle, Clock } from 'lucide-react';
import { Certification } from '../../src/plugins/types';

const sampleCertifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Solutions Architect Professional',
    provider: 'Amazon Web Services',
    issueDate: '2023-08-15',
    credentialId: 'AWS-SAP-2023-12345',
    verifyLink: 'https://aws.amazon.com/verification',
    logoUrl: '/logos/aws.svg',
    expiryDate: '2026-08-15'
  },
  {
    id: '2',
    name: 'Certified Kubernetes Application Developer',
    provider: 'Cloud Native Computing Foundation',
    issueDate: '2023-05-20',
    credentialId: 'CKAD-2023-67890',
    verifyLink: 'https://training.linuxfoundation.org/certification/verify/',
    logoUrl: '/logos/kubernetes.svg',
    expiryDate: '2026-05-20'
  },
  {
    id: '3',
    name: 'Professional Scrum Master I',
    provider: 'Scrum.org',
    issueDate: '2022-11-10',
    credentialId: 'PSM1-2022-54321',
    verifyLink: 'https://scrum.org/certificates',
    logoUrl: '/logos/scrum.svg'
  },
];

export default function CertificationsPage() {
  const [certifications] = useState<Certification[]>(sampleCertifications);

  const activeCerts = certifications.filter(cert => 
    !cert.expiryDate || new Date(cert.expiryDate) > new Date()
  );
  
  const expiringSoon = certifications.filter(cert => {
    if (!cert.expiryDate) return false;
    const expiryDate = new Date(cert.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow && expiryDate > new Date();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCertStatus = (cert: Certification) => {
    if (!cert.expiryDate) return 'permanent';
    const expiryDate = new Date(cert.expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expiryDate <= now) return 'expired';
    if (expiryDate <= threeMonthsFromNow) return 'expiring';
    return 'active';
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Certifications</h1>
              <p className="text-gray-400">Professional certifications and achievements</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Active Certifications</span>
              </div>
              <span className="text-2xl font-bold">{activeCerts.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">Expiring Soon</span>
              </div>
              <span className="text-2xl font-bold">{expiringSoon.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Total Earned</span>
              </div>
              <span className="text-2xl font-bold">{certifications.length}</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const status = getCertStatus(cert);
            const statusColors = {
              active: 'border-green-500 bg-green-500/10',
              expiring: 'border-yellow-500 bg-yellow-500/10',
              expired: 'border-red-500 bg-red-500/10',
              permanent: 'border-blue-500 bg-blue-500/10'
            };

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#2d2d30] border-2 rounded-lg p-6 hover:border-blue-500 transition-colors ${statusColors[status]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{cert.name}</h3>
                      <p className="text-gray-400 text-sm">{cert.provider}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      status === 'active' ? 'bg-green-600 text-green-100' :
                      status === 'expiring' ? 'bg-yellow-600 text-yellow-100' :
                      status === 'expired' ? 'bg-red-600 text-red-100' :
                      'bg-blue-600 text-blue-100'
                    }`}>
                      {status === 'permanent' ? 'Permanent' :
                       status === 'active' ? 'Active' :
                       status === 'expiring' ? 'Expiring Soon' :
                       'Expired'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Issued: {formatDate(cert.issueDate)}</span>
                  </div>
                  
                  {cert.expiryDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Expires: {formatDate(cert.expiryDate)}</span>
                    </div>
                  )}

                  {cert.credentialId && (
                    <div className="text-sm">
                      <span className="text-gray-400">Credential ID: </span>
                      <span className="text-gray-300 font-mono">{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {cert.verifyLink && (
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Certification
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Expiring Soon Alert */}
        {expiringSoon.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-yellow-500/10 border border-yellow-500 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-yellow-400">Certifications Expiring Soon</h3>
            </div>
            <p className="text-gray-300 mb-3">
              The following certifications will expire within 3 months. Consider renewing them:
            </p>
            <ul className="space-y-1">
              {expiringSoon.map(cert => (
                <li key={cert.id} className="text-sm text-gray-300">
                  • {cert.name} - Expires {formatDate(cert.expiryDate!)}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
