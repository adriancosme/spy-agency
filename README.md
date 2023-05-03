# Spy agency

## Introduction
We’re building a simple tool for an international spy agency. The agency conducts
planned assassinations and has done so for decades. But it needs a new system
to assign assassinations (“hits”).
The general user is a hitman. He can be assigned a hit and see it on his list of
upcoming work. Typically, it succeeds and is closed out. But occasionally things
don’t work out and the target lives. In those cases, we assume the target hires
security and thus the case is forever closed, as a failed mission.
Like everyone else, hitmen have bosses. These are directly in charge of a group
of hitmen and can create hits and assign them. But they can only assign hits
to the hitmen they manage.
Finally, there’s the big boss of the agency - Giuseppi . He does not manage managers directly.
Rather, he just has free access to assign hits to anyone in the system. Even managers.
But when a new employee comes into the spy agency, he need not be added to The Boss’
list. It’s automatic.
The boss is also in charge of assigning hitmen to managers. Only he can do that.
For simplicity, the boss is always the ﬁrst user in the database. No special
indications need to be added to ﬂag the user as the boss.
Sadly, our hitmen do occasionally die in the ﬁeld. Or worse, retire from the industry.
In this case, they can no longer be assigned hits and can no longer use the system.
Managers and The Boss can however, still check old assignments for these hitmen.

## Goal
This is a very subjective exercise. But overall, the goal is to build a platform that has the highest developer performance as possible. What is developer performance? It’s subtle, and hard to deﬁne. But I know
it when I see it. Think ergonomics. Think productivity.
Think about what is the best architecture that achieves a good balance between:
1. Ease of adding new features,
2. Ease of maintaining existing features.
3. Speed of delivering the above (time to market).
4. Ease of adding testing, both manual and automated, in isolation.
5. Conforming https://12factor.net/
6. Ease of deployment.
7. Ease of refactor.
8. Ease of monitoring.
9. Ease of distributing development load.
There’s no right answer, but a combination of the above should be a good start. You’ll notice a common word though: ease.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `api`: a [Nestjs](https://nestjs.com/) app for backend
- `web`: another [Next.js](https://nextjs.org/) app for frontend
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd spy-agency
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd spy-agency
pnpm dev
```
