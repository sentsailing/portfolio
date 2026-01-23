import { useState } from "react";
import { personalInfo, components } from "../config/site.config";
import { ScrollSpyMenu } from "./ScrollSpyMenu";
import { SocialLinks } from "./SocialLinks";

interface ProfilePanelProps {
  activeSection: string | null;
}

export function ProfilePanel({ activeSection }: ProfilePanelProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block w-full">
        <div className="sticky top-8 flex flex-col gap-8">
          {/* Profile section */}
          <div className="flex flex-col items-center text-center gap-4">
            {/* Photo */}
            <div
              className="relative rounded-full overflow-hidden bg-bg-tertiary border-[3px] border-border"
              style={{
                width: components.photo.size,
                height: components.photo.size,
              }}
            >
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-fg-muted">
                  {personalInfo.initials}
                </div>
              ) : (
                <img
                  src={personalInfo.photo}
                  alt={`Photo of ${personalInfo.name}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            {/* Name and tagline */}
            <div>
              <h1 className="text-xl font-bold text-fg">{personalInfo.name}</h1>
              <p className="text-sm text-fg-muted mt-1">{personalInfo.tagline}</p>
            </div>
          </div>

          {/* Navigation menu */}
          <ScrollSpyMenu activeSection={activeSection} />

          {/* Social links */}
          <SocialLinks className="justify-center" />
        </div>
      </aside>

      {/* Mobile: Compact header */}
      <MobileHeader activeSection={activeSection} imageError={imageError} setImageError={setImageError} />
    </>
  );
}

interface MobileHeaderProps {
  activeSection: string | null;
  imageError: boolean;
  setImageError: (error: boolean) => void;
}

function MobileHeader({ activeSection, imageError, setImageError }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mini profile */}
          <div className="flex items-center gap-3">
            <div
              className="relative rounded-full overflow-hidden bg-bg-tertiary border-2 border-border"
              style={{ width: "40px", height: "40px" }}
            >
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-fg-muted">
                  {personalInfo.initials}
                </div>
              ) : (
                <img
                  src={personalInfo.photo}
                  alt={`Photo of ${personalInfo.name}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <span className="font-semibold text-fg">{personalInfo.name}</span>
          </div>

          {/* Menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-hover-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6 text-fg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Collapsible menu */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            ${isMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"}
          `}
        >
          <ScrollSpyMenu
            activeSection={activeSection}
            className="border-t border-border pt-4"
          />
          <SocialLinks className="mt-4 pt-4 border-t border-border justify-center" />
        </div>
      </div>
    </header>
  );
}
