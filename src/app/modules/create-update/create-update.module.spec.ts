import { CreateUpdateModule } from './create-update.module';

describe('CreateUpdateModule', () => {
  let createUpdateModule: CreateUpdateModule;

  beforeEach(() => {
    createUpdateModule = new CreateUpdateModule();
  });

  it('should create an instance', () => {
    expect(createUpdateModule).toBeTruthy();
  });
});
