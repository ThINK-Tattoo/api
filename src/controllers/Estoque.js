const db =  require('../database/db.js');

module.exports={
    async getAllEstoque(req, res) {
        try {
            const estoque = await db('produtoestoque')
                .select('produtoestoque.*', 'movimentacaoestoque.dataHora')
                .leftJoin('movimentacaoestoque', 'produtoestoque.id', 'movimentacaoestoque.idProduto');
    
            // Remover a informação de hora da dataHora, dataValidadeItem e dataCompraItem
            const estoqueFormatado = estoque.map(item => {
                const dataValidadeFormatada = item.dataValidadeItem
                    ? new Date(item.dataValidadeItem).toISOString().split('T')[0]
                    : null;
    
                const dataCompraFormatada = item.dataCompraItem
                    ? new Date(item.dataCompraItem).toISOString().split('T')[0]
                    : null;
    
                return {
                    ...item,
                    dataHora: item.dataHora ? new Date(item.dataHora).toISOString().split('T')[0] : null,
                    dataValidadeItem: dataValidadeFormatada,
                    dataCompraItem: dataCompraFormatada,
                };
            });
    
            res.status(200).json(estoqueFormatado);
        } catch (err) {
            console.error('Erro ao buscar os itens no estoque', err);
            res.status(500).json({ message: "Erro ao buscar os itens no estoque" });
        }
    },
    
    
    
    async createItemEstoque(req, res){
        const {
            nome,
            grupoItem,
            quantidade,
            dataCompra,
            dataValidade,
        } = req.body;
    
        try {
            // Inserção na tabela produtoestoque
            const [idProduto] = await db('produtoestoque').insert({
                nomeItem: nome,
                descricaoItem: grupoItem,
                quantidadeItem: quantidade,
                dataCompraItem: dataCompra,
                dataValidadeItem: dataValidade,
            });
    
            // Obtendo a data e hora atual
            const dataHora = new Date().toISOString();
    
            // Inserção na tabela movimentacaoestoque
            const [idMovimentacao] = await db('movimentacaoestoque').insert({
                idProduto,
                tipoMovimentacao: 'Entrada',
                dataHora,
                quantidade,
            });
    
            res.status(201).json({ idProduto, idMovimentacao, message: 'Solicitação de item do estoque' });
        } catch (err) {
            console.error('Erro ao solicitar os itens do estoque', err);
            res.status(500).json({ message: 'Erro ao solicitar Itens do Estoque' });
        }
    },

    async updateItemEstoque(req, res) {
        const { id } = req.params;

        const{
            nomeItem,
            descricaoItem,
            dataValidadeItem,
            dataCompraItem,
            quantidadeItem
        } =req.body;

        try{
            await db ('produtoestoque').where({id}).update({
                nomeItem,
                descricaoItem,
                dataValidadeItem,
                dataCompraItem,
                quantidadeItem
            });

            res.status(200).json({message:'Item do estoque atualizado!'})
        }

        catch (err) {
            console.error('Erro ao atualizar o item do estoque', err);
            res.status(500).json({message: 'Erro ao atualizar item do estoque'});
        }
    },

    async deleteItemEstoque(req, res){
        const {id} = req.params;

        try{
            await db('produtoestoque').where({id}).del();
            res.status(200).json({message: 'Solicitação de exclusão de item feita com sucesso'})
        }

        catch (err) {
            console.error('Erro ao excluir item do estoque', err);
            res.status(500).json({message: 'Erro ao excluir item do estoque'});
        }

    }

    
}