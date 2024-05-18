import { After, Before, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CadastroPage } from "../pages/cadastroPage";
import { faker } from "@faker-js/faker";
import { Api } from "../api";

const pgCadastro = new CadastroPage()
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
    cy.viewport("macbook-13")
    cy.intercept('POST', '/api/users').as('cadastroUsuario')
    cy.intercept('POST', '/api/auth/login').as('logarUsuario')
})

After({ tags: "@userCreated" }, function () {
    api.deleteUser(userCreated.id, userCreated.email, userCreated.password)
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
        userCreated.password = user.password
    })
})

Then('deve aparecer uma mensagem de sucesso', function () {
    cy.contains("Cadastro realizado!")
    cy.contains("h3", "Sucesso")
})

When('crio um usuário', function () {
    pgCadastro.criarUsuario().then(function (resposta) {
        userCreated = resposta
        cy.log('userCreated', userCreated)
    })
})

Then('o seu tipo deve ser comum', function () {
    cy.wrap(userCreated).its("type").should("equal", 0)
})

When('tento criar usuário sem passar um nome', function () {
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

Then('deve aparecer um aviso informando que o nome é obrigatório', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    cy.get(".input-container").its(0).find(".input-error").should("contain.text", "Informe o nome")
})

When('tento criar usuário sem passar um email', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

Then('deve aparecer um aviso informando que o email é obrigatório', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-container").its(1).find(".input-error").should("have.length", 1)
    cy.get(".input-error").should("contain.text", "Informe o e-mail")
})

When('tento criar usuário sem passar uma senha', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

Then('deve aparecer um aviso informando que a senha é obrigatória', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    cy.get(".input-container").its(2).find(".input-error").should("contain.text", "Campo obrigatório")
})

When('tento criar usuário sem repetir a senha', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)

    pgCadastro.clickCadastrar()
})

Then('deve aparecer um aviso informando que é obrigatório repetir a senha', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    cy.get(".input-container").its(3).find(".input-error").should("contain.text", "As senhas devem ser iguais.")
})

Given('que sei o email de um usuário já cadastrado', function () {
    api.createUser().then(function (resposta) {
        user2 = resposta
    })
})

When('tento criar novo usuário com o mesmo email', function () {
    const newUser = {
        name: user.name,
        email: user2.email,
        password: user.password,
    }
    pgCadastro.criarUsuario(newUser)
})

Then('deve aparecer uma mensagem informando não ser possível realizar a operação', function () {
    cy.get(".modal-body").contains("E-mail já cadastrado. Utilize outro e-mail").should("exist")
    cy.get(".modal-body").contains("h3", "Falha no cadastro.").should("exist")
})

When('tento fechar a mensagem clicando no botão disponível', function () {
    cy.get(pgCadastro.modalButton).click()
})

When('tento fechar a mensagem clicando fora da mensagem', function () {
    cy.get(pgCadastro.modal).click(-50, 50, {
        force: true
    })
})

Then('a mensagem deve ser fechada', function () {
    cy.get(pgCadastro.modal).should("not.exist")
})

When('tento criar um usuário com um email já utilizado por outro usuário', function () {
    api.createUser().then(function (resposta) {
        user2 = resposta
    }).then(function (resposta) {
        const newUser = {
            name: user.name,
            email: user2.email,
            password: user.password,
        }
        pgCadastro.criarUsuario(newUser)
    })
})

When('tento cadastrar com a senha de confirmação diferente da senha escolhida', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha("senhaDiferente")

    pgCadastro.clickCadastrar()
})

Then('deve aparecer uma mensagem de erro no cadastro {string}', function (mensagem) {
    cy.get('@cadastroUsuario').should("not.exist")
    pgCadastro.mensagemDeErro(3).should("contain.text", mensagem)
})

When('tento criar um usuário com um email inválido {string}', function (email) {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

Then('deve aparecer uma mensagem de abaixo do campo email', function () {
    cy.get(pgCadastro.modal).contains("h3", "Falha no cadastro.")
    cy.get(pgCadastro.modal).contains("Não foi possível cadastrar o usuário.")
    cy.wait('@cadastroUsuario').then(function (intercept) {
        expect(intercept.response.statusCode).to.equal(400)
    })
})

Then('deve ser realizado o login automaticamente do usuário criado', function () {
    cy.wait('@logarUsuario').then(function (resposta) {
        expect(resposta.response.statusCode).to.equal(200)
    })
})

Then('as opções de navegação devem mudar para condizer com o usuário logado', function () {
    cy.get(pgCadastro.header).find("a").should("contain.text", "Perfil")
    cy.get(pgCadastro.header).find("a").should("not.contain.text", "Registre-se")
    cy.get(pgCadastro.header).find("a").should("not.contain.text", "Login")
})