# ♿ Accessibility review checklist

This document defines checks for the existing frontend. It does not claim that an accessibility audit has already passed.

## Interaction and forms

- Every input has a persistent programmatic label.
- Required fields and validation failures are announced to assistive technology.
- Errors explain how to correct the input.
- Password visibility controls have accessible names and state.
- All actions work with keyboard alone.
- Focus order follows visual and reading order.
- Focus indicators remain visible.
- Dialogs and alerts manage focus and can be dismissed accessibly.

## Structure and content

- Use semantic landmarks and heading hierarchy.
- Buttons perform actions; links navigate.
- Decorative images use empty alt text; informative images use useful alt descriptions.
- Avoid using color as the only indicator of transfer/request status.
- Tables have clear header associations.
- Live updates are announced without overwhelming the user.

## Visual design

- Check text and controls against WCAG contrast expectations.
- Support browser zoom and text resizing.
- Avoid clipped content at narrow viewport sizes.
- Respect reduced-motion preferences.
- Ensure card artwork does not make essential information inaccessible.

## Suggested verification

1. Navigate every page using Tab, Shift+Tab, Enter, Space and Escape.
2. Test with a screen reader.
3. Inspect labels, roles, names and live regions.
4. Run an automated checker, then manually review every reported issue.
5. Test at 200% zoom and on a narrow viewport.

Automated accessibility tools cannot replace keyboard and assistive-technology testing.
