import React from "react";
import { Helmet } from "react-helmet-async";

export function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookies Policy - IntelliDelve</title>
        <meta
          name="description"
          content="Learn about how IntelliDelve uses cookies to improve your browsing experience and provide better services."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-0">
                <strong>Effective Date:</strong> July 14, 2025
              </p>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This Cookie Policy explains how IntelliDelve Private Limited ("we", "us", or "our") uses cookies and similar technologies on our website (www.intellidelve.com). By continuing to browse or use our website, you agree to our use of cookies as described in this policy.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files stored on your device by your browser when you visit websites. They help websites remember your preferences, enhance your experience, and collect usage data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Types of Cookies We Use
              </h2>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-blue-900 dark:text-blue-300">Essential Cookies</strong>: Required for core functionality (e.g., form submissions).
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-green-900 dark:text-green-300">Analytics Cookies</strong>: Help us understand how users interact with our site (e.g., via Google Analytics).
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-purple-900 dark:text-purple-300">Performance and Functionality Cookies</strong>: Enhance website performance and usability.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Use of Google Analytics
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use Google Analytics to collect anonymized data on how visitors use our site. This helps us analyze web traffic and improve functionality. Google may store the information collected on servers in the United States or other locations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Managing Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can control and manage cookies in your browser settings. Most browsers allow you to refuse or delete cookies. However, disabling cookies may affect the functionality of some parts of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Changes to This Cookie Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> verify@intellidelve.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cookies;
