# Student Productivity Toolkit

An early-stage TypeScript / Next.js prototype for organising student tasks by course and deadline. Maintained under the GitHub handle **Solohkg**.

## Current implementation

- Add assignment, exam, or project tasks with a course and deadline.
- View tasks due within the next seven days and tasks grouped by course.
- Email sign-in, Prisma data models, and Stripe checkout/webhook code are included.
- A preparation script copies the flat source files into Next.js application directories.

## Prototype status and limitations

This is a prototype requiring integration work, not a verified production service. No adoption or download figures are claimed.

- Planner tasks currently live only in React state and are lost when the page reloads.
- A completed-task view exists, but the current interface has no action to mark a task complete.
- The code imports `@auth/prisma-adapter`, which is absent from the current package manifest. Email-provider dependencies also need checking before setup can be considered complete.
- Generated source paths and imports need reconciliation; for example, the auth source imports `./prisma_client` but the preparation script writes `src/lib/prisma.ts`.
- The current Stripe webhook handles checkout completion only. Subscription lifecycle handling and access enforcement require further verification.
- No successful build, automated test suite, deployment, or end-to-end authentication/billing flow is claimed here.

## Development starting point

Use a local development environment and test credentials. These are starting steps; the integration limitations above must be resolved before a working setup is expected.

```sh
cp .env.example .env.local
npm install
npm run prepare-app
```

The preparation script generates `app/`, `src/lib/`, and `prisma/schema.prisma` from the flat source files. Edit the flat source files because preparation overwrites the generated copies.

After resolving dependencies, imports, and Prisma validation, configure a local PostgreSQL database and email test service. Then run the Prisma migration and `npm run dev`. The intended routes are `/`, `/login`, `/pricing`, and `/app` at `http://localhost:3000`.

The pricing code contains a $5/month Stripe example. It is sample application behaviour; it is not a charge for this repository or evidence of a live service. Use Stripe test mode while developing.

## Contributing

Use GitHub issues for reproducible bugs and pull requests for proposed changes. Include steps to reproduce and synthetic examples. Useful initial work includes reproducible setup, task persistence, completion controls, and authentication/billing integration tests.

Never include account emails, student records, credentials, private notes, or real payment information in issues, screenshots, fixtures, or commits. The `.gitignore` helps prevent accidental local-file commits but does not remove anything already present in Git history. For a sensitive report, contact the maintainer privately through GitHub if available; do not post the sensitive details in a public issue.

## License

MIT. See [LICENSE](LICENSE). Dependencies remain subject to their respective licenses.
