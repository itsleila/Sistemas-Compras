import React from 'react';

const MaisInformacoes = () => {
  return (
    <div>
      <nav>
        <ul className="nav-info">
          <li>
            <a href="/" className="nav-li">
              Home
            </a>
          </li>
          <li>
            <a href="#sobreNos" className="nav-li">
              Sobre Nos
            </a>
          </li>
          <li>
            <a href="#contato" className="nav-li">
              Contato
            </a>
          </li>
          <li>
            <a href="#politicaPrivacidade" className="nav-li">
              Politica de privacidade
            </a>
          </li>
          <li>
            <a href="#termos" className="nav-li">
              Termos de uso
            </a>
          </li>
        </ul>
      </nav>
      <div className="info-container">
        <section id="sobreNos" className="p-4 m-3">
          <h2 className="info-Title">Sobre nós</h2>
          <p className="info-paragrafo">
            Lorem ipsum dolor sit amet. Eum delectus culpa a distinctio corporis
            qui iste voluptatum non facere rerum sit quisquam nobis sit deserunt
            soluta eum molestias adipisci! Eos atque soluta non quis error sit
            sapiente repellat aut quasi maiores qui velit omnis vel delectus
            voluptatem sed debitis iste. Et magnam commodi et atque eius vel
            dolore libero ut neque fugiat et consectetur sequi ex obcaecati
            harum ea debitis similique!Et facere dolor quo voluptas sunt ea
            deleniti rerum. Eos suscipit debitis non optio omnis sed illo
            delectus est vitae beatae et culpa architecto ut enim reiciendis.
            Qui placeat officia aut enim velit in doloribus praesentium quo quas
            itaque ut itaque consequatur. Sit sunt dolor quo magnam minima qui
            quasi quas non illum repellat ut totam dolorem.
          </p>
        </section>

        <section id="contato" className="p-4 m-3">
          <h2 className="info-Title">Contato</h2>
          <p className="info-paragrafo">
            Lorem ipsum dolor sit amet. Eum delectus culpa a distinctio corporis
            qui iste voluptatum non facere rerum sit quisquam nobis sit deserunt
            soluta eum molestias adipisci! Eos atque soluta non quis error sit
            sapiente repellat aut quasi maiores qui velit omnis vel delectus
            voluptatem sed debitis iste.
          </p>
        </section>

        <section id="politicaPrivacidade" className="p-4 m-3">
          <h2 className="info-Title">Política de privacidade</h2>
          <p className="info-paragrafo">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            perspiciatis, incidunt blanditiis libero id at ipsa vero nisi soluta
            ducimus tempora totam, ullam qui distinctio. Soluta dolores
            doloremque minima odit. Eum delectus culpa a distinctio corporis qui
            iste voluptatum non facere rerum sit quisquam nobis sit deserunt
            soluta eum molestias adipisci! Eos atque soluta non quis error sit
            sapiente repellat aut quasi maiores qui velit omnis vel delectus
            voluptatem sed debitis iste.
          </p>
        </section>

        <section id="termos" className="p-4 m-3">
          <h2 className="info-Title">Termos de uso</h2>
          <p className="info-paragrafo">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            perspiciatis, incidunt blanditiis libero id at ipsa vero nisi soluta
            ducimus tempora totam, ullam qui distinctio. Soluta dolores
            doloremque minima odit,incidunt blanditiis libero id at ipsa vero
            nisi soluta ducimus tempora totam, ullam qui distinctio. Soluta
            dolores doloremque minima odit. Eum delectus culpa a distinctio
            corporis qui iste voluptatum non facere rerum sit quisquam nobis sit
            deserunt soluta eum molestias adipisci! Eos atque soluta non quis
            error sit sapiente repellat aut quasi maiores qui velit omnis vel
            delectus voluptatem sed debitis iste.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MaisInformacoes;
