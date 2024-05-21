import { After, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Api } from "../api";
import { LoginPage } from "../pages/loginPage";
import { PerfilPage } from "../pages/perfilPage";
import { GerenciamentoContaPage } from "../pages/gerenciamentoContaPage";

const pgLogin = new LoginPage()
const api = new Api()
const pgPerfil = new PerfilPage()
const pgGerenciamento = new GerenciamentoContaPage()
let userCreated
const siteUrl = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/"

After({ tags: "userCreated" }, function () {
    api.deleteUser(userCreated.id, userCreated.email, userCreated.password)
})

Given('que fiz o login com um usuário', function () {
    cy.visit("/login")
    api.createUser().then(function (resposta) {
        userCreated = resposta
        cy.log('userCreated', userCreated)
    }).then(function () {
        pgLogin.logar(userCreated.email, userCreated.password)
    })
})

Given('que acessei a página de perfil', function () {
    cy.contains("a", "Perfil").click()
})

Given('que acessei a seção do site de gerenciar conta', function () {
    cy.intercept('PUT', '/api/users/*').as('salvarUsuario')
    cy.contains("a", "Perfil").click()
    cy.get(pgPerfil.buttonGerenciarConta).click()
})

Given('que sou um usuário do tipo comum', function () {
    cy.visit("/login")
    api.createUser().then(function (resposta) {
        userCreated = resposta
        cy.log('userCreated', userCreated)
    }).then(function () {
        pgLogin.logar(userCreated.email, userCreated.password)
    })
})

When('acesso a página de perfil', function () {
    cy.contains("a", "Perfil").click()
})

When('acesso a funcionalidade de logout', function () {
    cy.get(pgPerfil.buttonLogout).click()
})

When('acesso a funcionalidade de gerenciar conta', function () {
    cy.get(pgPerfil.buttonGerenciarConta).click()
})

When('acesso a seção do site de gerenciar conta', function () {
    cy.intercept('PUT', '/api/users/*').as('salvarUsuario')
    cy.contains("a", "Perfil").click()
    cy.get(pgPerfil.buttonGerenciarConta).click()
})

When('tento alterar o nome do usuário', function () {
    userCreated.name = "Novo Nome"
    cy.get(pgGerenciamento.inputName).clear().type(userCreated.name)

    pgGerenciamento.clickSalvar()
})

When('tento alterar a senha do usuário', function () {
    userCreated.password = "NovaSenha"
    pgGerenciamento.alterarSenha(userCreated.password)
})

When('tento alterar a senha do usuário passando um valor muito curto', function () {
    pgGerenciamento.alterarSenha("abc12")
})

When('tento alterar a senha do usuário passando um valor muito longo', function () {
    let novaSenha = ""
    while (novaSenha.length != 13) {
        novaSenha += "a"
    }
    pgGerenciamento.alterarSenha(novaSenha)
})

When('inicio a operação de mudar de senha', function () {
    pgGerenciamento.clickAlterarSenha()
    cy.get(pgGerenciamento.buttonCancelarAlteracaoDeSenha).should("have.text", "Cancelar")
    cy.get(pgGerenciamento.inputSenha).should("be.enabled")
    cy.get(pgGerenciamento.inputConfirmarSenha).should("be.enabled")
})

When('tento alterar a senha do usuário passando um valor com {string} caracteres', function (qtd) {
    let novaSenha = ""
    while (novaSenha.length != qtd) {
        novaSenha += "a"
    }
    userCreated.password = novaSenha

    pgGerenciamento.alterarSenha(novaSenha)
})

When('tento alterar a senha passando um valor diferente para senha e para confirmação da senha', function () {
    pgGerenciamento.clickAlterarSenha()
    cy.get(pgGerenciamento.inputSenha).type("novaSenha")
    cy.get(pgGerenciamento.inputConfirmarSenha).type("valorErrado")
    pgGerenciamento.clickSalvar()
})

When('tento alterar o usuário sem passar um novo valor de nome', function () {
    cy.get(pgGerenciamento.inputName).clear()
    pgGerenciamento.clickSalvar()
})

