import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  X,
  Building,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  Calendar,
  MapPin,
  Award,
  Target,
  Clock,
  BarChart3
} from "lucide-react";
import { useSafariModal } from "../hooks/useSafariModal";

interface CaseStudyData {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  duration: string;
  completedDate: string;
  challenge: string;
  solution: string;
  implementation: string[];
  results: {
    metric: string;
    label: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  tags: string[];
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

interface CaseStudyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyData | null;
}

export function CaseStudyPopup({ isOpen, onClose, caseStudy }: CaseStudyPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    if (isOpen && caseStudy) {
      setShouldRender(true);

      if (isSafari) {
        document.body.classList.add("modal-open-safari");
      } else {
        document.body.style.overflow = 'hidden';
      }

      gsap.killTweensOf([overlayRef.current, modalRef.current]);

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.killTweensOf([overlayRef.current, modalRef.current]);

      if (modalRef.current && overlayRef.current) {
        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 50,
          duration: 0.3,
          ease: "power2.in"
        });

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setShouldRender(false);
            if (isSafari) {
              document.body.classList.remove("modal-open-safari");
            } else {
              document.body.style.overflow = 'unset';
            }
          }
        });
      } else {
        setShouldRender(false);
        if (isSafari) {
          document.body.classList.remove("modal-open-safari");
        } else {
          document.body.style.overflow = 'unset';
        }
      }
    }

    return () => {
      if (isSafari) {
        document.body.classList.remove("modal-open-safari");
      } else {
        document.body.style.overflow = 'unset';
      }
      gsap.killTweensOf([overlayRef.current, modalRef.current]);
    };
  }, [isOpen, caseStudy, isSafari]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender || !caseStudy) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 flex items-center justify-center p-4 ${
        isSafari
          ? "safari-modal-container modal-overlay-safari"
          : "z-50"
      }`}
      onClick={onClose}
    >

      {!isSafari && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />}

      <div
        ref={modalRef}
        className={`relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ${
          isSafari ? "modal-content-safari" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={`relative ${caseStudy.bgGradient} p-6 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${caseStudy.color} bg-white/20`}>
              {caseStudy.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{caseStudy.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{caseStudy.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{caseStudy.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{caseStudy.completedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-8">

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary dark:text-sky-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Industry</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{caseStudy.industry}</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary dark:text-sky-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Project Duration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{caseStudy.duration}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-500" />
                Challenge
              </h3>
              <div 
                className="text-gray-600 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Solution
              </h3>
              <div 
                className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
              />

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Implementation Steps:</h4>
              <ul className="space-y-2">
                {caseStudy.implementation.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-sky-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary dark:text-sky-300">{index + 1}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                Results & Impact
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-sky-400/10 dark:to-sky-400/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-primary dark:text-sky-300 mb-1">{result.metric}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{result.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{result.improvement}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Client Testimonial</h3>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg leading-relaxed">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 dark:bg-sky-400/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary dark:text-sky-300" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{caseStudy.testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{caseStudy.testimonial.position}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies & Services</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 dark:bg-sky-400/20 text-primary dark:text-sky-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
