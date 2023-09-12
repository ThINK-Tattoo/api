const db = require('../database/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'think.studio.tattoo@gmail.com',
      pass: 'jsbgujwyvxfapzvq',
    },
  });

module.exports = {
    

    async createConfirmaClientes(req, res){
        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            const results = await db('confiraCliente')
            .where({email})
            .select('*');

            if(results.length > 0){
                console.error('erro ao cadastrar o cliente: cliente já cadastrado');
                res.status(400).json({ message: 'Esse e-mail já possui um cadastro, faça login' });
            }
            else if(idade < 18){
                console.error('erro ao cadastrar o cliente: cliente muito novo');
                res.status(400).json({ message: 'O cliente precisa ter mais de 18 para poder usar nosso sistema' });
            }
            else{
                //AQUI A GNETE VAI FAZER A  PARADA DO TOKEN, EBA
                const[id] = await db('confirmaCliente').insert({
                    nome,
                    telefone,
                    email,
                    idade,
                    senha
                });
    
                res.status(201).json({id, message: 'cliente cadastrado.'});
            }
            
        }catch(err){
            console.error('erro ao cadastrar o cliente', err);
            res.status(500).json({message: 'Não foi possível cadastrar o cliente: '});
        }
    },

    

    async deleteConfirmaClientes(req, res){
        const {id} = req.params;

        try{
            await db('connfirmaCliente').where({id}).del();
            res.status(200).json({ message: 'Dados do cliente deletados com sucesso'});
        } catch (err) {
            console.error('Houve um erro ao deletar os dados do cliente.', err);
            res.status(500).json({ message: 'Houve um erro ao deletar os dados do cliente.' });
        }
    },

    async verifyToken(req, res){
        const { token } = req.body;
        const validToken = false;
        try{
            const result = await db('token').where({token}).select('*');

            if(result.length < 1){
                console.log('Token válido: ' + validToken);
                res.status(200).json({ message: "Token inválido", validToken: false });
            }
            else{
                await db('token').where({token}).del();
                validToken = true;
                console.log('Token válido: ' + validToken);
                res.status(200).json({ message: "Token válido, redirecionando para redefinir senha", validToken: true });
            }

        }catch(err){
            console.error("Erro ao verificar token ", err);
            res.status(500).json({message: "Algo deu errado ao verificar o token"});
        }
    },
};