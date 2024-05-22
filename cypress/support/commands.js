import { faker } from "@faker-js/faker";

let apiUrl = Cypress.env("apiUrl")
let user = {}

Cypress.Commands.add("createUser", function (email = null) {
    let userCreated = {
        name: faker.person.firstName(),
        email: email ? email : faker.internet.email(),
        password: faker.internet.password(8),
    }

    return cy.request("POST", `${apiUrl}/api/users`, userCreated)
        .then(function (resposta) {
            userCreated = {
                ...userCreated,
                ...resposta.body
            }
            return cy.wrap(userCreated)
        })
})


Cypress.Commands.add("logar", function (email, senha) {
    return cy.request("POST", `${apiUrl}/api/auth/login`, {
        email: email,
        password: senha
    }).then((resposta) => {
        return {
            email: email,
            password: senha,
            token: resposta.body.accessToken
        }
    })
})

Cypress.Commands.add("tornarAdmin", function (token) {
    return cy.request({
        method: 'PATCH',
        url: `${apiUrl}/api/users/admin`,
        auth: {
            bearer: token
        },
    })
})

Cypress.Commands.add("deleteUser", function (userId, email, senha) {
    return cy.logar(email, senha).then((resposta) => {
        const token = resposta.token
        cy.tornarAdmin(token).then(() => {
            cy.request({
                method: 'DELETE',
                url: `${apiUrl}/api/users/${userId}`,
                auth: {
                    bearer: token
                },
            })
        })
    })
})