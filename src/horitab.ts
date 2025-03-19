import { createHoritabFromTemplate, loadTemplates } from './template.js';
import { $div, $$ } from './util.js'

let activeHoritab: HTMLDivElement | null = null
let activeContent: HTMLDivElement | null = null

export function makeHoritabActive(horitab: HTMLDivElement, content: HTMLDivElement) {
    if (horitab === activeHoritab) return

    if (activeHoritab !== null) {
        activeHoritab.classList.remove('active')
        activeContent!.classList.remove('active')
    }
    horitab.classList.add('active')
    content.classList.add('active')

    activeHoritab = horitab
    activeContent = content
}

export function makeHoritabInactive(horitab: HTMLDivElement, content: HTMLDivElement) {
    if (horitab !== activeHoritab) return
    

    activeHoritab?.classList.remove('active')
    activeContent?.classList.remove('active')

    activeHoritab = null
    activeContent = null
}


export function addHoritab(horitab: HTMLDivElement, content: HTMLDivElement) {
    $div('#horitab-container').prepend(horitab)
    $div('#main-popup').prepend(content)
}
export function removeHoritab(horitab: HTMLDivElement, content: HTMLDivElement) {
    makeHoritabInactive(horitab, content)
    $div('#horitab-container').removeChild(horitab)
    $div('#main-popup').removeChild(content)
}

export function registerLaunchHoritabEvents() {
    const templates = loadTemplates()

    for (const menu_content of $$('.menu-content')) {
        for (const _li of menu_content.children) {
            const li = <HTMLElement>_li
            const a = <HTMLElement>li.firstChild

            if (a.id === '')
                continue;

            const name = a.id.replace(/^launch-/, '')
            li.onclick = () => {
                const [horitab, content] = createHoritabFromTemplate(name, templates[name])
                addHoritab(horitab, content)
                makeHoritabActive(horitab, content)
            }
        }
    }
}
