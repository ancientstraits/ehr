import { beginningHandlers } from './beginningHandlers.js'
import { handlers } from './handlers.js'
import { makeHoritabActive, removeHoritab } from './horitab.js'
import { $ } from './util.js'

export interface Template {
    horitab: HTMLDivElement,
    content: HTMLDivElement
}

export function loadTemplates() {
    const elems = [...$('#template-container').children]
    const templates: { [name: string]: Template } = {}
    for (const elem of elems) {
        const name = elem.id.replace(/^template-/, '')

        const horitab = <HTMLDivElement>elem.querySelector('.template-horitab')
        const content = <HTMLDivElement>elem.querySelector('.template-content')

        if (beginningHandlers[name] !== undefined)
            beginningHandlers[name](horitab, content)

        templates[name] = { horitab, content }
    }
    return templates
}

function makeCloseButton(horitab: HTMLDivElement, content: HTMLDivElement) {
    const div = document.createElement('div')
    div.role = 'button'
    div.ariaLabel = 'Close Horitab'
    div.textContent = '✕'
    div.className = 'close-horitab'
    div.onclick = (e) => {
        e.stopPropagation()
        removeHoritab(horitab, content)
    }
    return div
}

export function createHoritabFromTemplate(name: string, template: Template) {
    const horitab = <HTMLDivElement>template.horitab.cloneNode(true)
    const content = <HTMLDivElement>template.content.cloneNode(true)
    const closeBtn = makeCloseButton(horitab, content)
    horitab.appendChild(closeBtn)

    horitab.classList.remove('template-horitab')
    horitab.classList.add('horitab')

    content.classList.remove('template-content')
    content.classList.add('content')

    horitab.onclick = () => makeHoritabActive(horitab, content)

    handlers[name](horitab, content)

    return [horitab, content]
}
