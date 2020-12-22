import { VPage } from "tonva";
import { CTest } from "./CTest";
import { Console } from './Console';

export class VConsole extends VPage<CTest> implements Console {
	private div: HTMLDivElement;
	private divBottom: HTMLDivElement;
	init() {
		this.startAutoScrollToBottom();
	}
	header() {
		return '结果';
	}
	content() {
		return <div className="p-3">
			<div ref={t => this.div = t} />
			<div ref={t => this.divBottom = t} />
		</div>;
	}

	private autoScrollEnd:boolean = false;
	private autoScroll = true;
    private lastScrollTop = 0;
    private timeHandler:any;
    private startAutoScrollToBottom() {
		if (this.autoScrollEnd === true) return;
		this.autoScroll = true;
		if (this.timeHandler !== undefined) return;
        this.timeHandler = setInterval(() => {
			if (this.autoScroll === false) return;
            this.divBottom?.scrollIntoView();
        }, 100);
    }
    private endAutoScrollToBottom() {
        setTimeout(() => {
			this.autoScroll = false;
			this.autoScrollEnd = true;
			if (this.timeHandler === undefined) return;
			clearInterval(this.timeHandler);
			this.timeHandler = undefined;
		}, 300);
	}
	private pauseAutoScrollToBottom() {
		this.autoScroll = false;
	}
	protected onPageScroll(e:any) {
        let el = e.target as HTMLBaseElement;
        let {scrollTop, scrollHeight, offsetHeight} = el;
        if (scrollTop <= this.lastScrollTop) {
            this.pauseAutoScrollToBottom();
        }
        else if (scrollTop + offsetHeight > scrollHeight - 30) {
            this.startAutoScrollToBottom();
        }

        this.lastScrollTop = scrollTop;
	}

	log(message?: any):Console {
		const range = document.createRange();
		range.selectNode(this.div);
		if (!message) {
			message = '';
		}
		if (typeof message === 'object') {
			message = JSON.stringify(message, null, '\t');
		}
		const child = range.createContextualFragment('<div>' + message + '&nbsp;</div>');
		this.div.appendChild(child);
		return this;
	}
}
