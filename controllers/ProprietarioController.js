const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async listarProprietarios(req, res) {
    try {
      const proprietarios = await prisma.proprietarios.findMany();
      res.status(200).json(proprietarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os proprietários' });
    }
  },

  async buscaProprietario(req, res) {
    try {
      const { id } = req.params;
      const proprietario = await prisma.proprietarios.findUnique({
        where: { id: Number(id) },
      });
      if (!proprietario) {
        return res.status(404).json({ error: 'Proprietário não encontrado' });
      }
      res.status(200).json(proprietario);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erro de acesso aos dados do proprietário' });
    }
  },

  async criarProprietarios(req, res) {
    try {
      const { nome, email, endereco } = req.body;

      const novoProprietario = await prisma.proprietarios.create({
        data: { nome, email, endereco },
      });

      res.status(201).json(novoProprietario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o proprietário' });
    }
  },

  async atualizarProprietario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, endereco } = req.body;
      await prisma.proprietarios.update({
        where: { id: Number(id) },
        data: { nome, email, endereco },
      });
      res.status(200).json({ message: 'Atualização realizada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o proprietário' });
    }
  },

  async deletarProprietario(req, res) {
    try {
      const { id } = req.params;
      await prisma.proprietarios.delete({
        where: { id: Number(id) },
      });
      res.status(204).json({ message: 'Proprietário removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover o proprietário' });
    }
  },

  async buscaNome(req, res) {
    try {
      const { nome } = req.params;

      const proprietarios = await prisma.proprietarios.findMany({
        where: {
          nome: {
            contains: nome,
          },
        },
      });

      if (!proprietarios || proprietarios.length === 0) {
        return res
          .status(404)
          .json({ error: 'Nenhum proprietário encontrado' });
      }

      res.status(200).json(proprietarios);
    } catch (error) {
      console.error('Erro durante a busca de nome:', error);
      res
        .status(500)
        .json({ error: 'Erro de acesso aos dados dos proprietários' });
    }
  },

  async maiorQuantidadeProdutos(req, res) {
    try {
      const proprietario = await prisma.proprietarios.findMany({
        include: {
          produtos: true,
        },
      });

      if (proprietario.length === 0) {
        return res
          .status(404)
          .json({ error: 'Nenhum proprietário encontrado' });
      }

      // Calcula o proprietário com a maior quantidade total de produtos
      const maior = proprietario.reduce((atual, proximo) => {
        const totalAtual = atual.produtos.reduce(
          (sum, p) => sum + p.quantidade,
          0
        );
        const totalProximo = proximo.produtos.reduce(
          (sum, p) => sum + p.quantidade,
          0
        );
        return totalProximo > totalAtual ? proximo : atual;
      });

      res.status(200).json(maior);
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao buscar o proprietário com maior quantidade de produtos',
      });
    }
  },
};
