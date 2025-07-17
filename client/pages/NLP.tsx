import { MessageSquare, Brain, Search, FileText, Zap, Database } from "lucide-react";
import React from "react";

export default function NLP() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Natural Language Processing (NLP)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Advanced text analysis and understanding capabilities powered by state-of-the-art language models.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Language Understanding
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our NLP solutions leverage cutting-edge machine learning models to understand and process human language with high accuracy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Text Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced text processing and understanding capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Semantic Search</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Context-aware information retrieval</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <FileText className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Document Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automated extraction and analysis of information from documents.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Zap className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Real-time Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Instant analysis and response generation for text inputs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Database className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Knowledge Base
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Structured information extraction and organization.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Content analysis and categorization</li>
                <li>• Sentiment analysis</li>
                <li>• Named entity recognition</li>
                <li>• Text summarization</li>
              </ul>
              <ul className="space-y-2">
                <li>• Language translation</li>
                <li>• Question answering</li>
                <li>• Topic modeling</li>
                <li>• Text generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}