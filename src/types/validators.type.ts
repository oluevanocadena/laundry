import { FormControl, ValidationErrors, Validators } from "@angular/forms";

function whitespaceValidator(form: FormControl): ValidationErrors {
  return form?.value?.toString().startsWith(" ") ? { whitespace: true } : {};
}

export const validators = {
  Required: [Validators.required, whitespaceValidator],
  DiscountCode: [Validators.required, Validators.minLength(6), Validators.pattern("^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_-]*$")],
  CheckboxRequired: [Validators.requiredTrue],
  Email: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
  Phone: [Validators.required, Validators.pattern(/^\+\d{1,4}\d{10}$/)],
  Password: [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})\S+$/)],
  Time: [Validators.required, Validators.pattern("^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM|am|pm)$")],
  Price: [Validators.required, Validators.pattern("^([0-9]*[1-9][0-9]*(\.[0-9]{1,2}))$|^([0-9]*[0-9][0-9]*(\.[0-9]{1,2}))$|^[1-9][0-9]*$")],
  PriceFourDecimal: [Validators.required, Validators.pattern("^([0-9]*[1-9][0-9]*(\.[0-9]{1,4}))$|^([0-9]*[0-9][0-9]*(\.[0-9]{1,4}))$|^[1-9][0-9]*$")],
  PriceZero: [Validators.required, Validators.pattern("^(?=1*[0-9])[0-9]*[.,]?[0-9]{1,2}$")],
  Percentage: [Validators.required, Validators.pattern("^([1-9]|([1-9][0-9])|100)$")],
  ZeroOrMore: [Validators.required, Validators.pattern("^[0-9][0-9]*$")],
  OneWord: [Validators.required, Validators.pattern("^[A-Za-z]*$")],
  SATRfc: [Validators.required, Validators.pattern('^([a-zA-ZÑ&]{3,4})?(?:-?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01]))?(?:-?)?([a-zA-Z\\d]{2})([A\\d])$')],
  Curp: [Validators.required, Validators.pattern('^[A-Za-z]{4}[0-9]{6}[HMhm]{1}[A-Za-z]{2}[BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz]{3}([A-Za-z]{2})?([0-9]{2})?$')],
  NSS: [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
  ZipCode: [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern(/^[0-9]{4,6}$/)]
}