import { test, expect } from '@playwright/test';

test.describe('App 4 - Arduino no Celular E2E', () => {
  const BASE_PATH = '/Arduino-no-Celular-10-projetos-controlados-pelo-seu-celular/#/';

  test('01: Página inicial carrega os 10 projetos com aviso de iPhone e sem erros de console', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BASE_PATH);
    await expect(page.locator('h1')).toContainText('Controle o Arduino pelo celular');

    // Verificar aviso do iPhone
    await expect(page.locator('text=Aviso importante sobre iPhone (iOS) e Android')).toBeVisible();

    // Checar presença dos 10 cards de projetos
    const cards = page.locator('a[href*="/projeto/"]');
    await expect(cards).toHaveCount(10);

    const vp = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: `screenshots/${vp}/01-home.png`, fullPage: false });
    expect(consoleErrors).toEqual([]);
  });

  test('02: Detalhes do projeto exibe diagrama SVG com divisor de tensão e tabela de comandos', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_PATH}projeto/1`);
    await expect(page.locator('h1')).toContainText('Ligar e Desligar LED pelo Celular');

    // Verificar presença do diagrama elétrico em SVG
    await expect(page.locator('svg[aria-label*="Diagrama"]').first()).toBeVisible();

    // Tabela de comandos com comandos '1' e '0'
    await expect(page.locator('text=Tabela de Comandos para o Celular')).toBeVisible();
    await expect(page.locator('span:has-text("1")').first()).toBeVisible();
    await expect(page.locator('span:has-text("0")').first()).toBeVisible();

    // Passo a passo de montagem clicável
    const passo1 = page.locator('text=Alimente o barramento da protoboard');
    await expect(passo1).toBeVisible();
    await passo1.click();

    // Código Arduino presente
    await expect(page.locator('text=SoftwareSerial').first()).toBeVisible();

    const vp = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: `screenshots/${vp}/02-projeto-detalhe.png`, fullPage: false });
    expect(consoleErrors).toEqual([]);
  });

  test('03: Comece Aqui apresenta os 10 Mandamentos do Bluetooth e lista de compras', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_PATH}comece-aqui`);
    await expect(page.locator('h1')).toContainText('Os 10 Mandamentos do Bluetooth');

    // Mandamento 2 (divisor) e Mandamento 7 (iPhone)
    await expect(page.locator('text=O Pino RX é 3.3V! Use Sempre o Divisor de Tensão')).toBeVisible();
    await expect(page.locator('text=ALERTA IPHONE (iOS): HC-05 NÃO Funciona na Apple!')).toBeVisible();

    // Lista de compras
    await expect(page.locator('text=Lista de Compras para os 10 Projetos')).toBeVisible();
    await expect(page.locator('strong:has-text("Módulo Bluetooth HC-05")')).toBeVisible();

    const vp = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: `screenshots/${vp}/03-comece-aqui.png`, fullPage: false });
    expect(consoleErrors).toEqual([]);
  });

  test('04: Simulador de terminal permite testar comandos com resposta interativa', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_PATH}simulador`);
    await expect(page.locator('h1')).toContainText('Simulador de Terminal Bluetooth');

    // Clicar no botão macro [1] Ligar
    const btnLigar = page.getByRole('button', { name: '[1] Ligar' });
    await expect(btnLigar).toBeVisible();
    await btnLigar.click();

    // Verificar se o log e o LED atualizaram
    await expect(page.locator('text=LED ACESO')).toBeVisible();
    await expect(page.locator('text=ACESO (HIGH / 5V)')).toBeVisible();

    // Clicar no botão macro [0] Desligar
    const btnDesligar = page.getByRole('button', { name: '[0] Desligar' });
    await btnDesligar.click();
    await expect(page.locator('text=LED APAGADO')).toBeVisible();

    const vp = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: `screenshots/${vp}/04-simulador.png`, fullPage: false });
    expect(consoleErrors).toEqual([]);
  });

  test('05: Checklist antes de ligar permite marcar e persistir conferências', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_PATH}checklist`);
    await expect(page.locator('h1')).toContainText('Checklist: Antes de Ligar o Bluetooth');

    // Marcar primeiro item
    const primeiroItem = page.locator('button[aria-pressed]').first();
    await expect(primeiroItem).toBeVisible();
    await primeiroItem.click();
    await expect(primeiroItem).toHaveAttribute('aria-pressed', 'true');

    const vp = isMobile ? 'mobile' : 'desktop';
    await page.screenshot({ path: `screenshots/${vp}/05-checklist.png`, fullPage: false });
    expect(consoleErrors).toEqual([]);
  });
});
