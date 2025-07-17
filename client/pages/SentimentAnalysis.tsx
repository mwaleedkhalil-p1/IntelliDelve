import { Brain, MessageSquare, BarChart, Zap, Users, Target } from "lucide-react";

export default function SentimentAnalysis() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Sentiment & Intent Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Advanced natural language processing for understanding customer emotions and intentions.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Deep Language Understanding
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our sentiment and intent analysis solution uses state-of-the-art NLP models to understand the nuances of human communication.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Advanced NLP Models</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sophisticated language processing capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Intent Recognition</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Accurate identification of user intentions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <BarChart className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Instant analysis of customer sentiment trends.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Users className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Customer Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Deep understanding of customer emotions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Zap className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Automated Response
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Smart response suggestions based on analysis.
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
                <li>• Multi-language support</li>
                <li>• Emotion detection</li>
                <li>• Context understanding</li>
                <li>• Trend analysis</li>
              </ul>
              <ul className="space-y-2">
                <li>• Custom model training</li>
                <li>• API integration</li>
                <li>• Real-time processing</li>
                <li>• Detailed analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}