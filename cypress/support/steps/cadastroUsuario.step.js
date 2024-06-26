import { After, Before, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CadastroPage } from "../pages/cadastroPage";
import { faker } from "@faker-js/faker";

const pgCadastro = new CadastroPage()
let user
let userCreated
let user2

Before(function () {
    user = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    }

    cy.viewport("macbook-13")
    cy.intercept('POST', '/api/users').as('cadastroUsuario')
    cy.intercept('POST', '/api/auth/login').as('logarUsuario')
})

After({ tags: "@userCreated" }, function () {
    cy.deleteUser(userCreated.id, userCreated.email, userCreated.password)
})

Given('que acessei a página de cadastrar usuário', function () {
    cy.visit("/")
    cy.get('.navbar [href="/register"]').click()
})

Given('que sei o email de um usuário já cadastrado', function () {
    cy.createUser().then(function (resposta) {
        user2 = resposta
    })
})

Given('que sei o email de um usuário cadastrado todo em caps lock', function () {
    cy.createUser(user.email.toUpperCase()).then(function (resposta) {
        user2 = resposta
    })
})


// region: WHEN

When('preencho os campos obrigatórios com valores válidos', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)
})

When('olho as informações da página', function () {

})

When('tento realizar o cadastro', function () {
    pgCadastro.clickCadastrar()
})

When('crio um usuário', function () {
    pgCadastro.criarUsuario().then(function (resposta) {
        userCreated = resposta
    })
})

When('tento criar um usuário sem preencher nenhum dos campos obrigatórios', function () {
    pgCadastro.clickCadastrar()
})