When('tento alterar a senha do usuário sem passar um novo valor de senha', function () {
    pgGerenciamento.clickAlterarSenha()
    cy.get(pgGerenciamento.inputConfirmarSenha).type("novaSenha")
    pgGerenciamento.clickSalvar()
})

When('tento alterar a senha do usuário sem passar um valor na confirmação da senha', function () {
    pgGerenciamento.clickAlterarSenha()
    cy.get(pgGerenciamento.inputSenha).type("novaSenha")
    pgGerenciamento.clickSalvar()
})

When('alterei as informações do usuário', function () {
    cy.intercept('PUT', '/api/users/*').as('salvarUsuario')
    cy.contains("a", "Perfil").click()
    cy.get(pgPerfil.buttonGerenciarConta).click()

    userCreated.name = "Novo Nome"
    cy.get(pgGerenciamento.inputName).clear().type(userCreated.name)

    pgGerenciamento.clickSalvar()
})

When('tento fechar a mensagem de sucesso clicando no botão disponível', function () {
    cy.get(pgGerenciamento.modalBotao).click()
})

When('tento fechar a mensagem de sucesso clicando fora da mensagem', function () {
    cy.get(pgGerenciamento.modalBotao).click(-50, 20, { force: true })
})

When('tento acessar a seção de perfil sem estar logado com um usuário', function () {
    cy.visit("/profile")
})

When('tento acessar a seção de gerenciamento de conta sem estar logado com um usuário', function () {
    cy.visit("/account")
})

Then('deve ser possível ver as informações sobre o usuário logado', function () {
    const firstNameLetter = userCreated.name[0]

    pgPerfil.spanUserName().should("have.text", userCreated.name)
    pgPerfil.spaneUserEmail().should("have.text", userCreated.email)
    cy.get(pgPerfil.divNickname).should("have.text", firstNameLetter)
})

Then('a sessão do usuário deve ser encerrada', function () {
    cy.url().should("equal", siteUrl)
    cy.get(".navbar").contains("Login").should("exist")
    cy.get(".navbar").contains("Registre-se").should("exist")
})

Then('o site deve redirecionar à parte de gerenciamento da conta', function () {
    cy.location("pathname").should("equal", "/account")
    cy.get(pgGerenciamento.pageTitle).should('have.text', "Gerenciar conta")
    cy.get(pgGerenciamento.pageDescription).should('have.text', "Atualize informações da sua conta.")
})

Then('deve ser possível ver informações importantes sobre a própria conta do usuário', function () {
    pgGerenciamento.getLabel(0).should("have.text", "Nome:")
    pgGerenciamento.getLabel(1).should("have.text", "E-mail:")
    pgGerenciamento.getLabel(2).should("have.text", "Tipo de usuário:")
    pgGerenciamento.getLabel(3).should("have.text", "Senha:")
    pgGerenciamento.getLabel(4).should("have.text", "Confirmar senha:")

    cy.get(pgGerenciamento.buttonSalvar).should('have.text', 'Salvar')
})

Then('não deve ser possível alterar o email da conta', function () {
    cy.get(pgGerenciamento.inputEmail).should('be.disabled')

    // Código abaixo garante que continua não sendo possível aterar o email após clicar em alterar senha (o que seria um bug)
    cy.get(pgGerenciamento.buttonAlterarSenha).click()
    cy.get(pgGerenciamento.inputEmail).should('be.disabled')
})

Then('só devo poder alterar a senha após clicar no botão que libera tal funcionalidade', function () {
    cy.get(pgGerenciamento.inputSenha).should('be.disabled')
    cy.get(pgGerenciamento.inputConfirmarSenha).should('be.disabled')

    cy.get(pgGerenciamento.buttonAlterarSenha).click()

    cy.get(pgGerenciamento.inputSenha).should('be.enabled')
    cy.get(pgGerenciamento.inputConfirmarSenha).should('be.enabled')
})

