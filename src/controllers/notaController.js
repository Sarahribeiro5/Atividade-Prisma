import notaModel from "../models/notaModel.js";

class notaController {
  getAll = async (req, res) => {
    try {
      const notas = await notaModel.getAll();
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar notas" });
    }
  };

  create = async (req, res) => {
    const { descricao } = req.body;
    // const descricao = req.body.descricao;
    try {
      if (!descricao) {
        return res.status(400).json({ erro: "Descrição é obrigatória" });
      }

      const novanota = await notaModel.create(descricao);
      res.status(201).json(novanota);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar nota" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { concluida, descricao } = req.body;

    try {
      const notaAtualizada = await notaModel.update(
        Number(id),
        concluida,
        descricao
      );

      if (!notaAtualizada) {
        return res.status(404).json({ erro: "nota não encontrada!" });
      }

      res.json(notaAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar nota!" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const sucesso = await notaModel.delete(Number(id));

      if (!sucesso) {
        return res.status(404).json({ erro: "nota não encontrada" });
      }

      res.status(200).send({ message: "nota deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir nota!" });
    }
  };
}
export default new notaController();
