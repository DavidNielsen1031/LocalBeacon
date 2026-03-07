# LocalBeacon Design System

> Use this skill when building or modifying any LocalBeacon UI. Read this BEFORE writing any TSX.

## Brand Identity

- **Product:** LocalBeacon.ai — AI-powered local marketing for SMBs
- **Logo:** Option P — cross of light lighthouse. Faith embedded subtly, zero AI references customer-facing.
- **Tone:** Professional but warm. Bob-friendly (no jargon). "Your business, found by everyone."

## Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| **Headings** | Fraunces | 600, 700 | Page titles, section headers, hero text |
| **Body** | DM Sans | 400, 500, 600, 700 | All body text, buttons, labels, navigation |

**CSS Variables:** `--font-fraunces`, `--font-dm-sans`

**Rules:**
- NEVER use raw `font-serif` or `font-sans` — always `font-fraunces` or `font-dm-sans`
- NEVER hardcode font sizes with arbitrary values like `text-[44px]`
- Use Tailwind scale: `text-xs` → `text-6xl`
- Headings: `text-2xl` to `text-5xl` with `font-fraunces font-bold`
- Body: `text-sm` to `text-lg` with `font-dm-sans`

## Colors

| Token | Light Mode | Usage |
|---|---|---|
| **Background** | `#FAFAF7` (warm off-white) | Page background — set on `<body>` |
| **Foreground** | `#2D3436` (warm charcoal) | Primary text |
| **White** | `bg-white` | Cards, panels, elevated surfaces |
| **Black** | `bg-black text-white` | CTAs, primary buttons, hero sections |
| **Green** | `text-green-600`, `bg-green-50` | Success states, positive scores, improvements |
| **Red** | `text-red-600`, `bg-red-50` | Errors, critical issues, low scores |
| **Yellow** | `text-yellow-600`, `bg-yellow-50` | Warnings, medium priority |
| **Blue** | `text-blue-600`, `bg-blue-50` | Info, links, secondary actions |

**Rules:**
- NEVER use raw hex/rgb in TSX — use Tailwind color classes
- The ONLY exception is `#FAFAF7` on the body (already set in layout.tsx)
- Card backgrounds: always `bg-white`
- Dashboard sections: `bg-white rounded-xl shadow-sm border`

## Spacing & Layout

- **Border radius:** `rounded-lg` (default), `rounded-xl` (cards/panels), `rounded-full` (avatars/badges)
- NEVER use `rounded-sm` or `rounded-none` in dashboard
- **Shadows:** `shadow-sm` (cards), `shadow-md` (modals/dropdowns). No `shadow-lg` or `shadow-2xl`.
- **Padding:** Cards use `p-6`. Sections use `p-4` to `p-8`. Never raw numeric spacing under `p-2`.
- **Max width:** Content areas use `max-w-7xl mx-auto`

## Components (shadcn/ui)

Available in `components/ui/`:
`badge`, `button`, `card`, `dialog`, `input`, `label`, `sheet`, `tabs`, `textarea`

**Rules:**
- ALWAYS use shadcn/ui components when available — never build raw equivalents
- Import from `@/components/ui/button` (not from radix directly)
- Buttons: use `<Button>` component, not raw `<button>`
- Cards: use `<Card>` + `<CardHeader>` + `<CardContent>`, not raw divs
- Forms: use `<Input>` + `<Label>` + `<Textarea>`, not raw HTML

## Dashboard Pages

Every dashboard page follows this structure:

```tsx
export default function PageName() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-gray-900">Page Title</h1>
        <p className="text-sm text-gray-500 mt-1">Brief description of what this page does</p>
      </div>

      {/* Content cards */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* Card content */}
      </div>
    </div>
  );
}
```

**Rules:**
- Dashboard pages are NEVER blank — always show demo/example data on first visit
- Loading states: use skeleton placeholders, not spinners
- Error states: friendly message + retry button, never raw error dumps
- Empty states: helpful illustration + CTA to get started

## Copy Guidelines

- **No AI references** in customer-facing copy. Say "smart" or "automated", not "AI-powered"
- **No jargon.** Bob (plumber, 52) is the primary persona. If he wouldn't understand it, rewrite it.
- **Action-oriented.** "Generate Your Posts" not "Post Generation Module"
- **Warm but professional.** Not corporate, not casual.

## Anti-Patterns (NEVER DO)

- ❌ Raw `<div>` with manual styling when a shadcn component exists
- ❌ Inline styles (`style={{}}`) except the body background
- ❌ Arbitrary Tailwind values (`text-[14px]`, `w-[347px]`)
- ❌ Raw color values in TSX (`#FF0000`, `rgb(...)`)
- ❌ Missing hover/focus states on interactive elements
- ❌ Text without proper contrast (light text on light bg)
- ❌ Modals/dialogs without close button and escape key support

## File Structure

```
app/
  dashboard/
    [page-name]/
      page.tsx          ← Page component
components/
  ui/                   ← shadcn/ui primitives (DO NOT EDIT)
  dashboard/            ← Dashboard-specific components
  [feature].tsx         ← Shared feature components
lib/
  [module].ts           ← Business logic, API clients, utils
```
