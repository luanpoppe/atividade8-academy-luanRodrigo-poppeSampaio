# language: pt

Funcionalidade: Validação do gerenciamento de conta
@ignore @userCreated
Cenário: Usuário logado deve conseguir ver suas próprias informações
    Dado que fiz o login com um usuário
    Quando acesso a página de perfil
    Então deve ser possível ver as informações sobre o usuário logado
@ignore @userCreated
Cenário: Usuário deve conseguir realizar o logout
        Dado que fiz o login com um usuário
        E que acessei a página de perfil
        Quando acesso a funcionalidade de logout
        Então a sessão do usuário deve ser encerrada
@ignore @userCreated
Cenário: Usuário deve conseguir gerenciar sua conta
    Dado que fiz o login com um usuário
    E que acessei a página de perfil
    Quando acesso a funcionalidade de gerenciar conta
    Então o site deve redirecionar à parte de gerenciamento da conta
@ignore @userCreated
Cenário: Usuário deve conseguir ver informações sobre sua própria conta na seção de gerenciamento de conta
    Dado que fiz o login com um usuário
    Quando acesso a seção do site de gerenciar conta
    Então deve ser possível ver informações importantes sobre a própria conta do usuário
@ignore @userCreated
Cenário: Usuário só deve poder alterar senha após clicar no botão que libera tal funcionalidade
    Dado que fiz o login com um usuário
    Quando acesso a seção do site de gerenciar conta
    Então só devo poder alterar a senha após clicar no botão que libera tal funcionalidade
@ignore @userCreated
Cenário: Usuário deve conseguir cancelar a operação de alterar uma senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando inicio a operação de mudar de senha
    Então deve ser possível cancelar esta operação de mudar de senha
@ignore @userCreated
Cenário: Usuário do tipo comum não deve poder alterar o tipo de sua conta
    Dado que sou um usuário do tipo comum
    Quando acesso a seção do site de gerenciar conta
    Então não deve ser possível alterar o tipo da conta
@ignore @userCreated
Cenário: Usuário não deve conseguir alterar seu próprio email
    Dado que sou um usuário do tipo comum
    Quando acesso a seção do site de gerenciar conta
    Então não deve ser possível alterar o email da conta
@ignore @userCreated
Cenário: Usuário deve conseguir alterar seu nome
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar o nome do usuário
    Então a operação deve ser concluída com sucesso
    E o nome deve estar atualizado ao acessar novamente a página
@ignore @userCreated
Cenário: Usuário deve conseguir alterar sua senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário
    Então a operação deve ser concluída com sucesso
    E deve ser possível realizar login com o novo valor da senha
@ignore @userCreated
Cenário: Usuário não deve conseguir alterar sua senha passando um valor muito curto
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário passando um valor muito curto
    Então deve aparecer uma mensagem informando que as senhas não estão válidas "A senha deve ter pelo menos 6 dígitos"
@ignore @userCreated
Cenário: Usuário não deve conseguir alterar sua senha passando um valor muito longo
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário passando um valor muito longo
    Então deve aparecer uma mensagem informando que não foi possível atualizar os dados
@ignore @userCreated
Cenário: Deve ser possível atualizar senha passando um senha com 6 e 12 dígitos
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário passando um valor com "<numero>" caracteres
    Então a operação deve ser concluída com sucesso
    Exemplos:
        | numero |
        | 6      |
        | 12     |
@ignore @userCreated
Cenário: Usuário não deve conseguir alterar sua senha passando valor de senha diferente na confirmação da senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha passando um valor diferente para senha e para confirmação da senha
    Então deve aparecer uma mensagem informando que as dvem estar iguais "As senhas devem ser iguais."
@ignore @userCreated
Cenário: Usuário não deve conseguir atualizar seu nome sem passar um valor de nome
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar o usuário sem passar um novo valor de nome
    Então deve aparecer uma mensagem informando a obrigatoriedade de se passar um nome "Informe o nome"
@ignore @userCreated
Cenário: Usuário não deve conseguir atualizar sua senha sem passar um valor de senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário sem passar um novo valor de senha
    Então deve aparecer uma mensagem informando a obrigatoriedade de se passar uma senha "Campo obrigatório"
@ignore @userCreated
Cenário: Usuário não deve conseguir atualizar sua senha sem passar um valor de confirmação da senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário sem passar um valor na confirmação da senha
    Então deve aparecer uma mensagem informando informando que não foi possível salvar a senha "As senhas devem ser iguais."
@ignore @userCreated
Cenário: Deve ser possível fechar mensagem de sucesso ao alterar informações do usuário ao clicar no botão disponível para isso
    Dado que sou um usuário do tipo comum
    E alterei as informações do usuário
    Quando tento fechar a mensagem de sucesso clicando no botão disponível
    Então a mensagem de sucesso deve ser fechada
@ignore @userCreated
Cenário: Deve ser possível fechar mensagem de sucesso ao alterar informações do usuário ao clicar fora da mensagem
    Dado que sou um usuário do tipo comum
    E alterei as informações do usuário
    Quando tento fechar a mensagem de sucesso clicando fora da mensagem
    Então a mensagem de sucesso deve ser fechada

Cenário: Apenas um usuário logado pode acessar a seção de perfil de um usuário
    Quando tento acessar a seção de perfil sem estar logado com um usuário
    Então sou redirecionado para a página de login

Cenário: Apenas um usuário logado pode acessar a seção de alterar informações de um usuário
    Quando tento acessar a seção de gerenciamento de conta sem estar logado com um usuário
    Então sou redirecionado para a página de login