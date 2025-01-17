function burgerMenu() {
    const burgerMenuButton = document.getElementById('burgerMenuButton')
    const nav  =  document.querySelector('nav')
    const navList = document.querySelector('nav ul')

    burgerMenuButton.addEventListener('click', (event) => {
        nav.classList.toggle('active-burger-menu')
        document.body.classList.toggle('disabled')
        document.querySelector('.hero').classList.toggle('passive')

    })

    navList.addEventListener('click', (event) => {
        if (event.target === navList) {
            if (nav.classList.contains('active-burger-menu')) {
                nav.classList.remove('active-burger-menu')
                document.body.classList.remove('disabled')
                document.querySelector('.hero').classList.remove('passive')
            }
        }
    });
}

burgerMenu()