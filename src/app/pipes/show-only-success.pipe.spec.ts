import { ShowOnlySuccessPipe } from './show-only-success.pipe';

describe('ShowOnlySuccessPipe', () => {
  it('create an instance', () => {
    const pipe = new ShowOnlySuccessPipe();
    expect(pipe).toBeTruthy();
  });
});
