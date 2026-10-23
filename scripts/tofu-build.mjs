import { spawnSync } from 'node:child_process';
import { copyFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Keep the upstream Parcel pipeline intact; publish a self-contained static folder.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = new URL('../dist/', import.meta.url);
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

for (const name of ['LICENSE', 'TOFU.md']) {
    copyFileSync(new URL(`../${name}`, import.meta.url), new URL(name, output));
}
