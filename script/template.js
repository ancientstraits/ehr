import { copyFormEvents } from './form.js'
import { $, $$ } from './util.js'

// export const templates = []

export function loadTemplates() {
    const elems = [...$('#template-container').children]
    const templates = []
    for (const elem of elems) {
        templates.push({
            horitab: elem.querySelector('.template-horitab'),
            content: elem.querySelector('.template-content')
        })
    }
    return templates
}

export function createHoritabFromTemplate(template) {
    const horitab = template.horitab.cloneNode(true)
    const content = template.content.cloneNode(true)

    copyFormEvents(template.content, content)

    horitab.classList.remove('template-horitab')
    horitab.classList.add('horitab')

    content.classList.remove('template-content')

    horitab.onclick = () => $('#main-popup').replaceChildren(content)

    return horitab
}
