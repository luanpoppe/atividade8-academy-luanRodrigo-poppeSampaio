# language: pt

Funcionalidade: Validação do gerenciamento de conta
@ignore
Cenário: Usuário logado deve conseguir ver suas próprias informações
    Dado que fiz o login com um usuário
    Quando acesso a página de perfil
    Então deve ser possível ver as informações sobre o usuário logado
@ignore
Cenário: Usuário deve conseguir realizar o logout
        Dado que fiz o login com um usuário
        E acessei a página de perfil
        Quando acesso a funcionalidade de logout
        Então a sessão do usuário deve ser encerrada
@ignore
Cenário: Usuário deve conseguir gerenciar sua conta
    Dado que fiz o login com um usuário
    E que acessei a página de perfil
    Quando acesso a funcionalidade de gerenciar conta
    Então o site deve redirecionar à parte de gerenciamento da conta
@ignore
Cenário: Usuário deve conseguir ver informações sobre sua própria conta na seção de gerenciamento de conta
    Dado que fiz o login com um usuário
    Quando acesso a seção do site de gerenciar conta
    Então deve ser possível ver informações importantes sobre a própria conta do usuário
@ignore
Cenário: Usuário só deve poder alterar senha após clicar no botão que libera tal funcionalidade
    Dado que fiz o login com um usuário
    Quando acesso a seção do site de gerenciar conta
    Então só devo poder alterar a senha após clicar no botão que libera tal funcionalidade
@ignore
Cenário: Usuário deve conseguir cancelar a operação de alterar uma senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando inicio a operação de mudar de senha
    Então deve ser possível cancelar esta operação de mudar de senha
@ignore
Cenário: Usuário do tipo comum não deve poder alterar o tipo de sua conta
    Dado que sou um usuário do tipo comum
    Quando acesso a seção do site de gerenciar conta
    Então não deve ser possível alterar o tipo da conta
@ignore
Cenário: Usuário não deve conseguir alterar seu próprio email
    Dado que sou um usuário do tipo comum
    Quando acesso a seção do site de gerenciar conta
    Então não deve ser possível alterar o email da conta
@ignore
Cenário: Usuário deve conseguir alterar seu nome
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar o nome do usuário
    Então a operação deve ser concluída com sucesso
    E o nome deve estar atualizado ao acessar novamente a página
@ignore
Cenário: Usuário deve conseguir alterar sua senha
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário
    Então a operação deve ser concluída com sucesso
    E deve ser possível realizar login com o novo valor da senha
@ignore
Cenário: Usuário não deve conseguir alterar sua senha passando um valor muito curto
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário passando um valor muito curto
    Então deve aparecer uma mensagem informando que as senhas não estão válidas "A senha deve ter pelo menos 6 dígitos"

Cenário: Usuário não deve conseguir alterar sua senha passando um valor muito longo
    Dado que sou um usuário do tipo comum
    E que acessei a seção do site de gerenciar conta
    Quando tento alterar a senha do usuário passando um valor muito longo
    Então deve aparecer uma mensagem informando que não foi possível atualizar os dados

# Cenário: Deve ser possível atualizar senha passando um senha com 6 e 12 dígitos

# Cenário: Usuário não deve conseguir alterar sua senha passando valor de senha diferente na confirmação da senha

# Cenário: Usuário não deve conseguir atualizar seu nome sem passar um valor de nome

# Cenário: Usuário não deve conseguir atualizar sua senha sem passar um valor de senha

# Cenário: Deve ser possível fechar mensagem de sucesso ao alterar informações do usuário ao clicar no botão disponível para isso

# Cenário: Deve ser possível fechar mensagem de sucesso ao alterar informações do usuário ao clicar fora da mensagem

# Apenas um usuário logado pode acessar a seção de alterar informações de um usuário