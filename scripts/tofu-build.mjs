import { spawnSync } from 'node:child_process';
import { copyFileSync, renameSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Keep the upstream Parcel pipeline intact; publish a self-contained static folder.
// Parcel builds into dist/. The finished site is then moved to site/, because Tofu's GitHub import
// drops every folder named dist. (Pointing Parcel at site/ with --dist-dir would change its internal
// bundle ids, so the shipped files would no longer match the build that was checked.)
const root = fileURLToPath(new URL('../', import.meta.url));
const built = new URL('../dist/', import.meta.url);
const output = new URL('../site/', import.meta.url);
rmSync(built, { recursive: true, force: true });
rmSync(output, { recursive: true, force: true });

for (const args of [
    ['run', 'icon:build'],
    ['run', 'lang:build'],
    ['run', 'build', '--', '--no-source-maps'],
]) {
    const result = spawnSync('npm', args, {
        cwd: root,
        stdio: 'inherit',
        env: { ...process.env, PARCEL_WORKERS: process.env.PARCEL_WORKERS || '2' },
    });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status || 1);
}

renameSync(built, output);

for (const name of ['LICENSE', 'TOFU.md']) {
    copyFileSync(new URL(`../${name}`, import.meta.url), new URL(name, output));
}
