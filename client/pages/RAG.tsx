import { Brain, Database, Search, Zap, RefreshCw, FileText } from "lucide-react";

export default function RAG() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Retrieval-Augmented Generation (RAG)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Enhanced AI generation capabilities with real-time information retrieval and context integration.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Intelligent Content Generation
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our RAG system combines the power of large language models with real-time data retrieval for accurate and contextual content generation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Knowledge Integration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Seamless integration of external knowledge sources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Context-Aware Retrieval</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Smart information retrieval based on context</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Zap className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Real-time Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Instant information retrieval and content generation.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <RefreshCw className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Dynamic Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Continuous learning and knowledge base updates.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <FileText className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Document Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced document processing and information extraction.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Contextual content generation</li>
                <li>• Real-time information retrieval</li>
                <li>• Multi-source knowledge integration</li>
                <li>• Automated fact-checking</li>
              </ul>
              <ul className="space-y-2">
                <li>• Custom knowledge base creation</li>
                <li>• Semantic search capabilities</li>
                <li>• Version control and history</li>
                <li>• API integration support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}