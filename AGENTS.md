# AI Coding Assistant Instructions

## Project Overview
This is a monorepo for a crochet patterns e-commerce platform with:
- **Backend**: Express.js API with TypeScript, Drizzle ORM, Better Auth, BullMQ queues
- **Frontend**: Nuxt 3 web app with Pinia state management
- **Mobile**: Expo React Native app
- **Transactional**: Shared email templates using React Email

## Architecture Patterns

### Backend Structure
- **Routes/Controllers**: Each feature has a route file (e.g., `routes/product.routes.ts`) that imports a controller (e.g., `controllers/product.controller.ts`)
- **Validation**: Use Zod schemas in `validations/` with `validateBody` middleware for request validation
- **Services**: Business logic in `services/` (e.g., `mail.service.ts` for Resend integration)
- **Queues/Workers**: Async tasks use BullMQ queues in `queues/` with workers in `workers/` (e.g., email sending)
- **Database**: Drizzle ORM with schemas in `db/schemas/`, migrations via `drizzle-kit`
- **Auth**: Better Auth with Redis storage, schemas in `db/schemas/`
- **Crons**: Scheduled tasks in `crons/` initialized in `app.ts`

### Frontend Patterns
- **State Management**: Pinia stores in `stores/` (e.g., `stores/feedback.ts`)
- **Components**: Vue 3 Composition API with `<script setup>`, auto-imports via Nuxt
- **Validation**: Vee-validate with Zod schemas
- **Styling**: Sass with component-scoped styles

### Shared Packages
- **Transactional Emails**: React Email templates in `packages/transactional/emails/`

## Development Workflow

### Running Locally
```bash
pnpm install --frozen-lockfile
pnpm --filter backend --filter web dev  # Run backend + frontend
```

### With Docker
```bash
./dev start  # Starts all services via docker-compose
./dev logs backend  # View logs
```

### Database
```bash
pnpm --filter backend db:migrate  # Run migrations
pnpm --filter backend db:studio  # Open Drizzle Studio
```

### Building
```bash
pnpm --filter backend build  # tsup build
pnpm --filter web build  # Nuxt build
```

### Testing
```bash
pnpm test  # Run all tests recursively
pnpm --filter backend coverage  # Backend coverage
```

### Linting
```bash
pnpm lint  # Recursive linting
pnpm --filter backend lint:fix  # Fix backend issues
pnpm --filter web format:fix  # Fix frontend formatting
```

## Key Conventions

### Path Aliases
- `@/*` for backend src files
- `@routes/*`, `@controllers/*`, etc. for backend folders
- Nuxt auto-imports for frontend

### File Naming
- Use kebab-case for new file names (e.g., `product-controller.ts`, `feedback-store.ts`)

### Commit Messages
- Follow Conventional Commits and include a scope from: `root`, `backend`, `web`, or `mobile`.
- When suggesting a commit message, use the pattern: `(feat|fix|chore|refactor)(root|backend|web|mobile): <short summary>` and always provide the message in English.
- Provide a short one-line summary (preferably <=50 chars) and, optionally, a 1-2 line body explaining the change.
  - Example: `feat(web): add feedback widget`

### Consumer Impact (ecommerce-aware)
- For this ecommerce project, every commit should explicitly state whether the change can affect the end customer (people who buy products on the site/app). Add an `Impact:` line in the commit body with one of the values: `none`, `customer-visible`, `customer-critical`.
- Guidance:
  - `none`: Internal changes, refactors, tests, docs, or infra tweaks that do not affect customers.
  - `customer-visible`: UI/UX changes, product listing behaviour, checkout flow tweaks, email copies, or features that customers may notice.
  - `customer-critical`: Anything that can break purchases, payments, order processing, transactional emails, or cause outage/data loss.
- Example commit with impact:

  feat(web): improve product image loading

  Impact: customer-visible
  Improve lazy-loading for product gallery to reduce initial page load and improve conversion on product pages.

- Process notes:
  - Commits marked `customer-visible` or `customer-critical` should include QA steps and a staging verification note in the PR body.
  - `customer-critical` changes require test/QA sign-off, deployment window planning, and (when possible) feature flags or canary rollout.

### Validation Example
```typescript
// validations/feedback.validation.ts
export const feedbackZodSchema = z.object({
  feedback: z.string(),
  type: z.enum(["Problemas", "Ideias", "Outros"])
});

// routes/feedback.routes.ts
router.post('/', validateBody(feedbackZodSchema), feedbackController.submit);
```

### Queue Usage
```typescript
// Add job
await emailQueue.add('sendEmail', { to, subject, body });

// Worker processes
new Worker('emailQueue', async (job) => {
  await sendEmail(job.data);
});
```

### Store Pattern
```typescript
// stores/feedback.ts
export const useFeedbackStore = defineStore('feedback', {
  state: () => ({ isOpen: false }),
  actions: { toggleFeedback() { this.isOpen = !this.isOpen } }
});
```

## Dependencies
- **Auth**: Better Auth with Redis
- **DB**: Drizzle + Postgres
- **Queues**: BullMQ + Redis
- **Emails**: Resend via queued workers
- **Validation**: Zod
- **Frontend**: Nuxt modules (Pinia, Vee-validate, etc.)

## File Examples
- Controllers: `apps/backend/src/controllers/product.controller.ts`
- Routes: `apps/backend/src/routes/index.ts`
- Schemas: `apps/backend/src/db/schemas/users.schema.ts`
- Components: `apps/frontend/src/components/ProductTile.vue`
- Stores: `apps/frontend/src/stores/feedback.ts`
