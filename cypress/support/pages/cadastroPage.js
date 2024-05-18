export class CadastroPage {
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
}