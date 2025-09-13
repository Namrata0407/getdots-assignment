import { useState, useMemo, useRef, useLayoutEffect } from 'react'
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

  const animatedSectionRef = useRef(null)
  const contentRef = useRef(null)
  const [animatedHeight, setAnimatedHeight] = useState(null)
  const settingsButtonRef = useRef(null)

  useLayoutEffect(() => {
    const contentEl = contentRef.current
    const animatedEl = animatedSectionRef.current
    if (!contentEl || !animatedEl) return

    const measure = () => {
      const nextHeight = contentEl.offsetHeight
      setAnimatedHeight(prev => (prev === nextHeight ? prev : nextHeight))
    }

    measure()

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(measure)
    })
    resizeObserver.observe(contentEl)

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    isLoading,
    activeTab,
    settings,
    searchQuery
  ])
  const hasQuery = searchQuery.trim().length > 0

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []

    return mockResults.filter(item =>
      item.name.toLowerCase().includes(query)
    )
  }, [searchQuery])

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

  const shouldExpand = isSettingsOpen || isLoading || hasQuery

  return (
    <div className="app">
      <div className={`search-container ${shouldExpand ? 'expanded' : ''} ${isSettingsOpen ? 'settings-open' : ''}`}>
        {searchBarUI}
        <div
          ref={animatedSectionRef}
          className="animated-section"
          style={{ height: animatedHeight == null ? 'auto' : `${animatedHeight}px` }}
        >
          <div ref={contentRef}>
            {hasQuery && (
              <>
                <TabNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  counts={counts}
                  onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  settings={settings}
                  settingsButtonRef={settingsButtonRef}
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
                  anchorEl={settingsButtonRef.current}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {showOnboarding && !hasQuery && <OnboardingScreen onDismiss={handleDismissOnboarding} />}
      <CustomCursor />
    </div>
  )
}

export default App