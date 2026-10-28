import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ARDUINO_CLI = '/Users/felipecardozo/.local/bin/arduino-cli';
const FQBN = 'arduino:avr:uno';
const SKETCHES_DIR = path.resolve(process.cwd(), 'sketches');

console.log(`[VERIFICAÇÃO ARDUINO NO CELULAR] Compilando sketches com ${ARDUINO_CLI} para ${FQBN}...\n`);

const entries = fs.readdirSync(SKETCHES_DIR, { withFileTypes: true });
const sketchDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();

let total = 0;
let sucessos = 0;
const falhas: string[] = [];

for (const dirName of sketchDirs) {
  const dirPath = path.join(SKETCHES_DIR, dirName);
  const inoFiles = fs.readdirSync(dirPath).filter((f) => f.endsWith('.ino'));
  if (inoFiles.length === 0) continue;

  const inoPath = path.join(dirPath, inoFiles[0]);
  total++;
  process.stdout.write(`Compilando ${dirName}... `);

  try {
    execSync(`"${ARDUINO_CLI}" compile --fqbn ${FQBN} "${inoPath}"`, {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 30000,
    });
    console.log('OK');
    sucessos++;
  } catch (err: unknown) {
    const errorMsg = (err as { stderr?: Buffer; stdout?: Buffer }).stderr?.toString() ||
                     (err as { stdout?: Buffer }).stdout?.toString() ||
                     String(err);
    console.log('FALHOU');
    console.error(`\n[ERRO EM ${dirName}]:\n${errorMsg}\n`);
    falhas.push(dirName);
  }
}

console.log('\n========================================');
console.log(`Total compilado: ${sucessos}/${total}`);
if (falhas.length > 0) {
  console.error(`[ERRO] ${falhas.length} sketch(es) falharam: ${falhas.join(', ')}`);
  process.exit(1);
} else {
  console.log('[SUCESSO] Todos os projetos Bluetooth compilam perfeitamente sem erros!');
}
