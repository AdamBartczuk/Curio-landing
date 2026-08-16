/**
 * Guards the build against shipping a blank map.
 *
 * PUBLIC_MAPBOX_TOKEN is read by src/components/CityWalk.astro. When it is
 * missing the build still succeeds — Astro just inlines an empty string, the
 * map renders blank and nothing anywhere says why. That is the failure this
 * catches.
 *
 * In CI a missing token fails the build, because a green deploy with a broken
 * centrepiece is worse than a red one. Locally it only warns, so you can work
 * on the rest of the page without a token.
 */

const REQUIRED = [
  {
    name: "PUBLIC_MAPBOX_TOKEN",
    used: "src/components/CityWalk.astro — the Yanaka map",
    how: "CI: the PUBLIC_MAPBOX_TOKEN repository secret. Local: copy .env.example to .env.",
  },
];

// GitHub Actions sets CI; so does every other CI worth deploying from.
const isDeploy = Boolean(process.env.CI);

const missing = REQUIRED.filter(({ name }) => !process.env[name]?.trim());

if (missing.length === 0) {
  process.exit(0);
}

const report = missing
  .map(({ name, used, how }) => `  ${name}\n    used by: ${used}\n    set it:  ${how}`)
  .join("\n");

if (isDeploy) {
  console.error(`\nMissing required environment variable(s):\n${report}\n`);
  process.exit(1);
}

console.warn(
  `\nWarning: missing environment variable(s):\n${report}\n` +
    `Building anyway because this is not a deploy. The map will render blank.\n`,
);
