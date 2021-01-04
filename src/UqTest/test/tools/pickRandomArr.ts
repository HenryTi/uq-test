// percent: integer 0-100
export function pickRandomArr<T>(arr: T[], percent: number): T[] {
	if (!arr) return arr;
	let len = arr.length;
	if (len === 0) return arr;
	let ret:T[] = [];
	let indexes:number[] = [];
	if (percent>100) percent = 100;
	else if (percent<=0) percent = 1;
	for (;;) {
		let index = Math.floor(Math.random() * len);
		if (indexes.findIndex(v => v === index) >= 0) continue;
		indexes.push(index);
		ret.push(arr[index]);
		let iLen = indexes.length;
		if (iLen >= len * percent / 100 ) break;
	}
	return ret;
}