Then('não deve ser possível alterar o tipo da conta', function () {
    cy.get(pgGerenciamento.selectTipoUsuario).should('be.disabled')

    // Código abaixo garante que continua não sendo possível aterar o tipo de usuário após clicar em alterar senha (o que seria um bug)
    cy.get(pgGerenciamento.buttonAlterarSenha).click()
    cy.get(pgGerenciamento.selectTipoUsuario).should('be.disabled')
})

Then('a operação deve ser concluída com sucesso', function () {
    cy.wait('@salvarUsuario').then(function (resposta) {
        expect(resposta.response.statusCode).to.equal(200)
        cy.get(pgGerenciamento.modalTitulo).should('have.text', "Sucesso")
        cy.get(pgGerenciamento.modalDescricao).should('have.text', "Informações atualizadas!")
    })
})

Then('o nome deve estar atualizado ao acessar novamente a página', function () {
    cy.visit("/account")
    cy.get(pgGerenciamento.inputName).should('have.value', userCreated.name)
})

Then('deve ser possível realizar login com o novo valor da senha', function () {
    cy.intercept('POST', '/api/auth/login').as('logar')
    cy.contains("Perfil").click()
    cy.get(pgPerfil.buttonLogout).click()

    cy.contains("Login").click()
    pgLogin.logar(userCreated.email, userCreated.password)
    cy.wait('@logar').then(function (resposta) {
        expect(resposta.response.statusCode).to.equal(200)
    })
    cy.contains("Perfil").click()
    cy.contains(userCreated.email).should("exist")
})

Then('deve aparecer uma mensagem informando que as senhas não estão válidas {string}', function (mensagem) {
    pgGerenciamento.mensagemErro(3).should("contain.text", mensagem)
    pgGerenciamento.mensagemErro(4).should("contain.text", mensagem)
    cy.get("@salvarUsuario").should("not.exist")
})

Then('deve aparecer uma mensagem informando que não foi possível atualizar os dados', function () {
    cy.get(pgGerenciamento.modalTitulo).should("have.text", "Ocorreu um erro")
    cy.get(pgGerenciamento.modalDescricao).should("have.text", "Não foi possível atualizar os dados.")
    cy.wait("@salvarUsuario").then(function (resposta) {
        expect(resposta.response.statusCode).to.equal(400)
    })
})

Then('deve ser possível cancelar esta operação de mudar de senha', function () {
    cy.get(pgGerenciamento.buttonCancelarAlteracaoDeSenha).click()
    cy.get(pgGerenciamento.buttonAlterarSenha).should("have.text", "Alterar senha")
    cy.get(pgGerenciamento.inputSenha).should("be.disabled")
    cy.get(pgGerenciamento.inputConfirmarSenha).should("be.disabled")
})

Then('deve aparecer uma mensagem informando que as dvem estar iguais {string}', function (mensagem) {
    pgGerenciamento.mensagemErro(4).should("have.text", mensagem)
    cy.get("@salvarUsuario").should("not.exist")
})

Then('deve aparecer uma mensagem informando a obrigatoriedade de se passar um nome {string}', function (mensagem) {
    pgGerenciamento.mensagemErro(0).should("have.text", mensagem)
    cy.get("@salvarUsuario").should("not.exist")
})

Then('deve aparecer uma mensagem informando a obrigatoriedade de se passar uma senha {string}', function (mensagem) {
    pgGerenciamento.mensagemErro(3).should("have.text", mensagem)
    cy.get("@salvarUsuario").should("not.exist")
})

Then('deve aparecer uma mensagem informando informando que não foi possível salvar a senha {string}', function (mensagem) {
    pgGerenciamento.mensagemErro(4).should("have.text", mensagem)
    cy.get("@salvarUsuario").should("not.exist")
})

Then('a mensagem de sucesso deve ser fechada', function () {
    cy.get(pgGerenciamento.modal).should("not.exist")
})

Then('sou redirecionado para a página de login', function () {
    cy.location("pathname").should("equal", "/login")
})
