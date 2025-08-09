import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { runApiTests } from '../../utils/apiTest';
import { apiClient, authService } from '../../services/apiService';
import { useAuth } from '../../hooks/useApi';

export const ApiTestComponent: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const { user, isAuthenticated, isLoading: authLoading, error } = useAuth();
  const [manualTests, setManualTests] = useState<Record<string, any>>({});

  const runManualTest = async (testName: string, testFn: () => Promise<any>) => {
    try {
      const result = await testFn();
      setManualTests(prev => ({
        ...prev,
        [testName]: { success: true, data: result, timestamp: new Date().toLocaleTimeString() }
      }));
    } catch (error: any) {
      setManualTests(prev => ({
        ...prev,
        [testName]: { success: false, error: error.message, timestamp: new Date().toLocaleTimeString() }
      }));
    }
  };

  const testDirectApiCall = () => {
    runManualTest('Direct API Call', () =>
      fetch('https://informed-bluebird-right.ngrok-free.app/api/auth/validate/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      }).then(res => res.json())
    );
  };

  const testLogin = () => {
    runManualTest('Login Test', () =>
      apiClient.login({
        email: 'shahmirkhan9181@gmail.com',
        password: 'IntelliDelveIntern123@'
      })
    );
  };

  const testTokenValidation = () => {
    runManualTest('Token Validation', () => authService.validateToken());
  };

  const clearToken = () => {
    localStorage.removeItem('auth_token');
    window.location.reload();
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    setStatus('running');
    setResults([]);

    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    const logs: string[] = [];

    console.log = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(message);
      originalLog(...args);
    };

    console.error = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(`ERROR: ${message}`);
      originalError(...args);
    };

    try {
      await runApiTests();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    } finally {
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      
      setResults(logs);
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          API Connection Test
        </h2>
        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run API Tests
            </>
          )}
        </button>
      </div>

      {status !== 'idle' && (
        <div className="mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            status === 'running' ? 'bg-blue-100 text-blue-800' :
            status === 'success' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {status === 'running' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-4 h-4" />}
            {status === 'error' && <XCircle className="w-4 h-4" />}
            {status === 'running' ? 'Running...' :
             status === 'success' ? 'Tests Passed' :
             'Tests Failed'}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96">
          <div className="mb-2 text-gray-400">Test Results:</div>
          {results.map((result, index) => (
            <div key={index} className="mb-1">
              {result}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Test Information:
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• API Base URL: https://informed-bluebird-right.ngrok-free.app</li>
          <li>• Test Email: shahmirkhan9181@gmail.com</li>
          <li>• This will test login and basic API connectivity</li>
          <li>• Check browser console for detailed logs</li>
        </ul>
      </div>
    </div>
  );
};