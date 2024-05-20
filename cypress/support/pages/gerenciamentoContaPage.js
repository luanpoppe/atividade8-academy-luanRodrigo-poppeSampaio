export class GerenciamentoContaPage {
    pageTitle = ".register-account-header h3"
    pageDescription = ".register-account-header span"

    inputName = '.account-form [name="name"]'
    inputEmail = '.account-form [name="email"]'
    inputSenha = '.account-form [name="password"]'
    inputConfirmarSenha = '.account-form [name="confirmPassword"]'
    selectTipoUsuario = '.account-form [name="type"]'

    buttonAlterarSenha = ".account-form .account-password-button"
    buttonCancelarAlteracaoDeSenha = ".account-form .account-password-button-cancel"
    buttonSalvar = ".account-form .account-save-button"

    modal = ".modal-content"
    modalTitulo = ".modal-content h3"
    modalDescricao = ".modal-content .error-message"
    modalBotao = ".modal-content button"

    mensagemErro(posicaoCampo) {
        return cy.get(".input-container").eq(posicaoCampo).find("span.input-error")
    }

    getLabel(posicaoLabel) {
        return cy.get(".account-form label").eq(posicaoLabel)
    }

    clickSalvar() {
        return cy.get(this.buttonSalvar).click()
    }

    clickAlterarSenha() {
        return cy.get(this.buttonAlterarSenha).click()
    }

    alterarSenha(novaSenha) {
        this.clickAlterarSenha()
        cy.get(this.inputSenha).clear().type(novaSenha)
        cy.get(this.inputConfirmarSenha).clear().type(novaSenha)
        return this.clickSalvar()
    }
}