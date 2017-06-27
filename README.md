# Contador de Seguidores Instagram com Raspberry Pi

## Funcionamento do contador

O contador basicamente é um servidor que exibe uma página Web no navegador Chromium da Raspberry Pi. O servidor foi desenvolvido utilizando a linguagem Node.js e a parte gráfica do contador foi desenvolvida em HTML com um pouco de javascript. O acesso aos números e informações sobre a conta do Instagram foi feito através da API do Instagram.
 
Quando o OS da Raspberry Pi inicia, o servidor Node.js inicia automaticamente disponibilizando a página Web no endereço local da Raspberry Pi (localhost 127.0.01). Logo em seguida o Chromium inicia automaticamente em modo kiosk acessando o endereço do servidor que por sua vez exibe ao usuário uma tela de login onde devem ser inseridas as informações sobre a conta Instagram da qual se deseja obter as informações. Após o login o contador é iniciado.

## Instalação do servidor Node.js

Clone o repositório do github onde está o código fonte do contador na pasta /home/pi/ em sua Raspberry Pi. 
 
    git clone https://github.com/giobauermeister/ig-followers-counter-raspberrypi.git
 
Entre na pasta clonada.
 
    cd ig-followers-counter-raspberrypi
 
Instale as dependências do servidor.
 
    npm install -g 
 
Com um editor de texto abra o arquivo app.js para inserir as credenciais da aplicação cliente nas linhas 16 e 17:
 
```node
api.use({
  client_id: 'xxxxxxx',
  client_secret: 'xxxxxxx'
});
```

## Executando a aplicação manualmente

Antes de executar a aplicação certifique-se de que a Raspberry Pi está conectada a internet via WiFi ou cabo Ethernet. Então execute a aplicação com o comando ‘node app.js’. Se tudo der certo você verá no terminal a mensagem “Server listening on 127.0.0.1:8080...”.
 
```bash
node app.js
Server listening on 127.0.0.1:8080...
```
 
Abra outro terminal e execute o comando abaixo para abrir o Chromium em modo kiosk no endereço do servidor:
 
    chromium-browser --incognito --window-size=800,480 --kiosk "http://localhost:8080/authorize_user"
 
Após o comando, o Chromium deverá abrir exibindo uma tela de login do Instagram. Entre com a conta da qual se deseja contar os seguidores.

Uma tela de autorização deverá aparecer indicando que nossa aplicação criada “contador-seguidores” deseja ter acesso às informações básicas de mídia e perfil. Clique em Authorize.

Então você verá a o contador que após alguns segundos começará a contar o número de seguidores.

## Configurando início automático da aplicação

Agora que o servidor está funcionando corretamente vamos fazer a configuração para que a aplicação inicie automaticamente após a inicialização do SO. Para isso vamos utilizar os recursos do systemd.
 
Copie o arquivo launch-ig-counter.service para a pasta /lib/systemd/system/
 
    sudo cp launch-ig-counter.service /lib/systemd/system/
 
Habilite o serviço no sistema.
 
    sudo systemctl enable launch-ig-counter.service
 
Então inicie o serviço.
 
    sudo systemctl start launch-ig-counter.service
 
Verifique o se o serviço iniciou corretamente com o comando.
 
    sudo systemctl status launch-ig-counter.service
 
Deve aparecer active (running).
 
```bash
launch-ig-counter.service - Start Instagram Followers Counter
   Loaded: loaded (/lib/systemd/system/launch-ig-counter.service; enabled)
   Active: active (running) since Wed 2017-06-14 10:01:26 BRT; 8s ago
 Main PID: 7233 (launch-ig-count)
 ```
 
Com isso, o contador irá iniciar automaticamente toda vez após a inicialização do SO da Raspberry Pi.


