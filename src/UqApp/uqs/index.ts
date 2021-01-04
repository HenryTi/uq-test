//=== UqApp builder created on Thu Dec 31 2020 16:32:52 GMT-0500 (GMT-05:00) ===//
import { Test } from './Test';
import { CustomerPayment } from './CustomerPayment';

export interface UQs {
	Test: Test.UqTest;
	CustomerPayment: CustomerPayment.UqCustomerPayment;
}


export type {Test} from './Test';
export type {CustomerPayment} from './CustomerPayment';
