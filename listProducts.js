const fs = require('fs');
const { remote } = require('webdriverio');

(async () => {
    const browser = await remote({
        logLevel: 'error', //Ocultar mensajes de log innecerarios
        capabilities: {
            browserName: 'chrome'
        }
    });

    const searchQuery = 'camisetas';
    const url = 'https://www.mercadolibre.com.ar/${serachQuery}'
    await browser.url(url)

    const products = []
    const maxPages = 3

    for (let page = 1; page <= maxPages; page++){
        const productsElements = await browser.$$("//div[@class='ui-search-search-result shops__result']//span[1]")

        for (const productsElement of productsElements) {
            const productName = await productsElement.$("//h2[@class='ui-search-item__title shops__item-title']").getText();
            const prodcutPrice = await productsElement.$("//span[@class='andes-money-amount ui-search-price__part shops__price-part ui-search-price__part--medium andes-money-amount--cents-superscript']").getText();
            const productLink = await procuctElement.$('a.item__info-link').getAttribute('href');

            products.push({name: productName, price: prodcutPrice, link: productLink});
        }

        if (page < maxPages){
            await browser.click("//span[@class='andes-pagination__arrow-title']");
        }
    }

    //Guardar informacion en un archivo de texto
    const outputFile = 'Informacion_productos.txt';
    const outputText = products.map(product => `
    Nombre: ${product.name}
    Precio: ${product.price}
    Link: ${product.link}

    `).join('');
        fs.writeFileSync(outputFile, outputText)

        await browser.deleteSession();

})();
