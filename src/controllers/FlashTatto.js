const db = require ('../database/db');
const fs = require('fs');

function base64_decode(base64str, fileName) {
    const bitmap = Buffer.from(base64str, 'base64');
    const directory = 'src/temp/';

    // Certificar-se de que o diretório existe
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(`${directory}${fileName}`, bitmap, 'binary', function (err) {
        if (err) {
            console.log('Conversão com erro');
        }
    });
}
  
  // Convertendo arquivo em binário
  function base64_encode(fileName) {
    const bitmap = fs.readFileSync(`src/temp/${fileName}`);
    return Buffer.from(bitmap).toString('base64');
  }
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
    async createFlashTattoo(req, res) {
        const {
            idAdmin,
            nome,
            tamanho,
            local,
            tipo,
            cores,
            valor,
            
        } = req.body;
        const { file } = req;
    
        try {
            const fileName = `admin_${Date.now()}.png`;
            base64_decode(file.buffer.toString('base64'), fileName);

            const [id] = await db('flashTattoo').insert({
                idAdmin,
                nome,
                tamanho,
                local,
                tipo,
                cores,
                valor,
               imagem: fileName
            });
            console.log('Conteúdo de req.file:', req.file);
            res.status(200).json({ message: 'Informações inseridas com sucesso' });
    
        } catch (err) {
            console.error('Erro ao adicionar as informações na flash tattoo: ', err);
            res.status(500).json({ message: 'Erro ao adicionar informações da flash tattoo' });
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