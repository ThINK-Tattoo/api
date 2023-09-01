const db = require ('../database/db');

module.exports = {
    async getAllFlashTattoo(req, res){
        try{
            const flashTattoo = await db('flashTattoo').select('*');
            res.status(200).json(flashTattoo);
        }catch(err){
            console.error('Erro ao encontrar as Flash Tattoo', err);
            res.status(500).json({message:'Erro ao localizar as flash tattoos'});
        }
    },
    async createFlashTattoo(req, res){
        const {
        idAdmin,
        imagem,
        tamanho,
        descricao,
        valor,
        estilo,
        } = req.body;

        try{
            const[id] = await db('flashTattoo').insert({
            idAdmin,
            imagem,
            tamanho,
            descricao,
            valor,
            estilo
            });
            res.status(200).json({message: 'Informações inseridas com sucesso'});
        }catch(err){
            console.error('Erro ao adicionar as informações na flash tattoo', err);
            res.status(500).json({message: 'Erro ao adicionar informações da flash tattoo '});
        }
    },
    async updateFlashTattoo(req, res){
        const {id} = req.params;
        
        const{
            idAdmin,
            imagem,
            tamanho,
            descricao,
            valor,
            estilo
        } = req.body;

        try{
            await db('flashTattoo')
            .where({id})
            .update({
                idAdmin,
                imagem,
                tamanho,
                descricao,
                valor,
                estilo,
            });
            res.status(200).json({message: 'Informações da Flash Tattoo atualizadas com sucesso'});
        }catch(err){
            console.error('Erro ao atualizar as informações da Flash Tattoo', err);
            res.status(500).json({message: 'Erro ao atualizar as informações da Flash Tattoo'});
        }
    },
    async deleteFlashTattoo(req,res){
        const {id} = req.params;
    
        try{
            await db('flashTattoo')
            .where({id})
            .del();
            res.status(200).json({message: 'Informação da flash tattoo deletada com sucesso'});
        }catch(err){
            console.error('Erro ao excluir informação da flash tattoo');
            res.status(500).json({message: 'Erro ao excluir informação da flash tattoo'});
        }       
    }
}