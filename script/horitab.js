import { createHoritabFromTemplate, loadTemplates } from './template.js';
import { $, $$ } from './util.js'

export function addHoritab(horitab) {
    $('#horitab-container').prepend(horitab)
}

export function registerLaunchHoritabEvents() {
    const templates = loadTemplates()

    for (const menu_content of $$('.menu-content')) {
        for (const li of menu_content.children) {
            const a = li.firstChild
            if (a.id === '')
                continue;

            const name = a.id.replace(/^launch-/, '')
            li.onclick = () => addHoritab(
                createHoritabFromTemplate(name, templates[name])
            )
        }
    }
}
