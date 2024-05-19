export class LoginPage {
    tituloPagina = "h3"
    headerDescricao = ".login-content-header span"

    inputEmail = '[name="email"]'
    inputSenha = '[name="password"]'

    buttonLogin = ".login-button"

    modal = ".modal-content"
    modalButton = ".modal-content button"

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

    mensagemDeErro(posicaoMensagem) {
        return cy.get(".input-container").find(".input-error").eq(posicaoMensagem)
    }
}
