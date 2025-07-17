import { FileText, Search, Brain, Scan, Eye, Database } from "lucide-react";
import React from "react";

export default function DocumentIntelligence() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Document Intelligence & OCR
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Advanced document processing and analysis powered by AI and machine learning technology.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Intelligent Document Processing
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our document intelligence solution combines OCR technology with AI to extract, analyze, and understand information from various document types.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Scan className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Advanced OCR</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">High-accuracy text extraction from any document</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">AI-Powered Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Intelligent content understanding and classification</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Eye className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Visual Recognition
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced recognition of layouts, tables, and images.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Search className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Smart Search
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Intelligent search across processed documents.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Database className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Data Extraction
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automated extraction of key information and insights.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Capabilities
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Multi-language support</li>
                <li>• Handwriting recognition</li>
                <li>• Form processing</li>
                <li>• Table extraction</li>
              </ul>
              <ul className="space-y-2">
                <li>• Document classification</li>
                <li>• Template matching</li>
                <li>• Data validation</li>
                <li>• Automated workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}