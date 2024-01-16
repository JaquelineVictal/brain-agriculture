import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsAreaTotalValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAreaTotalValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const areaTotal = value;
          const areaAgricultural = args.object['areaAgricultural'];
          const areaVegetation = args.object['areaVegetation'];

          return areaTotal >= areaAgricultural + areaVegetation;
        },
        defaultMessage() {
          return 'areaTotal must not be less than the sum of areaAgricultural and areaVegetation';
        },
      },
    });
  };
}
