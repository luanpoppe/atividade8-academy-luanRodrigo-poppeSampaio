export class LoginPage {
    tituloPagina = "h3"
    headerDescricao = ".register-account-header span"

    inputEmail = '[name="email"]'
    inputSenha = '[name="password"]'

    buttonLogin = ".login-button"

    digitarEmail(texto) {
        return cy.get(this.inputEmail).type(texto)
    }

    digitarSenha(texto) {
        return cy.get(this.inputSenha).type(texto)
    }

    clickLogar() {
        return cy.get(this.buttonLogin).click()
    }

    logar(email, senha) {
        this.digitarEmail(email)
        this.digitarSenha(senha)

        this.clickLogar()
    }
}
