//=== UqApp builder created on Sun Dec 20 2020 22:25:15 GMT-0500 (GMT-05:00) ===//
import { Test } from './Test';
import { CustomerPayment } from './CustomerPayment';

export interface UQs {
	Test: Test.UqTest;
	CustomerPayment: CustomerPayment.UqCustomerPayment;
}


export type {Test} from './Test';
export type {CustomerPayment} from './CustomerPayment';
