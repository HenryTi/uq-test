//=== UqApp builder created on Mon Dec 21 2020 19:47:55 GMT-0500 (GMT-05:00) ===//
import { UqTuid, UqQuery, UqAction, UqSheet/*, Map, Tag*/ } from "tonva";

//===============================
//======= UQ BizDev/test ========
//===============================
export namespace Test {
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

export interface TuidProduct {
	name: string;
}

export interface TuidTestTuid {
	name: string;
	t: number;
}

export interface TuidT1 {
	a: string;
	t2: string;
}

export interface TuidSubject {
	name: string;
	discription: string;
}

export interface ParamA {
}
interface ResultA {
}

export interface ParamAct {
}
interface ResultAct {
}

export interface ParamBusSubject {
	id: number;
	name: string;
	discription: string;
}
interface ResultBusSubject {
}

export interface ParamNotify {
	subject: string;
	discription: string;
	delta: any;
	balance: any;
}
interface ResultNotify {
}

export interface ParamTestQueryBus {
	p: number;
}
interface ReturnTestQueryBusMain {
	p1: string;
	p2: any;
	p3: number;
	$id: number;
}
interface ReturnTestQueryBusRetArr {
	a1: string;
	a2: any;
	a3: any;
	a4: number;
	$id: number;
}
interface ReturnTestQueryBusRetArr2 {
	b3: string;
	cb2: any;
	aa3: any;
	$id: number;
}
interface ResultTestQueryBus {
	main: ReturnTestQueryBusMain[];
	retArr: ReturnTestQueryBusRetArr[];
	retArr2: ReturnTestQueryBusRetArr2[];
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
	$id: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamCall1 {
}
interface ReturnCall1Ret {
	user: number;
	t1: number;
	$id: number;
}
interface ResultCall1 {
	ret: ReturnCall1Ret[];
}

export interface ParamTest {
	aB: number;
}
interface ReturnTestRet {
	aE: number;
	cD: number;
	$id: number;
}
interface ResultTest {
	ret: ReturnTestRet[];
}


export interface UqTest {
	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Product: UqTuid<TuidProduct>;
	TestTuid: UqTuid<TuidTestTuid>;
	T1: UqTuid<TuidT1>;
	Subject: UqTuid<TuidSubject>;
	A: UqAction<ParamA, ResultA>;
	Act: UqAction<ParamAct, ResultAct>;
	BusSubject: UqAction<ParamBusSubject, ResultBusSubject>;
	Notify: UqAction<ParamNotify, ResultNotify>;
	TestQueryBus: UqAction<ParamTestQueryBus, ResultTestQueryBus>;
	$poked: UqQuery<Param$poked, Result$poked>;
	Call1: UqQuery<ParamCall1, ResultCall1>;
	Test: UqQuery<ParamTest, ResultTest>;
}
}


