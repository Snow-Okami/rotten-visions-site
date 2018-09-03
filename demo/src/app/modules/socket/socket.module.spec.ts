import { SocketModule } from './socket.module';

describe('SocketModule', () => {
  let socketModule: SocketModule;

  beforeEach(() => {
    socketModule = new SocketModule();
  });

  it('should create an instance', () => {
    expect(socketModule).toBeTruthy();
  });
});
