import { Tuid, Query, Action/*, Map, Sheet, Tag*/ } from "tonva";

export interface Test {
	Note: Tuid;
	Subject: Tuid;
	Test: Query;
	Notify: Action;
	BusSubject: Action;
}

export interface UQs {
	test: Test,
}
