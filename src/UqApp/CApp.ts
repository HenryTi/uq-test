//=== UqApp builder created on Sat Dec 19 2020 21:49:21 GMT-0500 (GMT-05:00) ===//
import { CTest } from "UqTest/CTest";
import { testCustomerPay } from "UqTest/CustmerPay";
import { CUqApp } from "./CBase";
import { VMain } from "./VMain";

const subjectName = '项目积分';

export class CApp extends CUqApp {
	protected async internalStart(isUserLogin: boolean) {
		this.openVPage(VMain, undefined, this.dispose);
	}

	test = async () => {
		let ret = await this.uqs.Test.Test.query({aB:1});
		alert('return: ' + JSON.stringify(ret));
	}

	notify = async () => {
		let ret = await this.uqs.Test.Notify.submit({
			subject: subjectName, 
			discription: 'memo-test @' + new Date().toString(), 
			delta: 2,
			balance: undefined,
		});
		alert('notify return: ' + JSON.stringify(ret));
	}

	subject = async () => {
		let name = 'test-subject';
		let discription = 'test-subject-discription';
		//let ret = await this.uqs.test.Subject.save(undefined, {name, discription});
		await this.uqs.Test.BusSubject.submit({id: 1, name:subjectName, discription})
		alert('notify return: ' + JSON.stringify(1));
	}

	testOrder = async () => {
		let ret = await testCustomerPay(this.uqs);
		alert(JSON.stringify(ret));
	}

	openTestPage = () => {
		let cTest = this.newC(CTest);
		cTest.start();
	}
}
