import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { SimulationProvider, useSimulation, VIEWS } from './context/SimulationContext'
import LandingPage from './pages/LandingPage'
import CitizenPortal from './components/citizen/CitizenPortal'
import CounselorWorkspace from './components/counselor/CounselorWorkspace'
import AdminCommandCenter from './components/admin/AdminCommandCenter'

const routes = { citizen: VIEWS.CITIZEN, counselor: VIEWS.COUNSELOR, admin: VIEWS.ADMIN }

function RoutedApp() {
  const { currentView, setCurrentView } = useSimulation()
  const [isLanding, setIsLanding] = useState(() => !routes[window.location.hash.slice(1)])

  useEffect(() => {
    const syncRoute = () => {
      const view = routes[window.location.hash.slice(1)]
      if (view) { setCurrentView(view); setIsLanding(false) } else setIsLanding(true)
    }
    syncRoute()
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [setCurrentView])

  if (isLanding) return <LandingPage />

  const Portal = currentView === VIEWS.COUNSELOR ? CounselorWorkspace : currentView === VIEWS.ADMIN ? AdminCommandCenter : CitizenPortal
  const label = currentView === VIEWS.COUNSELOR ? 'Counselor Workspace' : currentView === VIEWS.ADMIN ? 'Command Centre' : 'Citizen Portal'

  return <div className="min-h-screen bg-[#f7f5ff] text-[#241c40]"><header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5"><a href="#top" className="inline-flex items-center gap-2 text-sm font-bold text-violet-700"><ArrowLeft size={17}/> Back to Samvedna AI</a><span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800">{label}</span></div></header><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6"><Portal /></main></div>
}

export default function App() { return <SimulationProvider><RoutedApp /></SimulationProvider> }
