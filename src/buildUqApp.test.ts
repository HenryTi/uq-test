import { buildUqApp } from "tonva";
import { uqAppOptions } from './uqAppOptions';

/*
const uqAppName = 'BizDev/test';
const options: BuildUqAppOptions = {
	uqAppName,
	uqAppVersion: '1.0.0',
	uqAppUnitId: 24,
	uqOwnerMap: {
		//bizdev: 'bz'
	},
	version: '0.1.0',
	noUnit: true,
    tvs: {},
	oem: undefined,
	htmlTitle: '同花-测试',
};
*/

test('build UqApp', async () => {
	await buildUqApp(uqAppOptions);
}, 600*1000);
