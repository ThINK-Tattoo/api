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
    
    async getAllclientes(req, res){
        try{
            const clientes = await db('cliente').select('*');
            res.status(200).json(clientes);

        }catch(err){
            console.error('clientes não encontrados', err);
            res.status(500).json({message: "clientes não encontrados"});
        }
    },

    async createclientes(req, res){
        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            const results = await db('cliente')
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
                const[id] = await db('cliente').insert({
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

    async updateclientes(req,res){
        const { id } = req.params;

        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            await db('cliente')
            .where({id})
            .update({
                nome,
                telefone,
                email,
                idade,
                senha
            });
            res.status(200).json({ message: 'Dados do cliente atualizados com sucesso.' });
        } catch (err) {
            console.error('Houve um problema para atualizar seus dados: ', err);
            res.status(500).json({ message: 'Houve um problema para atualizar seus dados: '});
        }
    },

    async deleteclientes(req, res){
        const {id} = req.params;

        try{
            await db('cliente').where({id}).del();
            res.status(200).json({ message: 'Dados do cliente deletados com sucesso'});
        } catch (err) {
            console.error('Houve um erro ao deletar os dados do cliente.', err);
            res.status(500).json({ message: 'Houve um erro ao deletar os dados do cliente.' });
        }
    },

    async requestResetPass(req, res){
        const { email } = req.body;
        const result = await db('cliente').where({email}).select('*');

        try{
            if(result.length < 1){
                console.log('Email não cadastrado');
                res.status(400).json({message: 'Conta não encontrada, verifique o e-mail digitado ou crie uma conta'});
            }else{
                const token = crypto.randomBytes(4).toString('hex');
                await db('token').insert({token});

                await transporter.sendMail({
                    from: 'think.studio.tattoo@gmail.com', 
                    to: email, 
                    subject: 'Redefinição de Senha',
                    text: `Seu código de redefinição de senha é: ${token}`,
                  });

                  res.status(200).json({ message: 'Código de redefinição de senha enviado com sucesso.' });
            }

        }catch(err){
            console.error('Erro ao gerar token e enviar email: ', err);
            res.status(500).json({message: 'Houve um erro ao gerar o token e enviar o e-mail'})
        }       
    },

    async verifyToken(req, res){
        const { token } = req.body;
        const validToken = false;
        try{
            const result = await db('token').where({token}).select('*');

            if(result.length < 1){
                res.status(200).json({ message: "Token inválido", validToken: false });
                console.err('Token válido: ' + validToken);
            }
            else{
                res.status(200).json({ message: "Token válido, redirecionando para redefinir senha", validToken: true });
                validToken = true;
                console.log('Token válido: ' + validToken);
            }

        }catch(err){
            console.err("Erro ao verificar token ", err);
            res.status(500).json({message: "Algo deu errado ao verificar o token"});
        }
    },

    async resetPassword(req, res){
        const { email } = req.params;
        const { senha, confirmSenha } = req.body;

        try{
            if(senha != confirmSenha){
                res.status(400).json({message: "Senhas diferentes, as duas senhas precisam ser iguais"});
            } else{
                await db('cliente').where({email}).update({senha});
                res.status(200).json({message: "Senha redefinida com sucesso"});
            }
        }catch(err){
            console.log("Erro ao redefinir a senha do usuário", err);
            res.status(500).json({message: "Algo deu errado ao redefinir a senha"});
        }
    }
};