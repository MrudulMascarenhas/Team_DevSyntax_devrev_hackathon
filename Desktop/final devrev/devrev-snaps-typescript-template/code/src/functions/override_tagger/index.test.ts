import { testRunner } from '../../test-runner/test-runner';
describe('Example Index Test file', () => {
  it('Testing the method', () => {
    testRunner({
      fixturePath: 'override_tagger_event.json',
      functionName: 'override_tagger',
    });
  });
});