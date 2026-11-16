# ♿ Accessibility review guide

This is a review plan, not a claim that the interface currently conforms to WCAG.

## Forms

Every input needs a visible label. Required fields must be identified in text. Errors should be associated with inputs and explain correction. Password controls need accessible names/state. Submit buttons should expose loading/disabled state. Success/error messages should be announced and focus should move predictably.

## Navigation and structure

Use semantic landmarks, logical heading hierarchy, links for navigation, buttons for actions, keyboard-accessible controls, visible focus and skip navigation where useful.

## Dashboard information

Do not communicate status through color alone. Use clear labels and text. Provide table headers. Make card-style visual information available as text. Announce realtime updates without overwhelming screen-reader users. Ensure dialogs manage focus.

## Visual presentation

Check contrast, zoom, text resizing, narrow-screen clipping, reduced-motion preferences and image alternatives. Avoid information embedded only in images.

## Verification workflow

1. Navigate with keyboard only.
2. Test with a screen reader.
3. Inspect accessible names, roles and live regions.
4. Check 200% zoom and narrow viewport.
5. Run automated accessibility checks.
6. Manually review findings.
7. Record browser, assistive technology and date.

Automated scans detect only a subset of issues. A feature is not complete if keyboard users cannot reach it, errors are not perceivable, focus is lost or essential status is conveyed only through color.
