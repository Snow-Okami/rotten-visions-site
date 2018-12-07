import { NameonlyPipe } from './nameonly.pipe';

describe('NameonlyPipe', () => {
  it('create an instance', () => {
    const pipe = new NameonlyPipe();
    expect(pipe).toBeTruthy();
  });
});
