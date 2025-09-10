import { useState, useMemo } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import TabNavigation from './components/TabNavigation/TabNavigation'
import SearchResults from './components/SearchResults/SearchResults'
import SettingsMenu from './components/SettingsMenu/SettingsMenu'
import CustomCursor from './components/CustomCursor/CustomCursor'
import OnboardingScreen from './components/OnboardingScreen/OnboardingScreen'
import { mockResults } from './mockData'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasSeenOnboarding = sessionStorage.getItem('hasSeenOnboarding')
    return hasSeenOnboarding !== 'true'
  })
  const [settings, setSettings] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false
  })

  // Get matching results
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    
    return mockResults.filter(item => 
      item.name.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Calculate counts based on filtered results
  const counts = useMemo(() => ({
    all: filteredResults.length,
    files: filteredResults.filter(item => item.type === 'file' || item.type === 'video').length,
    people: filteredResults.filter(item => item.type === 'person').length,
    chats: filteredResults.filter(item => item.type === 'chat').length,
    lists: filteredResults.filter(item => item.type === 'list').length
  }), [filteredResults])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 1000)
    } else {
      setIsLoading(false)
    }
  }

  const handleSettingChange = (setting, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: value }
      if (!value && activeTab === setting) {
        setActiveTab('all')
      }
      return newSettings
    })
  }

  const searchBarUI = (
    <SearchBar 
      value={searchQuery}
      onSearch={handleSearch}
      isLoading={isLoading}
    />
  )

  const handleDismissOnboarding = () => {
    setShowOnboarding(false)
    sessionStorage.setItem('hasSeenOnboarding', 'true')
  }

  if (!searchQuery.trim()) {
    return (
      <div className="app">
        <div className="search-container">
          {searchBarUI}
          </div>
          {showOnboarding && <OnboardingScreen onDismiss={handleDismissOnboarding} />}
          <CustomCursor />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="search-container expanded">
        {searchBarUI}
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
          onSettingsClick={() => setIsSettingsOpen(true)}
          settings={settings}
        />
        <SearchResults 
          results={filteredResults}
          activeTab={activeTab}
          isLoading={isLoading}
        />
        <SettingsMenu
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSettingChange={handleSettingChange}
        />
      </div>
      <CustomCursor />
    </div>
  )
}

export default App