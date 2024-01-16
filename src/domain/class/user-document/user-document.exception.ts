import { EXCEPTION_CODE } from '../abstract-exception/exception-code.enum';
import { AbstractException } from '../abstract-exception/exception.abstract';

export class InvalidDocumentException extends AbstractException {
  readonly code = EXCEPTION_CODE.INVALID_INPUT;

  constructor(document: string) {
    super(`the document ${document} is invalid`);
    this.add('document', document);
  }
}
