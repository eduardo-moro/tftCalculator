# Calculador de rounds do TFT
![](https://img.shields.io/badge/node-14.16.0-lightseagreen)
![](https://img.shields.io/badge/npm-7.8.0-informational)
![](https://img.shields.io/badge/react--native--cli-2.0.1-green)

### Por quê?

Ao jogar tft, uma vantagem possível, é ter uma noção de quais os possíveis inimigos para a próxima rodada, podendo assim preparar os cards de acordo com as possibilidades.

### O que utilizei?

- RN Navigation 5 (stack);
- Async Storage (community version);

### Como rodar? (desenvolvimento)

Primeiro de tudo, é preciso instalar as dependências do projeto:
```
npm install
```

Então é nescessário iniciar o servidor do Metro, responsável por conectar o dispositivo à aplicação:
``` 
npm run start 
```

Em sequência, precisamos iniciar a aplicação em sí, neste momento se você tiver um emulador instalado, o emulador será iniciado automagicamente, se não houver um emulador, será preciso conectar um aparelho android em "modo adb", caso nenhum aparelho seja encontrado, a aplicação não será iniciada:
```
npm run android
```
* aplicação não testada em aparelhos com ios.

### Prints do projeto: 

<table>
    <tbody>
        <tr>
            <td>
                Tela inicial:
            </td>
            <td>
                Configuração de nicks:
            </td>
            <td>
                Cálculo das rodadas:
            </td>
        </tr>
    </tbody>
<thead>
</thead>
    <tbody>
        <tr>
            <td>

![initial page](./prints/initial.jpeg)
            </td>
            <td>

![initial page](./prints/nicks.jpeg)
            </td>
            <td>

![initial page](./prints/rounds.jpeg)
            </td>
        </tr>
    </tbody>
</table>

### O que falta ser feito:

- Implementar o cálculo em sí;
- Corrigir falhas ao retornar para tela inicial, e ao mudar os status dentro da tela de cálculo, utilizando `useEffect`, para tratar a chamada dos componentes.
- Refatorar o código para seguir melhor o conceito DRY;
- Melhorar a interface, e a tela de splash.


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>




