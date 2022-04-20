"use strict";

const limparFormulario = (endereco) => {
  document.getElementById("endereco").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

const preencherFormulario = (endereco) => {
  limparFormulario();
  document.getElementById("endereco").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);

const pesquisarCep = async () => {
  limparFormulario();
  const cep = document.getElementById("cep").value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      limparFormulario();
      document.getElementById("endereco").value = "*CEP não encontrado";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    limparFormulario();
    document.getElementById("cep").value = "*CEP incorreto!";
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisarCep);
