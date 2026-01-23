import { navigation } from "../config/site.config";
import { scrollToSection } from "../hooks/useScrollSpy";
import { useMagneticHover } from "../hooks/useMagneticHover";

interface ScrollSpyMenuProps {
  activeSection: string | null;
  className?: string;
}

interface MenuItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function MenuItem({ label, isActive, onClick }: MenuItemProps) {
  const magneticRef = useMagneticHover<HTMLButtonElement>({
    strength: 6,
    enabled: !isActive,
  });

  // Calculate scale based on active state
  const baseScale = isActive ? 1.15 : 1;

  return (
    <button
      ref={magneticRef}
      onClick={onClick}
      className={`
        relative w-full text-left px-4 py-2 rounded-lg
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        ${
          isActive
            ? "text-fg font-semibold bg-hover-bg"
            : "text-fg-muted hover:text-fg hover:bg-hover-bg/50"
        }
      `}
      style={{
        transform: `scale(${baseScale})`,
        transformOrigin: "left center",
      }}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Active indicator line */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full
          bg-accent transition-all duration-300
          ${isActive ? "h-6 opacity-100" : "h-0 opacity-0"}
        `}
      />

      {/* Label */}
      <span className="relative">{label}</span>
    </button>
  );
}

export function ScrollSpyMenu({ activeSection, className = "" }: ScrollSpyMenuProps) {
  const handleClick = (sectionId: string) => {
    scrollToSection(sectionId, 20);
  };

  return (
    <nav className={`flex flex-col gap-1 ${className}`} aria-label="Page sections">
      {navigation.sections.map((section) => (
        <MenuItem
          key={section.id}
          label={section.label}
          isActive={activeSection === section.id}
          onClick={() => handleClick(section.id)}
        />
      ))}
    </nav>
  );
}
