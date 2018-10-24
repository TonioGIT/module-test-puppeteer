const timeout = 15000

// test d'un raccourcisseur d'URL
describe("Shorten logged", () => {
    let page

    // vérification du chargement de la page d'accueil
    test('logged shorten', async () => {
        //on attend que la page s'affiche
        await page.goto('http://polr.campus-grenoble.fr')
        //await page.screenshot({path: './tests/img/first.png'});
        //on attend que le bouton sign in s'affiche
        await page.waitForSelector('#navbar .dropdown a')
        //on clique sur le bouton sign in
        await page.$eval('#navbar .dropdown a', el => el.click() );
        //on attend que le menu déroulant s'affiche
        await page.waitForSelector('#navbar .dropdown #dropdown');
        //await page.screenshot({path: './tests/img/dropdown-empty.png'});
        //on rempli les 2 champs lgin-password
        await page.type('form[action="login"] input[name="username"]', 'tonio');
        await page.type('form[action="login"] input[name="password"]', 'gogotonio');
        await page.screenshot({path: './tests/img/dropdown-filled-special vero.png'});
        //on clique sur le bouton sign in
        await page.$eval('.btn-success', el => el.click() );
        //await page.screenshot({path: './tests/img/last.png'});
        //on rempli le champ avec l'URL
        await page.type('.long-link-input', 'https://www.koreus.com/modules/news/');
        //await page.screenshot({path: './tests/img/shortenKOREUS.png'});
        //on attend que le bouton Shorten soit là
        await page.waitForSelector('#shorten')
        //on clique sur le bouton Shorten
        await page.$eval( '#shorten', el => el.click() );
        //on dit que la const val vaut l'interieur du champ
        const val = await page.$eval('#short_url', el => el.value)
        //on verifie que dans val il y a http://polr.campus-grenoble.fr/ + une chaine de caractère (\w)
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/\w/)
        //await page.screenshot({path: './tests/img/shortenlast2.png'});
    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
