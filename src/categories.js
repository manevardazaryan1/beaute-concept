function createSubCategories(button) {
    const dataSub = JSON.parse(button.dataset.sub)

    let subCatButtons = document.createElement('ul')
    subCatButtons.classList.toggle('sub-cat-list')
    button.append(subCatButtons)

    dataSub.forEach(item => {
        let key = Object.keys(item)[0]
        let subCat = null

        if (key !== 'name') {
            let json = JSON.stringify(Object.values(item))
            subCat = createSubCategory(json, key)

        } else {
            subCat = createSubCategoryEmpty(item['name'])
        }

        subCatButtons.append(subCat)
    })
}

function createSubCategory(json, text) {
    let subCat = document.createElement('li')
    let span = document.createElement('span')
    span.innerText = text
    subCat.classList.add('category-btn')
    subCat.append(span)
    subCat.dataset.sub = json.slice(1, json.length - 1)
    subCat.dataset.name = text
    subCat.addEventListener('click', (event) => showCategoriesList(event))

    createSubCategories(subCat)

    return subCat
}

function createSubCategoryEmpty(text) {
    let subCat = document.createElement('li')
    let span = document.createElement('span')
    span.innerText = text
    subCat.classList.add('category-btn-empty')
    subCat.append(span)
    subCat.dataset.name = text
    return subCat
}

function showCategoriesList(event) {
    event.stopPropagation()
    const { parentElement:target } = event.target
    const { parentElement:parent } = target
    const [ ,children ] = target.children
    const allCatLists = [...document.querySelectorAll('.main-category-block ul')]
    let categoryImage = document.querySelector('.category-image')

    if (target.tagName === 'LI') {
        target.classList.remove('passive')

        allCatLists.forEach(list => {
            list.classList.remove('active')
        })

        let activeSibling = parent.querySelector('.active')

        if (activeSibling && activeSibling !== target) {
            [...activeSibling.querySelectorAll('.active')].forEach(item => {
                item.classList.remove('active')
            })

            activeSibling.classList.remove('active')
        } 

        target.classList.toggle('active')

        if (document.querySelector('.main-category-block li.active')) {
            categoryImage.classList.add('hide')
        } else {
            categoryImage.classList.remove('hide')
        }

        if (target.classList.contains('category-btn') && target.classList.contains('active')) { 
            children.classList.add('active')
        } else {
            parent.classList.add('active')
        }
        
        let parentsButtons = Array.from([...parent.children])

        if (target.classList.contains('active')) {
            parentsButtons.forEach(button => {
                if (target !== button) {
                    button.classList.add('passive')
                }
            })
        } else {
            parentsButtons.forEach(button => {
                button.classList.remove('passive')
            })
        }
   }
}

function render() {
    var catButtons = [...document.querySelectorAll('.category-btn')]

    catButtons.forEach(button => {
        button.addEventListener('click', (event) => showCategoriesList(event))
        createSubCategories(button)
    })

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('category-btn') || 
            !event.target.classList.contains('category-btn-empty')) {
            [...document.querySelectorAll('li')].forEach(button => {
                button.classList.remove('active')
                button.classList.remove('passive')
            })

            document.querySelector('.main-category-block ul').classList.add('active')
            document.querySelector('.category-image').classList.remove('hide')
        }
    })
}

render()

