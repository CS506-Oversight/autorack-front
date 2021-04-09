# autorack-front

[![badge-ci]][badge-ci-link]
[![badge-cq]][badge-cq-link]
[![badge-coverage]][badge-cq-link]

Frontend of AutoRack.

## Environment Variables

### `REACT_APP_API_ROOT`

Required.

Root URL of the backend. This should **not** end with a slash (`/`).

### `CI`

Optional.

Indicate if the app is running in CI. Set this to `1` to indicate that the app is running in CI.

## Getting Started

1. Run `npm install` for installing all required dependencies.

2. Start the app.

- To run the app in development, run `npm run start`.

- To run the app in production, run `npm run build` then `serve -s build`. Note that this only serves the app
  statically.

> Check the command notes below for more details.

## Development Notes

Make sure to run `precommit.sh` before committing the code.

Create tests before developing whenever it's possible.

## Command Notes

### `npm run build`

Builds the app for production. Generated files should locate at `build/`.

After building these files, run `serve -s build` for serving the app statically.

- Files generated by this command should not be committed
  (`.gitignore` already configured to ignore the files coming from the directory `build/`).

- For running the production app on Heroku, check the Deployment Notes below.

### `npm run start`

Starts the development server.

Files will be hot-reloaded, meaning that if the file is changed, the app will automatically reload to reflect the
changes.

**Do not use this command for running the production app.**
Check the description of `npm run build` for running the production build.

### `npm run test`

Run the tests via `jest` locally. All testing files should have `.test.ts` extension.

- Remember to start the backend first to prevent any unexpected behavior.

- Set the environment variable `CI` to `1` enables the CI-specific behavior.

### `npm run lint`

Lint the TypeScript code located in `src` via `eslint`.

- There is a subcommand `npm run lint:fix` for automatically fixing the code. This command should **not** run
  automatically.

## Deployment Notes

### Heroku

Add buildpack `https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz`
to the Heroku app, then deploy the code. The app should be available after building and releasing the app.

[badge-ci]: https://github.com/CS506-Oversight/autorack-front/workflows/Node%20CI/badge.svg

[badge-ci-link]: https://github.com/CS506-Oversight/autorack-front/actions?query=workflow%3A%22Node+CI%22

[badge-cq-link]: https://www.codacy.com/gh/CS506-Oversight/autorack-front/dashboard

[badge-cq]: https://app.codacy.com/project/badge/Grade/6e097d0fb8864550bc4f952a843514af

[badge-coverage]: https://app.codacy.com/project/badge/Coverage/6e097d0fb8864550bc4f952a843514af
