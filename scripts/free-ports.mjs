#!/usr/bin/env node
/**
 * Free the given TCP ports before starting dev servers, so `yarn dev` always
 * claims its ports even if something is squatting on them.
 *
 * Uses `lsof -nP` (no host/port *name* resolution) so it never blocks on DNS —
 * the reason the `kill-port` package hung here — plus a hard per-lookup timeout
 * as a safety net. Only LISTEN sockets on the *exact* ports are killed. macOS /
 * Linux only; on other platforms it no-ops. Always exits 0 so a `&&` chain
 * proceeds whether or not a port was busy.
 *
 * Usage: node scripts/free-ports.mjs 5173 4000
 */
import { spawnSync } from 'node:child_process';

const ports = process.argv.slice(2).filter((p) => /^\d+$/.test(p));

if (ports.length && process.platform !== 'win32') {
  for (const port of ports) {
    const res = spawnSync('lsof', ['-nP', '-sTCP:LISTEN', `-tiTCP:${port}`], {
      encoding: 'utf8',
      timeout: 4000,
    });
    const pids = (res.stdout || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const pid of pids) {
      try {
        process.kill(Number(pid), 'SIGKILL');
        console.log(`free-ports: freed :${port} (killed pid ${pid})`);
      } catch {
        /* process already gone — ignore */
      }
    }
  }
}

process.exit(0);
