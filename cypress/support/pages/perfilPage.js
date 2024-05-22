export class PerfilPage {
    spanUserName() {
        return cy.get(".profile-container .user-info span").eq(0)
    }
    spaneUserEmail() {
        return cy.get(".profile-container .user-info span").eq(1)
    }

    divNickname = ".profile-nickname"

    buttonLogout = '[href="/logout"]'
    buttonGerenciarConta = '[href="/account"]'

    tituloReviews = ".ratings h2"
    divReviews = ".ratings .ratings-container"
    titulosFilmes = ".ratings .review-card-header"
    estrelasAvaliacoes = ".ratings .stars"
}