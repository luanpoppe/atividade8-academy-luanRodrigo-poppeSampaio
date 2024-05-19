import { After, Before, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { Api } from "../api";
import { LoginPage } from "../pages/loginPage";

const pgLogin = new LoginPage()
const api = new Api()
let user
let userCreated
let user2

before(function () {
    user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    }
})

Before(function () {
    cy.intercept('POST', '/api/auth/login').as('login')
})

After({ tags: "@usuarioCriado" }, function () {
    api.deleteUser(userCreated.id, userCreated.email, userCreated.password)
})

Given('que acessei a página de login', function () {
    cy.visit("/login")
})

Given('olho as informações da página', function () {

})

Then('a página deve conter informações sobre o login de usuários', function () {
    cy.get(pgLogin.tituloPagina).should("have.text", "Login").and("be.visible")
    cy.get(pgLogin.headerDescricao).should("have.text", "Entre com suas credenciais").and("be.visible")
    cy.get(pgLogin.buttonLogin).should("have.text", "Login").and("be.visible")

    cy.get(pgLogin.inputEmail).should("have.attr", "placeholder", "E-mail")
    cy.get(pgLogin.inputSenha).should("have.attr", "placeholder", "Password")
})

Given('possuo dados de login de um usuário', function () {
    api.createUser().then(function (resposta) {
        userCreated = resposta
    })
})

Then('tento realizar o login', function () {
    pgLogin.logar(userCreated.email, userCreated.password)
})

Then('o login deve ser realizado com sucesso', function () {
    cy.wait('@login')
    cy.url().should("equal", "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/")
})

When('tento realizar o login passando um valor de senha errado', function () {
    pgLogin.digitarEmail(user.email)
    pgLogin.digitarSenha("senhaErrada")
    pgLogin.clickLogar()
})

When('tento realizar o login sem preencher os campos obrigatórios', function () {
    pgLogin.clickLogar()

    cy.get('@login').should("not.exist")
})

When('tento realizar o login sem passar um valor de email', function () {
    pgLogin.digitarSenha(user.password)

    pgLogin.clickLogar()
})

When('deve aparecer mensagem informando que não foi possível realizar login', function () {
    pgLogin.mensagemDeErro(0).should("have.text", "Informe o e-mail")
    pgLogin.mensagemDeErro(1).should("have.text", "Informe a senha")
})

Then('deve aparecer mensagem informando que o email é obrigatório {string}', function (mensagem) {
    cy.get('@login').should("not.exist")
    pgLogin.mensagemDeErro(0).should("have.text", mensagem)
})

When('tento realizar o login sem passar um valor de senha', function () {
    pgLogin.digitarEmail(user.email)

    pgLogin.clickLogar()
})

Then('deve aparecer mensagem informando que a senha é obrigatório {string}', function (mensagem) {
    pgLogin.mensagemDeErro(0).should("have.text", mensagem)
})

When('tento realizar o login passando um email incorreto', function () {
    pgLogin.logar("emailIncorreto@gmail.com", user.password)
})

Then('deve aparecer mensagem informando falha ao autenticar', function () {
    cy.get(pgLogin.modal).should("contain.text", "Usuário ou senha inválidos.").and("contain.text", "Falha ao autenticar")
})

When('tento realizar o login passando uma senha incorreta', function () {
    pgLogin.digitarEmail(user.email)
    pgLogin.digitarSenha("senhaIncorreta")

    pgLogin.clickLogar()
})

Given('que tentei realizar o login com dados incorretos', function () {
    pgLogin.digitarEmail(user.email)
    pgLogin.digitarSenha("senhaIncorreta")

    pgLogin.clickLogar()
})

When('tento fechar a mensagem clicando no botão disponível', function () {
    cy.get(pgLogin.modalButton).click()
})

When('tento fechar a mensagem clicando fora da mensagem', function () {
    cy.get(pgLogin.modal).click(-50, 50, {
        force: true
    })
})

Then('a mensagem deve ser fechada', function () {
    cy.get(pgLogin.modal).should("not.exist")
})

