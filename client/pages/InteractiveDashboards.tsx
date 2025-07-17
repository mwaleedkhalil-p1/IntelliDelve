import { BarChart3, PieChart, LineChart, Activity, RefreshCw, Layers } from "lucide-react";

export default function InteractiveDashboards() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Dashboards & Business Intelligence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Transform your data into actionable insights with our advanced visualization and analytics solutions.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <BarChart3 className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Dynamic Visualization Platform
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create compelling data stories with our interactive visualization tools, designed for both technical and non-technical users.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <PieChart className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Live data updates and interactive filtering capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LineChart className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Trend Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced pattern recognition and forecasting</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Activity className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Performance Metrics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Track KPIs and business metrics with customizable dashboards.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <RefreshCw className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Automated Reporting
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Schedule and distribute reports automatically to stakeholders.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Layers className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Data Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Connect multiple data sources for comprehensive analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Drag-and-drop interface</li>
                <li>• Custom widget creation</li>
                <li>• Advanced filtering options</li>
                <li>• Data export capabilities</li>
              </ul>
              <ul className="space-y-2">
                <li>• Role-based access control</li>
                <li>• Mobile-responsive design</li>
                <li>• Automated data refresh</li>
                <li>• Interactive drill-downs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}