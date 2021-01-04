import _ from 'lodash';
import { CustomerPayment } from "UqApp";
import { data } from "../mock-data";
import { pickRandomArr, UQsTester } from "./tools";

export async function testReceivable(tester: UQsTester) {
	let {uqs} = tester;

	let account = await uqs.CustomerPayment.GetCustomerAccount.query({customer: data.customer1});
	let {receivable, deposit} = account.ret[0];

	let shouldDeposit = receivable - deposit;
	if (shouldDeposit > 0) {
		let retDeposit = await uqs.CustomerPayment.Deposit.saveDebugDirect('本次预存=应收-预存', {
			customer: data.customer1,
			deposit: shouldDeposit,
			receiptNo: '001',
			bankReceiptNo: '0033'
		});
		tester.log('先预存，再应收: ' + shouldDeposit);
		tester.log(retDeposit);
		let retDepositConfirm = await uqs.CustomerPayment.Deposit.actionDebugDirect(retDeposit.id, retDeposit.flow, retDeposit.state, 'confirm');
		tester.log('deposit comfirmed, deposit:' + shouldDeposit);
		tester.log(retDepositConfirm);
	}

	tester.log();
	tester.log('先付一半');
	await receivePay(tester, 50);
	tester.log();
	tester.log('再付一半的一半');
	await receivePay(tester, 50);
	tester.log();
	tester.log('再付全部剩下的');
	await receivePay(tester, 100);

	// 再看全部应收
	tester.log();
	tester.log('== customer receivable');
	let {CustomerPendingReceivable} = uqs.CustomerPayment;
	let queryReceivable = await CustomerPendingReceivable.query({customer: data.customer1});
	tester.log(queryReceivable);
}

async function receivePay(tester: UQsTester, percent: number) {
	let {uqs} = tester;
	tester.log();
	tester.log('== customer receivable');
	let {CustomerPendingReceivable} = uqs.CustomerPayment;
	let queryReceivable = await tester.test(CustomerPendingReceivable.query({customer: data.customer1}));

	tester.log();
	tester.log(`== pick ${percent}% from customer receivable`);
	let r1 = pickRandomArr(queryReceivable.ret, percent);
	tester.log(r1);

	tester.log();
	tester.log('== pick customer balance before pay');
	await tester.test(uqs.CustomerPayment.GetCustomerAccount.query({customer:data.customer1}));

	let sheetPayReceivable: CustomerPayment.SheetPayReceivable = {
		customer:data.customer1,
		rows: r1.map(v => {
			let {id:pendingId, sheet:order, row, amount} = v;
			return {pendingId, order, row, amount}
		})
	}
	tester.log();
	tester.log('sheet receive pay saved');
	let retSaveSheetPayReceivable = await tester.test(uqs.CustomerPayment.PayReceivable.saveDebugDirect('sheet receive pay', sheetPayReceivable));
	let {verify} = retSaveSheetPayReceivable;
	if (verify) {
		tester.log('sheet pay receivable verify failed: ');
		tester.log(verify);
		return;
	}

	tester.log();
	tester.log('sheet receive pay confirmed');
	await tester.test(uqs.CustomerPayment.PayReceivable.actionDebugDirect(
		retSaveSheetPayReceivable.id, 
		retSaveSheetPayReceivable.flow,
		retSaveSheetPayReceivable.state,
		'confirm'));

	tester.log();
	tester.log('== pick customer balance after pay');
	await tester.test(uqs.CustomerPayment.GetCustomerAccount.query({customer:data.customer1}));
}
