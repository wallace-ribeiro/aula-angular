import { NovoexemploPage } from './app.po';

describe('novoexemplo App', function() {
  let page: NovoexemploPage;

  beforeEach(() => {
    page = new NovoexemploPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
