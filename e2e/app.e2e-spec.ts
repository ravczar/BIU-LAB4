import { PeopleTablePage } from './app.po';

describe('people-table App', () => {
  let page: PeopleTablePage;

  beforeEach(() => {
    page = new PeopleTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
