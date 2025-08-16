import React, { useEffect, useRef } from 'react';
import { X, Share2, Download, ExternalLink, Calendar, MapPin, Building, TrendingUp } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import SanityImage from './SanityImage';
import SanityImageGallery from './SanityImageGallery';
import type { SanityCaseStudy } from '../../types/sanity';

interface SanityCaseStudyPopupProps {
  caseStudy: SanityCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const SanityCaseStudyPopup: React.FC<SanityCaseStudyPopupProps> = ({
  caseStudy,
  isOpen,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key and outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Social sharing functions
  const shareOnTwitter = () => {
    if (!caseStudy) return;
    const text = `Check out this case study: ${caseStudy.title} - ${caseStudy.client}`;
    const url = `${window.location.origin}/case-studies/${caseStudy.slug.current}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    if (!caseStudy) return;
    const url = `${window.location.origin}/case-studies/${caseStudy.slug.current}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyToClipboard = async () => {
    if (!caseStudy) return;
    const url = `${window.location.origin}/case-studies/${caseStudy.slug.current}`;
    try {
      await navigator.clipboard.writeText(url);
      // You could show a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const downloadPDF = () => {
    // This would typically generate a PDF version of the case study
    // For now, we'll just open the case study page in a new tab
    if (!caseStudy) return;
    window.open(`/case-studies/${caseStudy.slug.current}`, '_blank');
  };

  const openFullCaseStudy = () => {
    if (!caseStudy) return;
    window.open(`/case-studies/${caseStudy.slug.current}`, '_blank');
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr || 'N/A';
    }
  };

  if (!isOpen || !caseStudy) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {caseStudy.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {caseStudy.client} • {caseStudy.industry}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Action Buttons */}
            <button
              onClick={shareOnTwitter}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              title="Share on Twitter"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Share on LinkedIn"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy link"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={downloadPDF}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={openFullCaseStudy}
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              title="Open full case study"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-8">
            
            {/* Featured Image */}
            {caseStudy.featuredImage && (
              <SanityImage
                image={caseStudy.featuredImage}
                alt={caseStudy.title}
                className="w-full h-64 rounded-lg"
                aspectRatio="video"
              />
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              {caseStudy.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{caseStudy.location}</div>
                  </div>
                </div>
              )}
              {caseStudy.duration && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{caseStudy.duration}</div>
                  </div>
                </div>
              )}
              {caseStudy.completedDate && (
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{formatDate(caseStudy.completedDate)}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Challenge */}
            {caseStudy.challenge && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  The Challenge
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {Array.isArray(caseStudy.challenge) ? (
                    <PortableText value={caseStudy.challenge} />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Solution
                </h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {Array.isArray(caseStudy.solution) ? (
                    <PortableText value={caseStudy.solution} />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {caseStudy.results && caseStudy.results.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Key Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary dark:text-sky-300 mb-1">
                        {result.metric}
                      </div>
                      <div className="text-gray-900 dark:text-white font-semibold text-sm mb-1">
                        {result.label}
                      </div>
                      {result.improvement && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {result.improvement}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 dark:from-brand-navy/20 dark:to-purple-900/20 rounded-lg p-6">
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed mb-4">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  {caseStudy.testimonial.authorImage && (
                    <SanityImage
                      image={caseStudy.testimonial.authorImage}
                      alt={caseStudy.testimonial.author}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {caseStudy.testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Preview */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Gallery
                </h3>
                <SanityImageGallery
                  images={caseStudy.gallery.slice(0, 6)}
                  columns={3}
                  showCaptions={false}
                  allowFullscreen={true}
                />
                {caseStudy.gallery.length > 6 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={openFullCaseStudy}
                      className="text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium"
                    >
                      View all {caseStudy.gallery.length} images
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Ready to Achieve Similar Results?
              </h3>
              <p className="text-white/90 mb-4">
                Let's discuss how we can help your organization succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.open('/contact', '_blank')}
                  className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Get Free Consultation
                </button>
                <button
                  onClick={openFullCaseStudy}
                  className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors font-medium"
                >
                  Read Full Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanityCaseStudyPopup;