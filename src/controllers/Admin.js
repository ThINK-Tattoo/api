const db = require('../database/db');

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

    async createAdmin(req, res){
        const {
            nome,
            email,
            telefone,
            senha
        } = req.body;

        try{ 
            const [id] = await db('admin').insert({
                nome,
                email,
                telefone,
                senha
            });

            res.status(201).json({id, message: 'Admin adicionado com sucesso.'});

        }catch(err){
            console.error('Erro ao adicionar novo administrador', err);
            res.status(500).json({message: 'Erro ao adicionar administrador: '});
        }
    },

    async updateAdmin(req, res){
        const { id } = req.params;

        const {
            nome,
            email,
            telefone,
            senha
        } = req.body;

        try{
            await db('admin')
            .where({id})
            .update({
                nome,
                email,
                telefone,
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
            }
        }

