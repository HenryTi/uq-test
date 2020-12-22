//=== UqApp builder created on Mon Dec 21 2020 19:47:55 GMT-0500 (GMT-05:00) ===//
import { UqTuid, UqQuery, UqAction, UqSheet/*, Map, Tag*/ } from "tonva";

//===============================
//======= UQ BizDev/customer-payment ========
//===============================
export namespace CustomerPayment {
export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	roles: number;
	poke: number;
}

export interface Tuid$sheet {
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export enum UqEnumCustomerAction {
	order = 1,
	confirm = 2,
	payDirect = 10,
	payReceivable = 11,
	deposit = 12,
	payReturn = 13,
	invoice = 20,
	invoicePre = 21,
	deliver = 30,
	return = 31,
	cancel = 100,
	red = 101
};

export enum UqEnumPendingDone {
	pending = 0,
	done = 1,
	cancel = -1,
	red = -2
};

export interface SheetDeliver {
	customer: number;
	detail: {
		pendingId: number;
		quantity: any;
	}[];
}

export interface SheetDeposit {
	customer: number;
	deposit: any;
	receiptNo: string;
	bankReceiptNo: string;}

export interface SheetInvoice {
	customer: number;
	detail: {
		pendingId: number;
		amount: any;
	}[];
}

export interface SheetOrder {
	customer: number;
	detail: {
		product: number;
		pack: number;
		quantity: any;
		amount: any;
	}[];
}

export interface SheetReceive {
	customer: number;
	order: number;
	amount: any;
	rows: {
		pendingId: number;
		orderInRow: number;
		row: number;
		rowAmount: any;
	}[];
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamCustomerPendingDeliver {
	customer: number;
}
interface ReturnCustomerPendingDeliverRet {
	id: number;
	sheet: number;
	row: number;
	quantity: any;
}
interface ResultCustomerPendingDeliver {
	ret: ReturnCustomerPendingDeliverRet[];
}

export interface ParamCustomerPendingInvoice {
	customer: number;
}
interface ReturnCustomerPendingInvoiceRet {
	id: number;
	sheet: number;
	row: number;
	amount: any;
}
interface ResultCustomerPendingInvoice {
	ret: ReturnCustomerPendingInvoiceRet[];
}

export interface ParamCustomerPendingReceivable {
	customer: number;
}
interface ReturnCustomerPendingReceivableRet {
	id: number;
	sheet: number;
	row: number;
	amount: any;
}
interface ResultCustomerPendingReceivable {
	ret: ReturnCustomerPendingReceivableRet[];
}

export interface ParamGetCustomerBalance {
	customer: number;
}
interface ReturnGetCustomerBalanceRet {
	customer: number;
	deposit: any;
	receivable: any;
	invoiceShould: any;
	invoicePre: any;
	$id: number;
}
interface ResultGetCustomerBalance {
	ret: ReturnGetCustomerBalanceRet[];
}

export interface ParamGetCustomerHistory {
	customer: number;
	before: any;
}
interface ReturnGetCustomerHistory$page {
	date: any;
	customer: number;
	action: number;
	sheet: number;
	row: number;
	$id: number;
}
interface ResultGetCustomerHistory {
	$page: ReturnGetCustomerHistory$page[];
}


export interface UqCustomerPayment {
	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Deliver: UqSheet<SheetDeliver>;
	Deposit: UqSheet<SheetDeposit>;
	Invoice: UqSheet<SheetInvoice>;
	Order: UqSheet<SheetOrder>;
	Receive: UqSheet<SheetReceive>;
	$poked: UqQuery<Param$poked, Result$poked>;
	CustomerPendingDeliver: UqQuery<ParamCustomerPendingDeliver, ResultCustomerPendingDeliver>;
	CustomerPendingInvoice: UqQuery<ParamCustomerPendingInvoice, ResultCustomerPendingInvoice>;
	CustomerPendingReceivable: UqQuery<ParamCustomerPendingReceivable, ResultCustomerPendingReceivable>;
	GetCustomerBalance: UqQuery<ParamGetCustomerBalance, ResultGetCustomerBalance>;
	GetCustomerHistory: UqQuery<ParamGetCustomerHistory, ResultGetCustomerHistory>;
}
}


