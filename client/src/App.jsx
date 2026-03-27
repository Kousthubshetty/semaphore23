import { useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import HomeSection from './components/HomeSection';
import RulesSection from './components/RulesSection';
import EventsSection from './components/EventsSection';
import RegistrationSection from './components/RegistrationSection';
import ContactSection from './components/ContactSection';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Show page after load (mimics original hideAll behavior)
    setLoaded(true);

    // Initialize FullPage.js after React renders all sections
    const timer = setTimeout(() => {
      if (window.fullpage) {
        new window.fullpage('#myContainer', {
          sectionsColor: ['#4A6FB1', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
          anchors: ['Home', 'rules', 'Events', 'Registration', 'ContactUs', 'lastPage'],
          navigationTooltips: ['Home', 'Rules', ' ', 'Registration', 'Contact Us'],
          showActiveTooltip: true,
          resize: false,
          animateAnchor: false,
          scrollOverflow: true,
          autoScrolling: true,
          responsive: 900,
          fitSection: false,
          menu: '#menu',
          navigation: true,
          lazyLoad: true,
          continuousVertical: true,
          paddingTop: '20px',
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (window.fullpage_api) {
        try {
          window.fullpage_api.destroy('all');
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
      <NavMenu />
      <div id="myContainer">
        <HomeSection />
        <RulesSection />
        <EventsSection />
        <RegistrationSection />
        <ContactSection />
      </div>
    </div>
  );
}

export default App;
