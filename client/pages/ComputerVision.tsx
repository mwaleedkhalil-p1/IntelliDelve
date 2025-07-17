import { Eye, Camera, Scan, Maximize2, Cpu, BarChart } from "lucide-react";

export default function ComputerVision() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Computer Vision Systems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Advanced image and video analysis solutions powered by deep learning technology.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Visual Intelligence
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our computer vision solutions enable machines to understand and process visual information with human-like accuracy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Image Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced image recognition and classification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Scan className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Object Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Real-time object identification and tracking</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Maximize2 className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Scene Understanding
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Comprehensive analysis of visual scenes and environments.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Cpu className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Deep Learning Models
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  State-of-the-art neural networks for visual processing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <BarChart className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Visual insights and performance metrics visualization.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Facial recognition systems</li>
                <li>• Quality control automation</li>
                <li>• Security surveillance</li>
                <li>• Document processing</li>
              </ul>
              <ul className="space-y-2">
                <li>• Gesture recognition</li>
                <li>• Medical image analysis</li>
                <li>• Autonomous systems</li>
                <li>• Retail analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}