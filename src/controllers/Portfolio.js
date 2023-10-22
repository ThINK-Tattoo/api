const db = require('../database/db');
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
    async getAllPortfolio(req, res){
        try{
            const portfolio = await db('portfolio').select('*');
            res.status(200).json(portfolio);

        }catch(err){
            console.error('Erro ao encontrar imagens do portfólio: ', err);
            res.status(500).json({message: "Erro ao localizar imagens no portfólio:"});
        }
    },

    async createPortfolio(req, res) {
        const {
            idAdmin,
            nome,
            tamanho,
            local,
            tipo,
            cores,
            
        } = req.body;
        const { file } = req;

        try {
            const fileName = `admin_${Date.now()}.png`;
            base64_decode(file.buffer.toString('base64'), fileName);

            const [id] = await db('portfolio').insert({
                idAdmin,
                nome,
                tamanho,
                local,
                tipo,
                cores,
                imagem: fileName
            });
            
            console.log('Conteúdo de req.file:', req.file);
            res.status(200).json({ message: 'Imagem inserida com sucesso no portfólio' });
    
        } catch (err) {
            console.error('Erro ao adicionar imagem ao portfólio: ', err);
            res.status(500).json({ message: 'Erro ao adicionar imagem ao portfólio' });
        }
    },
    
    async updatePortfolio(req, res){
        const {id} = req.params;

        const{
            idAdmin,
            imagem,
            descricao
        } = req.body;

        try{
            await db('portfolio')
            .where({id})
            .update({
                idAdmin,
                imagem,
                descricao,
            });
            res.status(200).json({ message: 'Item do portfólio atualizado com sucesso.'});
        } catch (err) {
            console.error('Erro ao atualizar item do portfólio: ', err);
            res.status(500).json({ message: 'Erro ao atualizar item do portfólio:' });
        }
    },

    async deletePortfolio(req, res){
        const {id} = req.params;

        try{
            await db('portfolio')
            .where({id})
            .del();
            res.status(200).json({ message: 'Item do portfólio excluido com sucesso.'});
        } catch (err) {
            console.error('Erro ao excluir item do portfólio: ', err);
            res.status(500).json({ message: 'Erro ao excluir item do portfólio:' });
        }
    }
 
}