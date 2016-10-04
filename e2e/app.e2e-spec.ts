import { VrepPage } from './app.po';

describe('vrep App', function() {
  let page: VrepPage;

  beforeEach(() => {
    page = new VrepPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
