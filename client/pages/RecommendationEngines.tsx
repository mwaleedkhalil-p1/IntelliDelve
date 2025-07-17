import { Cog, Target, Users, Zap, LineChart, Database } from "lucide-react";

export default function RecommendationEngines() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Recommendation Engines
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Intelligent recommendation systems powered by machine learning for personalized user experiences.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Personalized Recommendations
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our recommendation engines use advanced algorithms to deliver highly personalized suggestions based on user behavior and preferences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">User Behavior Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Deep understanding of user preferences and patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Processing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Instant recommendation updates based on actions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <LineChart className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Performance Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Detailed insights into recommendation effectiveness.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Database className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Data Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Seamless integration with existing data sources.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Cog className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Customization Options
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Flexible configuration for different use cases.
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
                <li>• Collaborative filtering</li>
                <li>• Content-based recommendations</li>
                <li>• Hybrid recommendation systems</li>
                <li>• A/B testing capabilities</li>
              </ul>
              <ul className="space-y-2">
                <li>• Personalization algorithms</li>
                <li>• Cross-platform support</li>
                <li>• Performance monitoring</li>
                <li>• API integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}