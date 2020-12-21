import { CustomerPayment, Test, UQs } from "UqApp";
import { data } from "./mock-data";

export async function testCustomerPay(uqs: UQs) {
	let ret1 = await uqs.CustomerPayment.Order.save('order test', data.order1);
	let ret2 = await uqs.CustomerPayment.Order.save('order test', data.order2);
	return [ret1, ret2];
}
