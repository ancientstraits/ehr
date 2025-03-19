import { handlers } from './handlers.js'
import { $ } from './util.js'

// export const templates = []

export function loadTemplates() {
    const elems = [...$('#template-container').children]
    const templates = {}
    for (const elem of elems) {
        const name = elem.id.replace(/^template-/, '')
        templates[name] = {
            horitab: elem.querySelector('.template-horitab'),
            content: elem.querySelector('.template-content')
        }
    }
    return templates
}

export function createHoritabFromTemplate(name, template) {
    const horitab = template.horitab.cloneNode(true)
    const content = template.content.cloneNode(true)

    horitab.classList.remove('template-horitab')
    horitab.classList.add('horitab')

    content.classList.remove('template-content')

    horitab.onclick = () => $('#main-popup').replaceChildren(content)

    handlers[name](horitab, content)

    return horitab
}
