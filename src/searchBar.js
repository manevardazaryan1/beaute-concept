function searchBar() {
    const burgerMenuButton = document.getElementById('searchIcon')
    const hero = document.querySelector('.hero')
    burgerMenuButton.addEventListener('click', (event) => {
        hero.classList.toggle("active-search-bar")
        document.body.classList.toggle('disabled')
    })

    hero.addEventListener('click', (event) => {
        if (event.target === hero) {
            if (hero.classList.contains('active-search-bar')) {
                hero.classList.remove('active-search-bar')
            }
        }
    })
}

searchBar()