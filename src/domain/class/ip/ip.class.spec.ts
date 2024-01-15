import { Ip } from './ip.class';

const testScenarios = [
  {
    input: '192.168.0.1',
    shouldBeValid: true,
  },
  {
    input: '10.0.0.1',
    shouldBeValid: true,
  },
  {
    input: '172.16.0.1',
    shouldBeValid: true,
  },
  {
    input: '255.255.255.255',
    shouldBeValid: true,
  },
  {
    input: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    shouldBeValid: true,
  },
  {
    input: '2001:db8::ff00:42:8329',
    shouldBeValid: true,
  },
  {
    input: 'fe80::1',
    shouldBeValid: true,
  },
  {
    input: '256.0.0.1',
    shouldBeValid: false,
  },
  {
    input: '192.168.0.',
    shouldBeValid: false,
  },
  {
    input: '2001:0db8:85a3:0000:0000:8a2e:0370:7334:abcd',
    shouldBeValid: false,
  },
  {
    input: 'invalid_ip',
    shouldBeValid: false,
  },
];

describe('Ip', () => {
  for (const { input, shouldBeValid } of testScenarios) {
    it(`the ${input} is ${shouldBeValid ? '' : 'in'}valid`, async () => {
      const validationErrors = Ip.validate(input);

      if (shouldBeValid) {
        expect(validationErrors).toBeTruthy;
      } else {
        expect(validationErrors).toBeFalsy;
      }
    });
  }
});
