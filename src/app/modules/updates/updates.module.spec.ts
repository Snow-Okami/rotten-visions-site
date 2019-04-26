import { UpdatesModule } from './updates.module';

describe('UpdatesModule', () => {
  let updatesModule: UpdatesModule;

  beforeEach(() => {
    updatesModule = new UpdatesModule();
  });

  it('should create an instance', () => {
    expect(updatesModule).toBeTruthy();
  });
});
