import { ViewUpdateModule } from './view-update.module';

describe('ViewUpdateModule', () => {
  let viewUpdateModule: ViewUpdateModule;

  beforeEach(() => {
    viewUpdateModule = new ViewUpdateModule();
  });

  it('should create an instance', () => {
    expect(viewUpdateModule).toBeTruthy();
  });
});
