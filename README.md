# tdd-shopping-cart

DISCLAIMER : This is not a repository to show best practices with react and redux, just the way I do things. There are other ways. The same goes for the folder structure, I kept it very simple for the sake of example.

It's a very simple and contrived example of a shopping cart application with hexagonal architecture.

The concepts / patterns shown in the tests are also relevant for backend.

The main idea is to separate the specification (the structure of the test) from the test itself (the implementation)

In the tests, `sut` stands for System Under Test. A better name might be `dsl` for Domain Specific Language

If you want to see an example implementation with redux, you can swith to the `redux` branch.

Happy Coding :)

# Running the application

`git checkout redux`

`npm install`

`npm start`

# Slides

You can find the slides here : https://docs.google.com/presentation/d/1_vKs6V56IFi4Jm9zYHbQ-bPwitDc19eXkBjpasXCpGc/edit?usp=sharing

# Additional Links

Dave Farley's video on the concept of creating an internal DSL for your tests : https://www.youtube.com/watch?v=JDD5EEJgpHU&ab_channel=ContinuousDelivery
