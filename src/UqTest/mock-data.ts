import { CustomerPayment } from "UqApp";

const customer1 = 1;

const order1: CustomerPayment.SheetOrder = {
	customer: customer1,
	detail: [
		{ product: 2, pack: 3, quantity: 5, amount: 3.3},
		{ product: 3, pack: 111, quantity: 5.11, amount: 3.31}
	],
};

const order2: CustomerPayment.SheetOrder = {
	customer: customer1,
	detail: [
		{ product: 4, pack: 3, quantity: 5, amount: 3.3},
		{ product: 5, pack: 111, quantity: 5.11, amount: 3.31},
		{ product: 6, pack: 111, quantity: 5.11, amount: 3.31}
	],
};

export const data = {
	customer1,
	order1,
	order2,
};
