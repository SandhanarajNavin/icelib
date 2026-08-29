"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the nav can mark it active.
 * Picks the section nearest the top of the viewport rather than the first
 * intersecting one, so fast scrolling doesn't leave the wrong link lit.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    // Sort by document position: `ids` arrives in nav order, which need not
    // match the order the sections actually appear on the page.
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );

    if (sections.length === 0) return;

    const pick = () => {
      const line = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      }

      // At the very bottom the last section may never cross the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [ids]);

  return active;
}
