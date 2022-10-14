const express = require("express");
const server = express();
server.use(express.json());

const arrayPeople = [];
const newArray = [];
let sum = 0;

//cadastra as pessoas e as insere no array
server.post("/adicionar-pessoa", (req, res) => {
  const person = {
    nome: req.body.nome,
    idade: req.body.idade,
    sexo: req.body.sexo,
  };
  arrayPeople.push(person);

  return res.json(arrayPeople);
});

//retorna a quantia de homens no array
server.get("/qtd-homens", (req, res) => {
  let counter = 0;
  const findMen = arrayPeople.map((man) => man.sexo);

  for (let i = 0; i < findMen.length; i++) {
    if (findMen[i] === "masculino") {
      counter++;
    }
  }
  return res.json(`Há ${counter} homens na lista`);
});

//retorna a quantia de mulheres no array
server.get("/qtd-mulheres", (req, res) => {
  let counter = 0;
  const findWomen = arrayPeople.map((woman) => woman.sexo);

  for (let i = 0; i < findWomen.length; i++) {
    if (findWomen[i] === "feminino") {
      counter++;
    }
  }
  return res.json(`Há ${counter} mulheres na lista`);
});

server.get("/media-idade-homens", (req, res) => {
  for (let i = 0; i < arrayPeople.length; i++) {
    if (arrayPeople[i].sexo === "masculino") {
      sum += arrayPeople[i].idade;
      newArray.push(arrayPeople[i].idade);
    }
  }
  return res.json(
    `A média de idade dos homens da lista é: ${(sum / newArray.length).toFixed(
      0
    )} anos`
  );
});

server.get("/media-idade-mulheres", (req, res) => {
  for (let i = 0; i < arrayPeople.length; i++) {
    if (arrayPeople[i].sexo === "feminino") {
      sum += arrayPeople[i].idade;
      newArray.push(arrayPeople[i].idade);
    }
  }
  return res.json(
    `A média de idade das mulheres da lista é: ${(
      sum / newArray.length
    ).toFixed(0)} anos`
  );
});

server.listen(3000);
