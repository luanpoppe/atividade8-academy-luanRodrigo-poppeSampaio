import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CadastroPage } from "../pages/cadastroPage";
import { faker } from "@faker-js/faker";
import { Api } from "../api";

const pgCadastro = new CadastroPage()
const api = new Api()
let user
let userCreated

before(function () {
    cy.viewport("macbook-15")
    cy.intercept('POST', '/api/users').as('cadastroUsuario')
    user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    }
})

after(function () {
    api.deleteUser(userCreated.id, user.email, user.password)
})

Given('que acessei a página de cadastrar usuário', function () {
    cy.visit("/")
    cy.contains("Registre-se").click()
})

When('preencho os campos obrigatórios com valores válidos', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)
})

When('tento realizar o cadastro', function () {
    pgCadastro.clickCadastrar()
    cy.wait('@cadastroUsuario').then(function (resposta) {
        userCreated = resposta.response.body
    })
})

Then('deve aparecer uma mensagem de sucesso', function () {
    cy.contains("Cadastro realizado!")
    cy.contains("h3", "Sucesso")
})