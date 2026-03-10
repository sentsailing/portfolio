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
            {/* Photo — 3D image cube */}
            <div
              className="image-cube-wrapper mb-9"
              style={{
                width: components.photo.size,
                height: components.photo.size,
              }}
            >
              {imageError ? (
                <div className="w-full h-full bg-bg-tertiary flex items-center justify-center text-3xl font-bold text-fg-muted">
                  {personalInfo.initials}
                </div>
              ) : (
                <div className="image-cube">
                  {["front", "back", "right", "left", "top", "bottom"].map((face) => (
                    <div key={face} className={`image-cube-face image-cube-face--${face}`}>
                      <img
                        src={personalInfo.photo}
                        alt={`Photo of ${personalInfo.name}`}
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Name and tagline */}
            <div>
              <h1 className="text-3xl font-bold text-fg">{personalInfo.name}</h1>
              <p className="text-sm text-fg-muted mt-1">{personalInfo.tagline}</p>
            </div>

            {/* Contact links */}
            <div className="flex items-center justify-center gap-4 w-full">
              {personalInfo.links.calendly && (
                <a
                  href="https://calendar.app.google/en8PfCXmSt5NdmQo7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a call
                </a>
              )}
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
              className="relative overflow-hidden bg-bg-tertiary"
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
            className="p-2 hover:bg-hover-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fg"
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
            overflow-hidden transition-all duration-200
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