When('tento criar usuário sem passar um nome', function () {
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

When('tento criar usuário sem passar um email', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

When('tento criar usuário sem passar uma senha', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarConfirmarSenha(user.password)
    pgCadastro.digitarEmail(user.email)

    pgCadastro.clickCadastrar()
})

When('tento criar usuário sem repetir a senha', function () {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)

    pgCadastro.clickCadastrar()
})

When('tento criar novo usuário com o mesmo email', function () {
    const newUser = {
        name: user.name,
        email: user2.email,
        password: user.password,
    }
    pgCadastro.criarUsuario(newUser)
})

When('tento criar novo usuário com o mesmo email porém todo com letras minúsculas', function () {
    const newUser = {
        name: user.name,
        email: user2.email.toLowerCase(),
        password: user.password,
    }
    pgCadastro.criarUsuario(newUser)
})

When('tento fechar a mensagem clicando no botão disponível', function () {
    cy.get(pgCadastro.modalButton).click()
})

When('tento fechar a mensagem clicando fora da mensagem', function () {
    cy.get(pgCadastro.modal).click(-50, 50, {
        force: true
    })
})

When('tento criar um usuário com um email já utilizado por outro usuário', function () {
    cy.createUser().then(function (resposta) {
        user2 = resposta
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

When('tento criar um usuário com um email inválido {string}', function (email) {
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

When('tento cadastrar usuário com uma senha muito curta', function () {
    const senha = "abc12"
    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(senha)
    pgCadastro.digitarConfirmarSenha(senha)

    pgCadastro.clickCadastrar()
})

When('tento cadastrar com uma senha muito longa', function () {
    let senha = ""
    while (senha.length <= 12) {
        senha += "a"
    }
    user.password = senha

    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(senha)
    pgCadastro.digitarConfirmarSenha(senha)

    pgCadastro.clickCadastrar()
})

When('tento cadastrar com qualquer valor de nome {string}', function (nome) {

    pgCadastro.digitarNome(nome)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

When('tento criar um usuário passando uma senha de {int} dígitos', function (tamanho) {
    let senha = ""
    while (senha.length < tamanho) {
        senha += "a"
    }

    user.password = senha

    pgCadastro.digitarNome(user.name)
    pgCadastro.digitarEmail(user.email)
    pgCadastro.digitarSenha(user.password)
    pgCadastro.digitarConfirmarSenha(user.password)

    pgCadastro.clickCadastrar()
})

// region: THEN

Then('a página deve conter informações sobre o cadastro de usuários', function () {
    cy.get(pgCadastro.tituloPagina).should("have.text", "Cadastre-se").and("be.visible")
    cy.get(pgCadastro.headerDescricao).should("have.text", "Crie uma conta para poder acessar Raromdb.").and("be.visible")
    cy.get(pgCadastro.buttonCadastrar).should("have.text", "Cadastrar").and("be.visible")
    cy.get("label").should("contain.text", "Nome:").and("contain.text", "E-mail:").and("contain.text", 'Senha').and("contain.text", "Confirmar senha:")
})

Then('deve ser mostrado uma mensagem de sucesso', function () {
    cy.wait('@cadastroUsuario').then(function (resposta) {
        userCreated = resposta.response.body
        userCreated.password = user.password
    })
    cy.get(pgCadastro.modal).should("contain.text", "Cadastro realizado!")
    cy.get(pgCadastro.modal).contains("h3", "Sucesso").should("exist")
})

Then('sua conta deve ser do tipo comum', function () {
    cy.wrap(userCreated).its("type").should("equal", 0)
    cy.contains("a", "Perfil").click()
    cy.get('[href="/account"]').click()
    cy.get('.account-form [name="type"]').should("have.value", 0)
})

Then('deve aparecer um aviso informando que o nome é obrigatório', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    pgCadastro.mensagemDeErro(0).should("contain.text", "Informe o nome")
})

Then('deve aparecer um aviso informando que o email é obrigatório', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    pgCadastro.mensagemDeErro(1).should("contain.text", "Informe o e-mail")
})

Then('deve aparecer um aviso informando que a senha é obrigatória', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 2)
    pgCadastro.mensagemDeErro(2).should("contain.text", "Informe a senha")
    pgCadastro.mensagemDeErro(3).should("contain.text", "As senhas devem ser iguais.")
})

Then('deve aparecer um aviso informando que é obrigatório repetir a senha', function () {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    pgCadastro.mensagemDeErro(3).should("contain.text", "Informe a senha")
})

Then('deve aparecer as mensagens referentes aos campos obrigatórios', function () {
    pgCadastro.mensagemDeErro(0).should("contain.text", "Informe o nome")
    pgCadastro.mensagemDeErro(1).should("contain.text", "Informe o e-mail")
    pgCadastro.mensagemDeErro(2).should("contain.text", "Informe a senha")
    pgCadastro.mensagemDeErro(3).should("contain.text", "Informe a senha")
})

Then('deve aparecer uma mensagem informando não ser possível realizar a operação', function () {
    cy.get(pgCadastro.modal).contains("E-mail já cadastrado. Utilize outro e-mail").should("exist")
    cy.get(pgCadastro.modal).contains("h3", "Falha no cadastro.").should("exist")
})

Then('a mensagem deve ser fechada', function () {
    cy.get(pgCadastro.modal).should("not.exist")
})

Then('deve aparecer uma mensagem de erro no cadastro {string}', function (mensagem) {
    cy.get('@cadastroUsuario').should("not.exist")
    cy.get(".input-error").should("have.length", 1)
    pgCadastro.mensagemDeErro(3).should("contain.text", mensagem)
})

Then('deve aparecer uma mensagem informando falha no cadastro', function () {
    cy.get(pgCadastro.modal).contains("h3", "Falha no cadastro.")
    cy.get(pgCadastro.modal).contains("Não foi possível cadastrar o usuário.")
    cy.wait('@cadastroUsuario').then(function (intercept) {
        expect(intercept.response.statusCode).to.equal(400)
    })
})

Then('deve ser realizado o login automaticamente do usuário criado', function () {
    cy.contains("a", "Perfil").should("not.exist")
    cy.wait('@logarUsuario').then(function (resposta) {
        expect(resposta.response.statusCode).to.equal(200)
        cy.contains("a", "Perfil").should("exist")
    })
})

Then('as opções de navegação devem mudar para condizer com o usuário logado', function () {
    cy.get(pgCadastro.header).find("a").should("not.contain.text", "Perfil")
    cy.get(pgCadastro.header).find("a").should("contain.text", "Registre-se")
    cy.get(pgCadastro.header).find("a").should("contain.text", "Login")
    cy.wait('@logarUsuario').then(function (resposta) {
        cy.get(pgCadastro.header).find("a").should("contain.text", "Perfil")
        cy.get(pgCadastro.header).find("a").should("not.contain.text", "Registre-se")
        cy.get(pgCadastro.header).find("a").should("not.contain.text", "Login")
    })
})

Then('deve aparecer mensagem informando o erro {string}', function (mensagem) {
    cy.get(".input-error").should("have.length", 2)
    pgCadastro.mensagemDeErro(2).should("contain.text", mensagem)
    pgCadastro.mensagemDeErro(3).should("contain.text", mensagem)
})

Then('sua conta conta deve estar ativa', function () {
    cy.wrap(userCreated).its("active").should("equal", true)
})