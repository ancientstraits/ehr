export const $     = (sel: string) =>       <HTMLElement>document.querySelector(sel)!
export const $div  = (sel: string) =>    <HTMLDivElement>document.querySelector(sel)!
export const $form = (sel: string) =>   <HTMLFormElement>document.querySelector(sel)!
export const $btn  = (sel: string) => <HTMLButtonElement>document.querySelector(sel)!
export const $$ = (sel: string) => <NodeListOf<HTMLElement>>document.querySelectorAll(sel)!
