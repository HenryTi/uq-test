import { uqAppStart, UQsMan } from 'tonva';
import { UQs } from 'UqApp';
import { uqAppOptions } from 'uqAppOptions';
import { testOrder } from './test/testOrder';

test('test uq', async () => {
	await uqAppStart(uqAppOptions);
	let uqs = UQsMan._uqs as UQs;

	//await testOrder(uqs, console);
	console.log('testUq ok!');
}, 600*1000);
