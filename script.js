const telaInicio = document.getElementById("secao-inicio");
const telaPrevisao = document.getElementById("secao-previsao-tempo");
const telaMaisInformacoes = document.getElementById("secao-mais-informacoes");
const textoErroProcuraCidade = document.getElementById("erro-procura-cidade");
const botaoPesquisarCidade = document.getElementById("btn-pesquisa-cidade");
const botoesFecharPrevisao = document.querySelectorAll(".btn-fechar-previsao");
const botaoAbreMaisInformacoes = document.getElementById("btn-mostrar-mais-informacoes");
const botaoAbrePrevisao = document.getElementById("btn-mostrar-previsao");

botaoPesquisarCidade.addEventListener("click", () => {
    const cidade = document.getElementById("cidade").value.toLowerCase();

    if (cidade !== "") {
        pegaPrevisaoDoTempo(cidade);
    }
});

botoesFecharPrevisao.forEach((botao) => {
    botao.addEventListener("click", () => {
        telaPrevisao.style.display = "none";
        telaMaisInformacoes.style.display = "none";
        telaInicio.style.display = "flex";
    })
});

botaoAbreMaisInformacoes.addEventListener("click", () => {
    telaPrevisao.style.display = "none";
    telaMaisInformacoes.style.display = "flex";
});

botaoAbrePrevisao.addEventListener("click", () => {
    telaMaisInformacoes.style.display = "none";
    telaPrevisao.style.display = "flex";
})

async function pegaPrevisaoDoTempo(cidade) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7969c5ec057844d3a4d142920251707&q=${cidade}&days=3&aqi=no&lang=pt`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        const clima = data.current;
        const previsao = data.forecast.forecastday;
        const local = data.location;
        
        mostraPrevisao(clima, previsao, local);
    } catch (error) {
        console.error("Algo deu errado!", error);

        textoErroProcuraCidade.style.display = "block";
    }
}

function mostraPrevisao(clima, previsao, local) {
    const nomesCidades = document.querySelectorAll(".nome-cidade");
    const datas = document.querySelectorAll(".data");
    const dataAtual = new Date(previsao[0].date);
    const diaDaSemana = dataAtual.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ',');
    const dia = dataAtual.getDate();
    const mes = dataAtual.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const iconeTempo = document.getElementById("icone-tempo");
    const tempoTexto = document.getElementById("texto-tempo");
    const temperaturaMinima = document.getElementById("temperatura-minima");
    const temperatura = document.getElementById("temperatura");
    const temperaturaMaxima = document.getElementById("temperatura-maxima");
    const iconeTemperaturaAmanha = document.getElementById("icone-previsao-amanha");
    const dataAmanha = new Date(previsao[1].date);
    const diaDaSemanaAmanha = dataAmanha.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const textoDiaDaSemanaAmanha = document.getElementById("dia-amanha");
    const temperaturaMaximaAmanha = document.getElementById("temperatura-maxima-amanha");
    const temperaturaMinimaAmanha = document.getElementById("temperatura-minima-amanha");
    const iconeTemperaturaDepoisAmanha = document.getElementById("icone-previsao-depois-amanha");
    const dataDepoisAmanha = new Date(previsao[2].date);
    const diaDaSemanaDepoisAmanha = dataDepoisAmanha.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const textoDiaDaSemanaDepoisAmanha = document.getElementById("dia-depois-amanha");
    const temperaturaMaximaDepoisAmanha = document.getElementById("temperatura-maxima-depois-amanha");
    const temperaturaMinimaDepoisAmanha = document.getElementById("temperatura-minima-depois-amanha");
    const vento = document.getElementById("velocidade-vento");
    const umidade = document.getElementById("umidade");
    const chanceDeChuva = document.getElementById("chance-de-chuva");
    const hora = local.localtime.slice(11, 13);
    
    const nuvens = document.getElementById("nuvens");
    const pressaoAtmosferica = document.getElementById("pressao-atmosferica");
    const nascerSol = document.getElementById("horario-nascer-sol");
    const porSol = document.getElementById("horario-por-sol");

    nomesCidades[0].textContent = local.name;
    nomesCidades[1].textContent = local.name;

    datas[0].innerHTML = `${diaDaSemana}<br>${dia} ${mes}`;
    datas[1].innerHTML = `${diaDaSemana}<br>${dia} ${mes}`;

    iconeTempo.src = clima.condition.icon;

    tempoTexto.textContent = clima.condition.text;

    temperaturaMinima.textContent = previsao[0].day.mintemp_c + "°";
    temperatura.textContent = clima.temp_c + "°";
    temperaturaMaxima.textContent = previsao[0].day.maxtemp_c + "°";

    iconeTemperaturaAmanha.src = previsao[1].day.condition.icon;
    textoDiaDaSemanaAmanha.textContent = diaDaSemanaAmanha.toUpperCase();
    temperaturaMinimaAmanha.textContent = previsao[1].day.mintemp_c + "°";
    temperaturaMaximaAmanha.textContent = previsao[1].day.maxtemp_c + "°";

    iconeTemperaturaDepoisAmanha.src = previsao[2].day.condition.icon;
    textoDiaDaSemanaDepoisAmanha.textContent = diaDaSemanaDepoisAmanha.toUpperCase();
    temperaturaMinimaDepoisAmanha.textContent = previsao[2].day.mintemp_c + "°";
    temperaturaMaximaDepoisAmanha.textContent = previsao[2].day.maxtemp_c + "°";

    vento.textContent = clima.wind_kph + " km/h";
    umidade.textContent = clima.humidity + "%";
    chanceDeChuva.textContent = previsao[0].hour[hora].chance_of_rain + "%";
    nuvens.textContent = clima.cloud + "%";
    pressaoAtmosferica.textContent = clima.pressure_mb + "mbar";
    nascerSol.textContent = previsao[0].astro.sunrise;
    porSol.textContent = previsao[0].astro.sunset;

    setTimeout(() => {
        telaInicio.style.display = "none";
        telaPrevisao.style.display = "flex";
        textoErroProcuraCidade.style.display = "none";
    }, 1000);
}