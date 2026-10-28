import { describe, it, expect } from 'vitest';
import { PROJETOS_CELULAR } from '../../src/content/projetosCelular';
import { MANDAMENTOS_BLUETOOTH, CHECKLIST_ANTES_DE_LIGAR, LISTA_DE_COMPRAS } from '../../src/content/comeceAqui';

describe('App 4 - Conteúdo dos 10 Projetos Bluetooth', () => {
  it('deve conter exatamente 10 projetos prontos', () => {
    expect(PROJETOS_CELULAR).toHaveLength(10);
  });

  it('deve ter números de 1 a 10 sequenciais', () => {
    const numeros = PROJETOS_CELULAR.map((p) => p.numero);
    for (let i = 1; i <= 10; i++) {
      expect(numeros).toContain(i);
    }
  });

  it('cada projeto deve ter peças, comandos e passos de montagem', () => {
    for (const p of PROJETOS_CELULAR) {
      expect(p.titulo.trim().length).toBeGreaterThan(0);
      expect(p.subtitulo.trim().length).toBeGreaterThan(0);
      expect(p.objetivo.trim().length).toBeGreaterThan(0);
      expect(p.pecas.length).toBeGreaterThanOrEqual(4);
      expect(p.comandos.length).toBeGreaterThanOrEqual(1);
      expect(p.passosMontagem.length).toBeGreaterThanOrEqual(3);
      expect(p.comoParear.length).toBeGreaterThanOrEqual(4);
      expect(p.seNaoResponder).toHaveLength(4);
    }
  });

  it('todos os códigos devem usar SoftwareSerial nos pinos 2 e 3 e conter setup e loop', () => {
    for (const p of PROJETOS_CELULAR) {
      expect(p.codigoFonte).toContain('SoftwareSerial');
      expect(p.codigoFonte).toContain('void setup()');
      expect(p.codigoFonte).toContain('void loop()');
    }
  });
});

describe('App 4 - Os 10 Mandamentos do Bluetooth', () => {
  it('deve conter 10 mandamentos de bancada', () => {
    expect(MANDAMENTOS_BLUETOOTH).toHaveLength(10);
    for (let i = 0; i < 10; i++) {
      expect(MANDAMENTOS_BLUETOOTH[i].id).toBe(i + 1);
      expect(MANDAMENTOS_BLUETOOTH[i].titulo.length).toBeGreaterThan(5);
      expect(MANDAMENTOS_BLUETOOTH[i].destaque.length).toBeGreaterThan(5);
      expect(MANDAMENTOS_BLUETOOTH[i].explicacao.length).toBeGreaterThan(20);
    }
  });

  it('deve alertar explicitamente sobre o divisor de tensão e sobre o iPhone', () => {
    const titulos = MANDAMENTOS_BLUETOOTH.map((m) => m.titulo);
    const divisor = titulos.some((t) => t.includes('Divisor de Tensão') || t.includes('RX'));
    const iphone = titulos.some((t) => t.includes('IPHONE') || t.includes('iPhone'));
    expect(divisor).toBe(true);
    expect(iphone).toBe(true);
  });
});

describe('App 4 - Checklist e Lista de Compras', () => {
  it('o checklist deve ter 6 itens de segurança', () => {
    expect(CHECKLIST_ANTES_DE_LIGAR).toHaveLength(6);
    for (const item of CHECKLIST_ANTES_DE_LIGAR) {
      expect(item.titulo.length).toBeGreaterThan(5);
      expect(item.descricao.length).toBeGreaterThan(10);
    }
  });

  it('a lista de compras deve conter HC-05 e resistores do divisor', () => {
    const nomes = LISTA_DE_COMPRAS.map((c) => c.nome);
    const temHC = nomes.some((n) => n.includes('HC-05') || n.includes('Bluetooth'));
    const tem1k = nomes.some((n) => n.includes('1 kΩ'));
    expect(temHC).toBe(true);
    expect(tem1k).toBe(true);
  });
});
