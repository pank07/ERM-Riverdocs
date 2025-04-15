import { UserDetailsPipe } from './user-details.pipe';

describe('UserDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new UserDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
