import prisma from "../../prisma/client.js";

class notaModel {
  getAll = async () => {
    return await prisma.nota.findMany();
  };

  create = async (descricao) => {
    return await prisma.nota.create({
      data: {
        descricao,
      },
    });
  };

  update = async (id, concluida, descricao) => {
    try {
      const nota = await prisma.nota.update({
        where: { id },
        data: {
          concluida: concluida !== undefined ? concluida : true,
          descricao,
        },
      });

      return nota;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const notaDeletada = await prisma.nota.delete({
        where: { id },
      });

      return notaDeletada;
    } catch (error) {
      console.log("Erro ao deletar a nota!", error);
      throw error;
    }
  };
}
export default new notaModel();
