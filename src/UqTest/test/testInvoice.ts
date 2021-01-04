import _ from 'lodash';
import { SheetSaveReturn } from 'tonva';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { pickRandomArr, UQsTester } from "./tools";

export async function testInvoice(tester: UQsTester) {
	let {Order} = tester.uqs.CustomerPayment;

	tester.log();
	tester.log('先开票一半');
	await tester.test(invoice(tester, 50));
	tester.log();
	tester.log('再开一半的一半');
	await tester.test(invoice(tester, 50));
	tester.log();
	tester.log('再开全部剩下的');
	await tester.test(invoice(tester, 100));

	// 再看全部应开发票
	tester.log();
	tester.log('== customer pending invoice');
	let {CustomerPendingInvoice} = tester.uqs.CustomerPayment;
	await tester.test(CustomerPendingInvoice.query({customer: data.customer1}));
}

async function invoice(tester: UQsTester, percent: number) {
	let {uqs} = tester;
	tester.log();
	tester.log('== customer invoice');
	let {CustomerPendingInvoice} = uqs.CustomerPayment;
	let queryInvoice = await tester.test(CustomerPendingInvoice.query({customer: data.customer1}));
	if (queryInvoice.ret.length === 0) {
		tester.log('no pending invoice!');
		tester.log();
		return;
	}

	tester.log();
	tester.log(`== pick ${percent}% from customer invoice`);
	let r1 = pickRandomArr(queryInvoice.ret, percent);
	tester.log(r1);

	let retSaveSheetInvoice:SheetSaveReturn;
	let sheetInvoice: CustomerPayment.SheetInvoice = {
		customer:data.customer1,
		detail: r1.map(v => {
			let {id:pendingId, amount} = v;
			return {pendingId, amount}
		})
	}

	tester.log();
	tester.log('sheet invoice saved');
	retSaveSheetInvoice = await tester.test(uqs.CustomerPayment.Invoice.saveDebugDirect('sheet invoice', sheetInvoice));

	tester.log();
	tester.log('sheet invoice confirmed');
	let retInvoiceConfirm = await tester.test(uqs.CustomerPayment.Invoice.actionDebugDirect(
		retSaveSheetInvoice.id, 
		retSaveSheetInvoice.flow,
		retSaveSheetInvoice.state,
		'confirm'));
}
