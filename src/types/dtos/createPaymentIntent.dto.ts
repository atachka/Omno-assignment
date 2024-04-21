interface BillingInfo {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  externalUserId: string;
}

interface PaymentDTO {
  amount: number;
  currency: string;
  callback: string;
  callbackFail: string;
  lang: string;
  hookUrl: string;
  status: string;
  billing: BillingInfo;
}

export default PaymentDTO;
