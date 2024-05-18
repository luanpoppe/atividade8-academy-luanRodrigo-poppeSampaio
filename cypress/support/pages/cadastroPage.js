import { faker } from "@faker-js/faker"

export class CadastroPage {
    newUser = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    }

    inputNome = '[name="name"]'
    inputEmail = '[name="email"]'
    inputSenha = '[name="password"]'
    inputConfirmarSenha = '[name="confirmPassword"]'

    buttonCadastrar = ".register-form-footer"

    tituloPagina = "h3"
    headerDescricao = ".register-account-header span"


    digitarNome(texto) {
        return cy.get(this.inputNome).type(texto)
    }
    digitarEmail(texto) {
        return cy.get(this.inputEmail).type(texto)
    }
    digitarSenha(texto) {
        return cy.get(this.inputSenha).type(texto)
    }
    digitarConfirmarSenha(texto) {
        return cy.get(this.inputConfirmarSenha).type(texto)
    }

    clickCadastrar() {
        return cy.get(this.buttonCadastrar).click()
    }

    // region: Funções maiores
    criarUsuario(newUser = this.newUser) {
        cy.intercept('POST', '/api/users').as('cadastroUsuario')
        this.digitarNome(newUser.name)
        this.digitarEmail(newUser.email)
        this.digitarSenha(newUser.password)
        this.digitarConfirmarSenha(newUser.password)

        this.clickCadastrar()
        return cy.wait('@cadastroUsuario').then(function (resposta) {
            const userCreated = resposta.response.body
            userCreated.password = newUser.password
            return userCreated
        })
    }
}