let selectedPage = 'loading'

const pages = [...document.querySelectorAll('.page')].map(elem => elem.id.slice(0, -5))

export function hideAllPagesExcept(page: string) {
    for (const p of pages) {
        if (p == page)
            continue;

        document.getElementById(`${p}-page`)?.classList.remove('page-selected')
    }

    document.getElementById(`${page}-page`)?.classList.add('page-selected')
    selectedPage = page
}

export function setPage(page: string) {
    console.log(`setting page to ${page}-page`)

    document.getElementById(`${selectedPage}-page`)?.classList.remove('page-selected')
    // document.getElementById(`${selectedPage}-page`).style.display = 'none'

    document.getElementById(`${page}-page`)?.classList.add('page-selected')
    // document.getElementById(`${page}-page`).style.display = 'block'

    selectedPage = page
}
