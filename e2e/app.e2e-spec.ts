import { ControleFinanceiroPage } from './app.po';

describe('controle-financeiro App', () => {
  let page: ControleFinanceiroPage;

  beforeEach(() => {
    page = new ControleFinanceiroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
