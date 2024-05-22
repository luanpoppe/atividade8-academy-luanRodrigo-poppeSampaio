import { faker } from "@faker-js/faker";
export class Api {
    apiUrl = Cypress.env("apiUrl")
    user = {}

    createUser() {
        let userCreated = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(8),
        }

        return cy.request("POST", `${this.apiUrl}/api/users`, userCreated)
            .then(function (resposta) {
                userCreated = {
                    ...userCreated,
                    ...resposta.body
                }
                return cy.wrap(userCreated)
            })
    }

    logar(email, senha) {
        return cy.request("POST", `${this.apiUrl}/api/auth/login`, {
            email: email,
            password: senha
        }).then((resposta) => {
            return this.user = {
                ...this.user,
                token: resposta.body.accessToken
            }
        })
    }

    tornarAdmin() {
        return cy.request({
            method: 'PATCH',
            url: `${this.apiUrl}/api/users/admin`,
            auth: {
                bearer: this.user.token
            },
        })
    }

    deleteUser(userId, email = this.user.email, senha = this.user.password) {
        return this.logar(email, senha).then(() => {
            this.tornarAdmin().then(() => {
                cy.request({
                    method: 'DELETE',
                    url: `${this.apiUrl}/api/users/${userId}`,
                    auth: {
                        bearer: this.user.token
                    },
                })
            })
        })
    }
}