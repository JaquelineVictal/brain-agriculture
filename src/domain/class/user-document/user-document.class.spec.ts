import { UserDocument } from './user-document.class';

const successScenarios = [
  {
    input: '314.511.450-63',
    shouldBeValid: 'valid',
    result: '31451145063',
  },
  {
    input: '31451145063',
    shouldBeValid: 'valid',
    result: '31451145063',
  },
  {
    input: '85895405000198',
    shouldBeValid: 'valid',
    result: '85895405000198',
  },
  {
    input: '62.410.074/0001-53',
    shouldBeValid: 'valid',
    result: '62410074000153',
  },
];

const errorScenarios = [
  {
    input: '3145114',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '314.511.450-65',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '000.000.000-00',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '111.111.111-11',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '222.222.222-22',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '333.333.333-33',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '444.444.444-44',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '555.555.555-55',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '666.666.666-66',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '777.777.777-77',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '888.888.888-88',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '999.999.999-99',
    shouldBeValid: 'invalid',
    result: Error,
  },
  {
    input: '11.222.333/0001-83',
    shouldBeValid: 'invalid',
    result: Error,
  },
];

describe('Document', () => {
  it.each(successScenarios)(
    `the $input is $shouldBeValid`,
    async ({ input, result }) => {
      const validationErrors = UserDocument.create(input);

      expect(validationErrors).toBeInstanceOf(UserDocument);
      expect(validationErrors.value).toEqual(result);
    },
  );
  it.each(errorScenarios)(`the $input is $shouldBeValid`, async ({ input }) => {
    expect(() => {
      UserDocument.create(input);
    }).toThrow();
  });
});
