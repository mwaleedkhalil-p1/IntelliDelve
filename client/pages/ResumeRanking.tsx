import { UserCheck, Brain, Target, LineChart, Filter, Clock } from "lucide-react";

export default function ResumeRanking() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            AI-Powered Resume Ranking & Candidate Scoring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Intelligent recruitment solution that streamlines candidate evaluation and selection process.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <UserCheck className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Smart Candidate Assessment
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our AI-powered system analyzes resumes and ranks candidates based on job requirements, skills, and experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">AI-Driven Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced machine learning for accurate evaluation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Precision Matching</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Accurate job requirement alignment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <LineChart className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Scoring Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Detailed candidate evaluation metrics.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Filter className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Smart Filtering
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automated candidate shortlisting.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Clock className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Time Efficiency
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Faster recruitment process.
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
                <li>• Automated resume parsing</li>
                <li>• Skill matching algorithms</li>
                <li>• Experience evaluation</li>
                <li>• Custom scoring criteria</li>
              </ul>
              <ul className="space-y-2">
                <li>• Bias reduction</li>
                <li>• Candidate ranking</li>
                <li>• Performance analytics</li>
                <li>• ATS integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}