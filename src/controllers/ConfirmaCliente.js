const db = require('../database/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require ('bcrypt');
const saltRounds = 10;
/* Salt é uma sequencia aleatória que é gerada aleatoriamente e única para cada senha. 

Salt Rounds é quantas vezes, em um Hash, o Salt será rodado. Ou seja, ele vai gerar um Salt elevado a 10.
Criptografar, pegar o valor criptografado e criptografar novamente, 10 vezes.*/

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
            const results = await db('confirmaCliente')
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
                const hashedPass  = await bcrypt.hash(senha, saltRounds);  
                /* Hash: faz o hashing, trasnforma a entrada em uma sequência de caracteres. Por ser uma operação
                unidirecional, ela é irreversível.  */

                /**
                 *  Esse HashedPass faz a criptografia da senha.
                 * Na importação temos o Bcrypt que uma Lib que faz a criptografia das senhas,
                 * ela faz a utilização de SaltRounds.
                 */
                const [id] = await db('confirmaCliente').insert({
                    nome,
                    telefone,
                    email,
                    idade,
                    senha : hashedPass
                });
                
                const token = crypto.randomBytes(3).toString('hex');
                
                await db('token').insert({
                    idCliente: id, // Use o id obtido na inserção anterior
                    token
                });
                
                await transporter.sendMail({
                    from: 'think.studio.tattoo@gmail.com',
                    to: email,
                    subject: 'Criação de Conta',
                    html: `<div style="background-color: black; padding: 8px 20px; text-align: center;">
                <h2 style="font-size: 24px; color: #fff; font-family: 'Baloo', sans-serif; font-weight: 700;">Th<span style="color: #EB1CE4; font-weigth: bold;">Ink </span></h2>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Olá!</p>
                <p style="font-size: 16px;">Esse é seu <strong style="color: #EB1CE4;">Código</strong> de acesso: ${token}!</p>
                <p>O <strong style="color: #EB1CE4;">ThINK</strong> agradece o seu cadastro :)</p>
            </div>
        `,
                });

                res.status(200).json({message: 'Código de confirmação de conta enviado'})



            }
            
        }catch(err){
            console.error('erro ao cadastrar o cliente', err);
            res.status(500).json({message: 'Não foi possível cadastrar o cliente: '});
        }
    },

    async verifyTokenConfirmaCliente(req, res) {
        const { token } = req.body;
        try {
            const tokenData = await db('token').where({ token }).first();
    
            if (!tokenData) {
                res.status(200).json({ message: "Token inválido" });
            } else {
                const idClienteToken = tokenData.idCliente;
    
                const {
                    nome,
                    telefone,
                    email,
                    idade,
                    senha
                } = await db('confirmaCliente').where({ id: idClienteToken }).first();
    
                const [id] = await db('cliente').insert({
                    nome,
                    telefone,
                    email,
                    idade,
                    senha
                });
    
                await db('token').where({ token }).del();
                await db('confirmaCliente').where({ id: idClienteToken }).del();
    
                res.status(200).json({ message: "Token válido, redirecionando para redefinir senha" });
            }
        } catch (err) {
            console.error("Erro ao verificar token ", err);
            res.status(500).json({ message: "Algo deu errado ao verificar o token" });
        }
    },
    
    

    // async verifyTokenConfirmaCliente(req, res){
    //     const { token } = req.body;
    //     try{
    //         const result = await db('token').where({token}).select('*');

    //         if(result.length < 1){
    //             res.status(200).json({ message: "Token inválido" });
    //         }
    //         else{
    //             const idClienteToken = await db('token').where({token}).select('idCliente');
    //             const{
    //                 nome,
    //                 telefone,
    //                 email,
    //                 idade,
    //                 senha
    //             } = await db ('confirmaCliente').where({id:idClienteToken}).select('*');
    //             const[id] = await db('cliente').insert({
    //                 nome,
    //                 telefone,
    //                 email,
    //                 idade,
    //                 senha
    //             });
    //             await db('token').where({token}).del();
    //             await db('confirmaCliente').where({id:idClienteToken}).del();
    //             res.status(200).json({ message: "Token válido, redirecionando para redefinir senha"});
            
    //         }

    //     }catch(err){
    //         console.error("Erro ao verificar token ", err);
    //         res.status(500).json({message: "Algo deu errado ao verificar o token"});
    //     }
    // },
};