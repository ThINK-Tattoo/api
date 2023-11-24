const db = require('../database/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const moment = require('moment');
const crypto = require('crypto');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'think.studio.tattoo@gmail.com',
      pass: 'jsbgujwyvxfapzvq',
    },
  });

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
    async getAllAdmin(req, res){
        try{
            const admin = await db('admin').select('*');
            res.status(200).json(admin);

        }catch(err){
            console.error('Erro ao buscar administradores: ', err);
            res.status(500).json({message: "Erro ao buscar os administradores"});
        }
    },

    async createAdmin(req, res) {
        const { nome, email, file } = req.body;
        //const { file } = req;

        try {
            const senha = crypto.randomBytes(4).toString('hex');

            await transporter.sendMail({
                from: 'think.studio.tattoo@gmail.com',
                to: email,
                subject: 'Sua senha de login',
                text: `Você foi adicionado como admin dentro do sistema sua senha é: ${senha}. Faça a redefinição de senha se possível.`,
            });

            const hashedPassword = await bcrypt.hash(senha, 10);

            // Salvar a imagem no sistema de arquivos
            // const fileName = `admin_${Date.now()}.png`;
            // base64_decode(file.buffer.toString('base64'), fileName);

            // Salvar os dados no banco de dados
            const [id] = await db('admin').insert({
                nome,
                email,
                fotoPerfil: file,   /*: fileName*/ // Salvar o nome do arquivo no banco de dados
                senha: hashedPassword,
            });

            console.log('Conteúdo de req.file:', req.file);
            res.status(201).json({ id, message: 'Admin adicionado com sucesso.' });

        } catch (err) {
            console.error('Erro ao adicionar novo administrador', err);
            res.status(500).json({ message: 'Erro ao adicionar administrador.' });
        }
    },

    async updateAdmin(req, res){
        const { id } = req.params;

        const {
            nome,
            email,
            fotoPerfil,
            senha
        } = req.body;

        try{
            await db('admin')
            .where({id})
            .update({
                nome,
                email,
                fotoPerfil,
                senha
            });
            res.status(200).json({ message: 'Admin atualizado com sucesso.' });
            } catch (err) {
                console.error('Erro ao atualizar admin: ', err);
                res.status(500).json({ message: 'Erro ao atualizar o admin cadastrado.' }); 
            }
        }, 

        async deleteAdmin(req, res){
            const {id} = req.params;

            try{
                await db('admin').where({id}).del();
                res.status(200).json({ message: 'Admin excluído com sucesso.' });
            } catch (err) {
                console.error('Erro ao excluir admin: ', err);
                res.status(500).json({ message: 'Erro ao excluir admin.' });
            }
        },

        async closeAgenda(req, res){
            const statusAgenda = await db('statusAgenda').select('*');

            try{
                const dataFechamento = moment().format('YYYY-MM-DD'); // Data atual
                const hFechamento = moment().format('HH:mm:ss'); // Hora atual

                if(statusAgenda.length >= 1){
                    await db('statusAgenda').update({
                        statusAgenda: 'Fechado',
                        dataFechamento,
                        hFechamento
                    });
                    console.log('Data: ', dataFechamento, ' Hora: ', hFechamento);
                    res.status(200).json({ message: 'Agenda fechada com sucesso.' });
                }else{
                    const [id] = await db('statusAgenda').insert({
                        statusAgenda: 'Fechado',
                        dataFechamento,
                        hFechamento
                    });
                    console.log('Data: ', dataFechamento, ' Hora: ', hFechamento);
                    res.status(200).json({ message: 'Agenda fechada com sucesso.' });
        
                }
                
    
               
            }catch(err){
                console.error('Erro ao fechar agenda: ', err);
                res.status(500).json({ message: 'Erro ao fechar agenda.' });
            }
        },

        async openAgenda(req, res){
           
            try{
                await db('statusAgenda').where({statusAgenda: 'Fechado'}).update({
                    statusAgenda: 'Aberto',
                    dataFechamento: null,
                    hFechamento: null
                });
                res.status(200).json({ message: 'Agenda aberta com sucesso.' });
    
            }catch(err){
                console.error('Erro ao fechar agenda: ', err);
                res.status(500).json({ message: 'Erro ao abrir agenda.' });
            }
        }
 }

