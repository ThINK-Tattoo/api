const express = require('../database/db');

module.exports = {
    async getAllAdmin(req, res){
        try{
            const admin = await db('admin').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar administradores: ', err);
            res.status(500).json({message: "Erro ao buscar os administradores"});
        }
    },

    async createAdmin(req, res){
        const {
            idAdmin,
            nome,
            email,
            telefone,
            senha,
        } = req.body;

        try{ 
            const [id] = await db('admin').insert({
                idAdmin,
                nome,
                email,
                telefone,
                senha, 
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
            idAdmin,
            nome,
            email,
            telefone,
            senha,
        } = req.body;

        try{
            await db('admin')
            .where({id})
            .update({
                idAdmin,
                nome,
                email,
                telefone,
                senha,
            });
            res.status(200).json({ message: 'Admin cadastrado atualizado com sucesso.' });
            } catch (err) {
                console.error('Erro ao atualizar admin cadastrado: ', err);
                res.status(500).json({ message: 'Erro ao atualizar o admin cadastrado.' }); 
            }
        }, 

        async deleteAdmin(re, res){
            const {id} = req.params;

            try{
                await db('admin').where({id}).del();
                res.status(200).json({ message: 'Admin cadastrado excluído com sucesso.' });
            } catch (err) {
                console.error('Erro ao excluir admin cadastrado: ', err);
                res.status(500).json({ message: 'Erro ao excluir admin cadastrado.' });
            }
            }
        }

