# GitHub Copilot Custom Instructions for Study Platform Frontend

## Architecture

- Framework: Angular (v17+) with Standalone Components.
- Styling: Tailwind CSS.
- Component Library: Custom UI components (likely an Angular port of shadcn/ui) in `src/components/ui`.

## Coding Guidelines

### Angular Best Practices

- Use **Standalone Components**, Directives, and Pipes by default. Do not use NgModules unless absolutely necessary.
- Prefer Signals (`signal`, `computed`, `effect`) for local state management where appropriate, over standard property bindings + lifecycle hooks.
- Use `inject()` for dependency injection instead of constructor injection for better composability.
- Use strictly typed Reactive Forms (`FormGroup`, `FormControl` with generic types).
- Use proper RxJS operators (`map`, `filter`, `switchMap`, `catchError`) and always unsubscribe from subscriptions (e.g., using `takeUntilDestroyed` or the `async` pipe in templates).
- Defer loading where applicable using the `@defer` block in templates.

### Styling & UI

- Use Tailwind utility classes directly in the HTML templates instead of writing custom CSS, unless necessary.
- Re-use the existing components from `src/components/ui/` (e.g., button, card, input, dialog) rather than building raw HTML elements. Keep consistency with the design system.

### File Structure & Naming

- Components should have their own `.html` (and `.ts`) files. Keep templates and code clean and readable.
- Services go to `src/app/core/services/`.
- Models/Interfaces go to `src/app/core/models/`.
- Interceptors go to `src/app/core/interceptors/`.
- Guards go to `src/app/core/guards/`.

## General

- Keep functions small and pure.
- Avoid "magic strings/numbers"; extract them into enums or constants.
- Provide typed return variables where necessary.
- Prioritize accessibility (aria-attributes, role tags) when modifying or creating UI components.
