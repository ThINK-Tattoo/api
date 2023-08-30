## Como fazer push no repositório.

Primeiro é necessario realizar o login no github, dependendo do git clone que você for dar, poderá pedir o seu token, então se for preciso, crie um.

```bash
# Clone no Projeto
$ git clone https://github.com/ThINK-Tattoo/api.git

# Caso queira puxar atualizações do projeto feitas por outras pessoas
$ git pull

# Logue no GitHub!
$ git config --global user.email "seu@email.com"
$ git config --global user.name "seuNome"

# Verifique o commit
$ git status

# Adicione os arquivos modificados
$ git add . 

# Dê o commit
$ git commit -m "mensagem com coisas"

# Agora é só dar o push
$ git push (caso não funcione, tente git push origin main)

```
