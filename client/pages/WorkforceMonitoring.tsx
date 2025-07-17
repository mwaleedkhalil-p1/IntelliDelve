import { Users, Shield, Bell, Eye, Clock, FileText } from "lucide-react";
import React from "react";

export default function WorkforceMonitoring() {
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Continuous Workforce Risk Monitoring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Proactive risk management and continuous monitoring solutions to protect your organization and workforce.
          </p>

          <div className="grid gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Workforce Protection
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our comprehensive monitoring system helps organizations maintain a secure and compliant workforce through continuous surveillance and risk assessment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Risk Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Early warning system for potential workforce risks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Alert System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Real-time notifications for critical events</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Eye className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Continuous Monitoring
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  24/7 surveillance of workforce-related risks and compliance issues.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <Clock className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Real-time Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Instant updates on status changes and risk indicators.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <FileText className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Compliance Reports
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automated compliance reporting and documentation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <ul className="space-y-2">
                <li>• Proactive risk management</li>
                <li>• Regulatory compliance</li>
                <li>• Automated monitoring</li>
                <li>• Incident prevention</li>
              </ul>
              <ul className="space-y-2">
                <li>• Data-driven insights</li>
                <li>• Streamlined reporting</li>
                <li>• Cost reduction</li>
                <li>• Enhanced security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}