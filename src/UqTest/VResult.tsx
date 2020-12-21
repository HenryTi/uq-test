import { VPage } from "tonva";
import { CTest } from "./CTest";

export class VResult extends VPage<CTest> {
	private result: any;
	init(param:any) {
		this.result = param;
	}
	header() {
		return '结果';
	}
	content() {
		return <div>
			<pre>{JSON.stringify(this.result, null,'\t')}</pre>
		</div>;
	}
}
