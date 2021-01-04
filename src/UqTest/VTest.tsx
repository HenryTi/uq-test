import { VPage } from "tonva";
import { CTest } from "./CTest";

let btn = (key:string|number, text:string, onClick:()=>void) => <button key={key}
	className="btn btn-primary btn-sm mb-3 mr-3" onClick={onClick}>{text}</button>;

export class VTest extends VPage<CTest> {
	header() {
		return '测试';
	}
	content() {
		let btnArr:[string, ()=>void][] = [
			['开单-开票-发货-收款', this.controller.showConsole],
			['存订单', this.controller.saveOrder1],
			['取订单', this.controller.getOrder1],
			['确认订单', this.controller.confirmOrder1],
			['应收', this.controller.pendingReceivable],
		]
		return <div className="m-3">
			{btnArr.map((v, index) => btn(index, v[0], v[1]))}
		</div>;
	}
}
