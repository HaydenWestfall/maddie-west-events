import { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import "./overlay.scss";

interface OverlayProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export interface OverlayRef {
  show: () => void;
  hide: () => void;
}

const Overlay = forwardRef<OverlayRef, OverlayProps>(({ children, id = "overlay", className = "" }, ref) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    show: () => {
      if (overlayRef.current && contentRef.current) {
        overlayRef.current.style.display = "flex";
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.3 });
      }
    },
    hide: () => {
      if (overlayRef.current && contentRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
          },
        });
      }
    },
  }));

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close overlay if clicking on the background (not the content)
    if (e.target === overlayRef.current) {
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.hide();
      }
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`overlay ${className}`}
      id={id}
      onClick={handleOverlayClick}
      style={{ display: "none" }}
    >
      <div ref={contentRef} className="overlay-content">
        {children}
      </div>
    </div>
  );
});

Overlay.displayName = "Overlay";

export default Overlay;
