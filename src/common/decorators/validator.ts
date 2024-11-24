import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
// import { isAddress } from "ethers/lib/utils";

@ValidatorConstraint({ name: "error", async: false })
export class IsContractAddress implements ValidatorConstraintInterface {
  validate(_text: string, _args: ValidationArguments) {
    return true;
    // return isAddress(text);
  }

  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "Contract address is invalid";
  }
}
