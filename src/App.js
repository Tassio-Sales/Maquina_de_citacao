import React, { useEffect, useState } from 'react';
import './App.scss';
import ARRAY_DE_CORES from './arrayCores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';


let citacaoDBUrl =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [citacao, setCitacao] = useState(
    'I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.'
  );
  const [autor, setAutor] = useState('Leonardo da Vinci');
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [arrayCitacao, setArrayCitacao] = useState([]);
  const [cor, setCor] = useState('#282c34')

  const buscarCitacao = async (url) => {
    const resposta = await fetch(url);
    const analisarJSON = await resposta.json();
    setArrayCitacao(analisarJSON.quotes);
    console.log(analisarJSON);
  };

  useEffect(() => {
    buscarCitacao(citacaoDBUrl);
  }, [citacaoDBUrl]);

  const gerarNumeroAleatorio = () => {
    if (!arrayCitacao || arrayCitacao.length === 0) {
      console.error('Array de citações está vazio, nulo ou indefinido.');
      return;
    }

    let InteiroAleatorio = Math.floor(arrayCitacao.length * Math.random());
    setNumeroAleatorio(InteiroAleatorio);
    setCor(ARRAY_DE_CORES[InteiroAleatorio])
    setCitacao(arrayCitacao[InteiroAleatorio].quote);
    setAutor(arrayCitacao[InteiroAleatorio].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: cor, color: cor }}>
        <div id="quote-box" style={{color: cor}}>          
          <p id="text">"{arrayCitacao.length > 0 ? citacao : 'Nenhuma citação disponível'}"</p>
          <p id="author">- {arrayCitacao.length > 0 ? autor : 'Autor Desconhecido'}</p>
          <div className='buttons'>
            <a id="tweet-quote" style={{ color: cor}} href={encodeURI(`https://www.twitter.com/intent/tweet?text=${citacao} - ${autor}`)}><FontAwesomeIcon icon={faTwitter}/></a>
            <button id="new-quote" style={{ color: cor }} onClick={gerarNumeroAleatorio}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>                    
        </div>
      </header>
    </div>
  );
}

export default App;
