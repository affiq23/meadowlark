const handlers = require("../handlers") // importing route handlers

// testing home page
test("home page renders", () =>{
    const req = {} // don't need anything from the request object
    const res = { render: jest.fn() } //just need render method (jest.fn() is mock function)
    handlers.home(req, res)
    expect(res.render.mock.calls[0][0]).toBe("home")
})
// code should call the render method of the res object