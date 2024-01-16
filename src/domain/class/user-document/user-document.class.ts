import { InvalidDocumentException } from './user-document.exception';

export class UserDocument {
  constructor(readonly value: string) {}

  static create(documentToCheck: string) {
    const digits = documentToCheck?.replace(/[^\d]/g, '');

    if (digits?.length === 11) {
      if (!UserDocument.validateCPF(digits)) {
        throw new InvalidDocumentException(documentToCheck);
      }
      return new UserDocument(digits);
    }

    if (digits?.length === 14) {
      if (!UserDocument.validateCNPJ(digits)) {
        throw new InvalidDocumentException(documentToCheck);
      }
      return new UserDocument(digits);
    }

    throw new InvalidDocumentException(documentToCheck);
  }

  static validateCPF(digitsCPF: string) {
    if (digitsCPF?.length !== 11) return false;
    if (/^(\d)\1+$/.test(digitsCPF)) return false;

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(digitsCPF.charAt(i)) * (10 - i);
    }

    const validFirstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digitsCPF.charAt(i)) * (11 - i);
    }
    const validSecondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return (
      parseInt(digitsCPF.charAt(9)) === validFirstDigit &&
      parseInt(digitsCPF.charAt(10)) === validSecondDigit
    );
  }

  private static validateCNPJ(digitsCNPJ: string) {
    const validFirstDigit = this.getVerificationValidFirstDigitCNPJ(digitsCNPJ);
    const validSecondDigit =
      this.getVerificationValidSecondDigitCNPJ(digitsCNPJ);

    return (
      parseInt(digitsCNPJ.charAt(12)) === validFirstDigit &&
      parseInt(digitsCNPJ.charAt(13)) === validSecondDigit
    );
  }

  private static getVerificationValidFirstDigitCNPJ(digitsCNPJ: string) {
    let sum = 0;
    const factors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const numbers = digitsCNPJ.split('');

    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers[i]) * factors[i];
    }

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  private static getVerificationValidSecondDigitCNPJ(digitsCNPJ: string) {
    let sum = 0;
    const factors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const numbers = digitsCNPJ.split('');

    for (let i = 0; i < 13; i++) {
      sum += parseInt(numbers[i]) * factors[i];
    }

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }
}
