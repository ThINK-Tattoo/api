const db = require ('../database/db.js');

module.exports={
    async getAllMovimentacaoHistorico(req, res){
        try{
            const historico = await db('movimentacaoestoque').select('*');
            res.status(200).json(historico);
        }

        catch (err){
            console.error('Erro ao buscar os itens no estoque',err);
            res.status(500).json({message: 'Erro ao buscar o histórico de movimentações'});
        }
    },

    async createMovimentacaoHistorico (req, res){
        const{
            idProduto,
            tipoMovimentacao,
            dataHora,
            quantidade
        } = req.body;

        try{
            const[id] = await db('movimentacaoestoque').insert({
                idProduto,
                tipoMovimentacao,
                dataHora,
                quantidade
            });

            res.status(201).json({id, message: 'Solicitação de movimentacoes do historico'});

        } catch(err){
            console.error('Erro ao solicitar as movimentacoes em historico');
            res.status(500).json({message: 'Erro ao solicitar as movimentacoes em historico'});
        }
    },

    async deleteMovimentacaoHistorico(req, res){
        const {id} = req.params;

        try{
            await db('movimentacaoestoque').where({id}).del();
            res.status(200).json({message: 'Solicitação de exclusão de movimentação do historico'})
        }

        catch(err){
            console.error('Erro ao excluir movimentacao do estoque',err);
            res.status(500).json({messgae: 'Erro ao excluir movimentacao do estoque'});
        }
    },

    async deleteTodasMovimentacoesEHistorico(req, res){
        try{
            await db ('movimentacaoestoque').del();
            res.status(200).json({message: 'Solicitação de exclusão de todas as movimentações do histórico'});
        }
        catch(err){
            console.error('Erro ao excluir toda a movimentacao do estoque',err);
            res.status(500).json({message: 'Erro ao excluir toda a movimentacao do estoque'});
        }

    }

}
