//=== UqApp builder created on Mon Dec 21 2020 19:47:55 GMT-0500 (GMT-05:00) ===//
import { Test } from './Test';
import { CustomerPayment } from './CustomerPayment';

export interface UQs {
	Test: Test.UqTest;
	CustomerPayment: CustomerPayment.UqCustomerPayment;
}


export type {Test} from './Test';
export type {CustomerPayment} from './CustomerPayment';
