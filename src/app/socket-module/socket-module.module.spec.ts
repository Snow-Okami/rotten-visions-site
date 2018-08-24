import { SocketModuleModule } from './socket-module.module';

describe('SocketModuleModule', () => {
  let socketModuleModule: SocketModuleModule;

  beforeEach(() => {
    socketModuleModule = new SocketModuleModule();
  });

  it('should create an instance', () => {
    expect(socketModuleModule).toBeTruthy();
  });
});
