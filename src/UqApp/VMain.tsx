//=== UqApp builder created on Sat Dec 19 2020 23:22:05 GMT-0500 (GMT-05:00) ===//
import { VPage } from 'tonva';
import { CApp } from './CApp';

export class VMain extends VPage<CApp> {
	header() {return 'TEST'}
	logout() {return true;}
	content() {
		return <div className="m-3">
			<div>{this.renderMe()}</div>
			<div className="mb-5">同花样例主页面1</div>
			<button className="btn btn-primary mr-3" onClick={this.controller.openTestPage}>测试客户支付</button>
			<button className="btn btn-primary mr-3" onClick={this.controller.notify}>notify subject item</button>
			<button className="btn btn-primary mr-3" onClick={this.controller.subject}>subject name</button>
		</div>;
	}
	/*
	<button className="btn btn-primary mr-3" onClick={this.controller.test}>test</button>
	<button className="btn btn-primary mr-3" onClick={this.controller.testOrder}>test order</button>
	*/
}
