
function procurarConcelho() {
    console.log(document.getElementById('name-form1-k').value)
    let pesquisaTexto = (document.getElementById('name-form1-k').value)

    //cria a instancia, e gerencia a URL de envio baseado no input do usuario
    let xmlHttp = new XMLHttpRequest()
    let urlPesquisaApi

    if (pesquisaTexto == '' || pesquisaTexto == null) {
        urlPesquisaApi = 'https://api.adviceslip.com/advice'
    }
    else {
        urlPesquisaApi = 'https://api.adviceslip.com/advice/search/' + pesquisaTexto
    }


    xmlHttp.open('GET', urlPesquisaApi)
    console.log(urlPesquisaApi)
    //funcao quando receber o resultado
    xmlHttp.onreadystatechange = () => {
        console.log(xmlHttp.status)
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

            //Pega o resultado em converte em OBJ
            let JSONConcelhoText = xmlHttp.responseText
            console.log(JSONConcelhoText)

            let JSONConcelho = JSON.parse(JSONConcelhoText)

            console.log(JSONConcelho)

            //console.log(JSONConcelho.slips[0].advice)
            //Verifica se o Bjeto tem a propridade SLIPS (tem quando retorna mais de um concelho)
            if (JSONConcelho.hasOwnProperty('slips')) {

                //faz as tratativas de pegar o concelho do OBJ e inserir no elemento HTML
                let totalResultados = JSONConcelho.total_results
                console.log('Total resultados: ' + totalResultados)

                let i = Math.floor(Math.random() * totalResultados)
                console.log(i)

                let concelhoTexto = JSONConcelho.slips[i].advice

                let textBoxConselho = document.getElementById('textBoxConcelho')

                textBoxConselho.innerHTML = concelhoTexto
                textBoxConselho.classList.remove("animate__animated", "animate__backInDown")
                textBoxConselho.style = "opacity: 0;"
                setTimeout(
                    () => {
                        textBoxConselho.classList.add("animate__animated", "animate__backInDown")
                        textBoxConselho.style = "opacity: 1;"

                    }, 10
                )
            }
            //verifica se tem a propriedade SLIP (tem quando retorna somente um concelho)
            else if (JSONConcelho.hasOwnProperty('slip')) {
                
                //faz as tratativas de pegar o concelho do OBJ e inserir no elemento HTML

                let concelhoTexto = JSONConcelho.slip.advice

                let textBoxConselho = document.getElementById('textBoxConcelho')

                textBoxConselho.innerHTML = concelhoTexto
                textBoxConselho.classList.remove("animate__animated", "animate__backInDown")
                textBoxConselho.style = "opacity: 0;"
                setTimeout(
                    () => {
                        textBoxConselho.classList.add("animate__animated", "animate__backInDown")
                        textBoxConselho.style = "opacity: 1;"

                    }, 10
                )
            }
            else {
                let textBoxConselho = document.getElementById('textBoxConcelho')
                textBoxConselho.innerHTML = 'Nenhum concelho encotrado, tente outra palavra... 😊'
            }



        }
    }

    xmlHttp.send()
}