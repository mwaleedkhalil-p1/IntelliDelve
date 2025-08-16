import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { checkSanityHealth } from '../lib/sanity'

interface FallbackContextType {
  isSanityHealthy: boolean
  fallbackEnabled: boolean
  contentSource: 'sanity' | 'legacy' | 'auto'
  setContentSource: (source: 'sanity' | 'legacy' | 'auto') => void
  forceRefreshHealth: () => void
  healthCheckStatus: {
    status: 'healthy' | 'degraded' | 'unhealthy'
    lastChecked: Date | null
    responseTime?: number
    circuitBreakerState: string
  }
}

const FallbackContext = createContext<FallbackContextType | undefined>(undefined)

interface FallbackProviderProps {
  children: ReactNode
  healthCheckInterval?: number
  enableAutoFallback?: boolean
}

export const FallbackProvider: React.FC<FallbackProviderProps> = ({
  children,
  healthCheckInterval = 60000, // 1 minute
  enableAutoFallback = true
}) => {
  const [isSanityHealthy, setIsSanityHealthy] = useState(true)
  const [fallbackEnabled, setFallbackEnabled] = useState(enableAutoFallback)
  const [contentSource, setContentSource] = useState<'sanity' | 'legacy' | 'auto'>('auto')
  const [healthCheckStatus, setHealthCheckStatus] = useState({
    status: 'healthy' as const,
    lastChecked: null as Date | null,
    responseTime: undefined as number | undefined,
    circuitBreakerState: 'CLOSED'
  })

  const checkHealth = async () => {
    try {
      const health = await checkSanityHealth()
      setHealthCheckStatus({
        status: health.status,
        lastChecked: new Date(),
        responseTime: health.responseTime,
        circuitBreakerState: health.circuitBreakerState
      })
      
      const healthy = health.status === 'healthy' || health.status === 'degraded'
      setIsSanityHealthy(healthy)
      
      if (!healthy && enableAutoFallback) {
        console.warn('🚨 Sanity health check failed, auto-fallback enabled')
      }
    } catch (error) {
      console.error('❌ Health check failed:', error)
      setHealthCheckStatus({
        status: 'unhealthy',
        lastChecked: new Date(),
        circuitBreakerState: 'OPEN'
      })
      setIsSanityHealthy(false)
    }
  }

  const forceRefreshHealth = () => {
    checkHealth()
  }

  useEffect(() => {
    // Initial health check
    checkHealth()

    // Set up periodic health checks
    const interval = setInterval(checkHealth, healthCheckInterval)

    return () => clearInterval(interval)
  }, [healthCheckInterval])

  // Load saved content source preference
  useEffect(() => {
    const savedSource = localStorage.getItem('content-source-preference')
    if (savedSource && ['sanity', 'legacy', 'auto'].includes(savedSource)) {
      setContentSource(savedSource as 'sanity' | 'legacy' | 'auto')
    }
  }, [])

  // Save content source preference
  const handleSetContentSource = (source: 'sanity' | 'legacy' | 'auto') => {
    setContentSource(source)
    localStorage.setItem('content-source-preference', source)
    
    if (source === 'legacy') {
      console.log('🔄 Manually switched to legacy API')
    } else if (source === 'sanity') {
      console.log('🔄 Manually switched to Sanity API')
    } else {
      console.log('🔄 Switched to automatic fallback mode')
    }
  }

  const contextValue: FallbackContextType = {
    isSanityHealthy,
    fallbackEnabled,
    contentSource,
    setContentSource: handleSetContentSource,
    forceRefreshHealth,
    healthCheckStatus
  }

  return (
    <FallbackContext.Provider value={contextValue}>
      {children}
    </FallbackContext.Provider>
  )
}

export const useFallback = (): FallbackContextType => {
  const context = useContext(FallbackContext)
  if (context === undefined) {
    throw new Error('useFallback must be used within a FallbackProvider')
  }
  return context
}

// Debug component for development
export const FallbackDebugPanel: React.FC = () => {
  const { 
    isSanityHealthy, 
    contentSource, 
    setContentSource, 
    forceRefreshHealth,
    healthCheckStatus 
  } = useFallback()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    // <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-sm z-50">
    //   <div className="font-bold mb-2">Content Source Debug</div>
      
    //   <div className="space-y-2">
    //     <div>
    //       <span className="font-semibold">Health:</span>{' '}
    //       <span className={`px-2 py-1 rounded ${
    //         healthCheckStatus.status === 'healthy' ? 'bg-green-600' :
    //         healthCheckStatus.status === 'degraded' ? 'bg-yellow-600' : 'bg-red-600'
    //       }`}>
    //         {healthCheckStatus.status}
    //       </span>
    //     </div>
        
    //     <div>
    //       <span className="font-semibold">Source:</span> {contentSource}
    //     </div>
        
    //     <div>
    //       <span className="font-semibold">Circuit:</span> {healthCheckStatus.circuitBreakerState}
    //     </div>
        
    //     {healthCheckStatus.responseTime && (
    //       <div>
    //         <span className="font-semibold">Response:</span> {healthCheckStatus.responseTime}ms
    //       </div>
    //     )}
        
    //     <div>
    //       <span className="font-semibold">Last Check:</span>{' '}
    //       {healthCheckStatus.lastChecked?.toLocaleTimeString() || 'Never'}
    //     </div>
    //   </div>

    //   <div className="mt-3 space-y-1">
    //     <div className="flex gap-1">
    //       <button
    //         onClick={() => setContentSource('auto')}
    //         className={`px-2 py-1 rounded text-xs ${
    //           contentSource === 'auto' ? 'bg-blue-600' : 'bg-gray-600'
    //         }`}
    //       >
    //         Auto
    //       </button>
    //       <button
    //         onClick={() => setContentSource('sanity')}
    //         className={`px-2 py-1 rounded text-xs ${
    //           contentSource === 'sanity' ? 'bg-blue-600' : 'bg-gray-600'
    //         }`}
    //       >
    //         Sanity
    //       </button>
    //       <button
    //         onClick={() => setContentSource('legacy')}
    //         className={`px-2 py-1 rounded text-xs ${
    //           contentSource === 'legacy' ? 'bg-blue-600' : 'bg-gray-600'
    //         }`}
    //       >
    //         Legacy
    //       </button>
    //     </div>
        
    //     <button
    //       onClick={forceRefreshHealth}
    //       className="w-full px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded text-xs"
    //     >
    //       Refresh Health
    //     </button>
    //   </div>
    // </div>
    <div></div>
  )
}