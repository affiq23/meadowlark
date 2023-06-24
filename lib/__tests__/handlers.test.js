/*
NOTES: 
    expect() - function provided by Jest that wraps expression to be tested
    res.render.mock.calls.length - accesses render function on res; length is to determine
    how many times function is called
    toBe(1) - function to compare test value with expected value

    expect(res.render.mock.calls[0][0]).toBe("home") - checks first argument passed to render is "home"
*/
const handlers = require("../handlers") // importing route handlers

test("home page renders", () =>{
    const req = {} // don't need anything from the request object
    const res = { render: jest.fn() } //just need render method (jest.fn() is mock function)
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("home")
})

test('about page renders with fortune', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req, res)
    expect(res.render.mock.calls.length).toBe(1) //checking that the page is only rendered once; if called more than once or not at all; failed
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]) // added expectation it will get a fortune that is a string containing at least one character
      .toEqual(expect.objectContaining({
        fortune: expect.stringMatching(/\W/),
      }))
  })

  test("info pages renders with form", () => {
    const req = {}
    const res = {render: jest.fn() }
    handlers.info(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("info")
   //const renderedHtml = res.render.mock.calls[0][1].toString().includes("<form") //get the rendered HTML
   //const formExists = renderedHtml.includes("<form")
   //expect(renderedHtml).toBe(true)


  })

  // testing 404 page
  test("404 handler renders", () => {
    const req ={}
    const res = { render: jest.fn() }
    handlers.about(req,res)
    expect(res.render.mock.calls.length).toBe(1)
  })

  test("500 handler renders", () => {
    const err = new Error("some error")
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    handlers.serverError(err, req, res, next) // serverError takes 4 arguments not 2; need additional mocks
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe("500")
  })