import { CustomerPayment, Test, UQs } from "UqApp";

export async function testOrder(uqs: UQs) {
	let order: CustomerPayment.SheetOrder = {
		customer: 1,		
		detail: [
			{ product: 2, pack: 3, quantity: 5, amount: 3.3},
			{ product: 11, pack: 111, quantity: 5.11, amount: 3.31}
		],
	};
	let ret = await uqs.CustomerPayment.Order.save('order test', order);
	return ret;
}
