import { navigation } from "../config/site.config";
import { scrollToSection } from "../hooks/useScrollSpy";

interface ScrollSpyMenuProps {
  activeSection: string | null;
  className?: string;
}

export function ScrollSpyMenu({ activeSection, className = "" }: ScrollSpyMenuProps) {
  const handleClick = (sectionId: string) => {
    scrollToSection(sectionId, 20);
  };

  return (
    <nav className={`flex flex-col gap-1 ${className}`} aria-label="Page sections">
      {navigation.sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`
            relative w-full text-left px-4 py-2
            transition-colors duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-fg
            ${
              activeSection === section.id
                ? "text-fg font-semibold border-l-2 border-accent"
                : "text-fg-muted hover:text-fg border-l-2 border-transparent"
            }
          `}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
