import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export default function LinkAnim({
  href = "",
  className,
  name = "Click Me",
  clickAct,
  children,
}) {
  const linkRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    // Extract target ID and find element
    const targetId = href.replace(/.*#/, "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calculate position and animate scroll
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetPosition, autoKill: true },
        ease: "power2.inOut",
      });
    }

    // Execute additional click handler if provided
    if (clickAct) clickAct(e);
  };

  return (
    <a ref={linkRef} href={href} className={className} onClick={handleClick}>
      {children || name}
    </a>
  );
}
