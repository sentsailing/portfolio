import { navigation } from "./config/site.config";
import { useScrollSpy } from "./hooks";
import { ProfilePanel } from "./components";
import {
  AboutSection,
  ProjectsSection,
  ResearchSection,
} from "./sections";

function App() {
  const sectionIds = navigation.sections.map((s) => s.id);
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });

  return (
    <div className="min-h-screen">
      {/* Mobile header spacer */}
      <div className="lg:hidden h-16" />

      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* Sidebar — right side on desktop */}
          <div className="hidden lg:block lg:col-start-10 lg:col-span-3 lg:order-2">
            <div className="fixed top-16 w-[240px]">
              <ProfilePanel activeSection={activeSection} />
            </div>
          </div>

          {/* Mobile profile */}
          <div className="lg:hidden">
            <ProfilePanel activeSection={activeSection} />
          </div>

          {/* Main content */}
          <main className="lg:col-span-9 lg:order-1">
            <div className="flex flex-col gap-32">
              <AboutSection />
              <ProjectsSection />
              <ResearchSection />
            </div>

            <footer className="mt-24 pt-6 border-t border-border text-sm text-fg-muted">
              <p>Built with 🇨🇭 in mind</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
