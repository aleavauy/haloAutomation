const { Builder, By, Key, until } = require('selenium-webdriver');

// Crear instancia del navegador
const driver = new Builder().forBrowser('chrome').build();

// URL de la página de inicio de sesión
const loginUrl = 'https://www.mercadolibre.com.uy/';

// Iniciar sesión
async function login() {
  try {
    // Abrir la página de inicio de sesión
    await driver.get(loginUrl);

    // Ingrear en la cuenta
    await driver.findElement(By.xpath("//nav[@id='nav-header-menu']//a[contains(text(),'Ingresa')]")).click();

    // Introducir el nombre de usuario y la contraseña
    await driver.findElement(By.xpath("//input[@id='user_id']")).sendKeys("usuario1@gmail.com");
    await driver.findElement(By.xpath("//span[normalize-space()='Continuar']")).click();                                                                   
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("123456");
    await driver.findElement(By.xpath("//span[normalize-space()='Iniciar sesión']")).click();                                                                      
    
    // Esperar a que la página de inicio de sesión sea exitosa 
    await driver.wait(until.titleIs("//a[@class='nav-logo']"), 5000);

    // Ir a la seccion de compras 
    await driver.findElement(By.xpath("//a[@class='option-purchases']")).click();
    await driver.wait(until.titleIs("//span[@class='bf-ui-rich-text bf-ui-rich-text--bold'][normalize-space()='Compras']"), 5000);


    console.log('Inicio de sesión exitoso.');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
}

// Llamar a la función de inicio de sesión
login();
