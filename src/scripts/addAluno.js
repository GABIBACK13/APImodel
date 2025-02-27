const { Aluno } = require("../models");

async function criarAluno() {
  try {
    const novoAluno = await Aluno.create({
      nome: "João da Silva",
      turma: "3A",
      email: "info@aluno.com",
      idade: 22,
      media: 7.5,
    });

    console.log("aluno criado:", novoAluno.toJSON());
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
  }
}

criarAluno();