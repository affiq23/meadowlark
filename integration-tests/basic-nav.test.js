/*
Goals of this integration:
1. start application server on unoccupied port
2. launch headless Chrome browser and open page
3. navigate to home page
4. find link with data-test-id="about" and click it
5. verify that we are on /about page
*/

const portfinder = require("portfinder")
const puppeteer = require("puppeteer") //pupeeter is a headless version of chrome

const app = require("../meadowlark.js")

let server = null
let port = null

beforeAll(async () => { //start server before each test
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterAll(() => { //start server after each test
    server.close()
})

/*could use beforeAll and afterAll so we're not starting up and tearing down sever for every test;
not clean though, if a test makes changes that affect outcome of future tests
*/

test("home page links to about page", async () => {
    const browser = await puppeteer.launch() //launching headless broswer
    const page = await browser.newPage() 
    await page.goto(`http://localhost:${port}`) //go to website
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]')
    ])

    expect(page.url()).toBe(`http://localhost:${port}/about`) //should navigate to about page
    await browser.close()
})

test("about page links to home page", async () => {
    const browser = await puppeteer.launch()
    const page  = await browser.newPage()
    await page.goto(`http://localhost:${port}/about`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="home"]')
    ])

    expect(page.url()).toBe(`http://localhost:${port}/`)
    await browser.close()
})