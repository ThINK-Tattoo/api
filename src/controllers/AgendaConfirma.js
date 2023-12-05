const db = require('../database/db');
const PDFDocument = require ('pdfkit');
const QRCode =  require ('qrcode');
const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'think.studio.tattoo@gmail.com',
        pass: 'jsbgujwyvxfapzvq'
    }
})

async function sendEmail(destinatario, qrCodeDataUrl){
    
    const mailOptions = {
        from: 'think.studio.tattoo@gmail.com',
        to: destinatario,
        subject: 'QRCode para sua consulta de tatuagem',
        html: `
            <div style="background-color: black; padding: 8px 20px; text-align: center;">
                <h2 style="font-size: 24px; color: #fff; font-family: 'Baloo', sans-serif; font-weight: 700;">Th<span style="color: #EB1CE4; font-weigth: bold;">Ink </span></h2>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 16px;">Olá!</p>
                <p style="font-size: 16px;">Esse é seu <strong style="color: #EB1CE4;">QRCode</strong> não esqueça de guardá-lo pois ele é único!</p>
                <p>O <strong style="color: #EB1CE4;">ThINK</strong> agradece a sua preferência :)</p>
            </div>
        `,
        attachments: [
            {
                filename: 'qrcode.png',
                content: qrCodeDataUrl.split(';base64,').pop(),
                encoding: 'base64',
            },
        ],
    

    };


    await transporter.sendMail(mailOptions);
}

module.exports = {
    async getAllAgendas(req, res){
        try{
            const agenda = await db('confirmaAgenda').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens marcadas: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens marcadas"});
        }
    },

    async createAgenda(req, res) {
        const { idTatuagem } = req.params; // id da consulta
    
        const {
            idCliente,
            idAdmin,
            nomeCliente,
            tellCliente,
            tamanhoTattoo,
            estOrcamento,
            dataTattoo,
            hTattoo,
            hTerminoTattoo,
            observacoes,
            fotoReferencia,
            tipoTattoo,
            confirmaTattoo
        } = req.body;
    
        try {
            if (confirmaTattoo == 1) {
                 // Apenas atualizar na tabela 'agendaconsulta'
                 await db('agendaConsulta').where({ id: idTatuagem }).update({ status: "Cancelado" });
    
                 res.status(201).json({ message: 'Tatuagem cancelada com sucesso.' });
                
            } else {

                //Gerar código aleatório para QRCode
                const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

                // Gerar o QRCode com base no código aleatório
                const qrCodeDataUrl = await QRCode.toDataURL(codigoAleatorio);

                // Inserir na tabela 'confirmaagenda'
                const [id] = await db('confirmaAgenda').insert({
                    idCliente,
                    nomeCliente,
                    tellCliente,
                    tamanhoTattoo,
                    estOrcamento,
                    dataTattoo,
                    hTattoo,
                    hTerminoTattoo,
                    observacoes,
                    fotoReferencia,
                    status: "Agendado",
                    tipoTattoo,
                    idAdmin,
                    qrCode: codigoAleatorio
                });
    
                // Atualizar na tabela 'agendaconsulta'
                await db('agendaConsulta').where({ id: idTatuagem }).update({ status: "Agendado" });
                const cliente = await db('cliente').select('email').where({ id: idCliente}).first();
            
                if (cliente && cliente.email) {
                    //Enviar email com o QRCode anexado
                    await sendEmail(cliente.email, qrCodeDataUrl);
                }
    
                res.status(201).json({ id, message: 'Tatuagem marcada com sucesso.' });
            }
        } catch (err) {
            console.error('Erro ao processar agendamento: ', err);
            res.status(500).json({ message: 'Erro ao processar agendamento.' });
        }
    },
    

    async updateAgenda(req, res){
        const { id } = req.params;

        const {
            idCliente,
            idAdmin,
            nomeCliente,
            tellCliente,
            tamanhoTattoo,
            estOrcamento,
            dataTattoo,
            hTattoo,
            hTerminoTattoo,
            observacoes,
            fotoReferencia,
            status,
            tipoTattoo
        } = req.body;

        try{
            await db('confirmaagenda')
            .where({id})
            .update({
                idCliente,
                idAdmin,
                nomeCliente,
                tellCliente,
                tamanhoTattoo,
                estOrcamento,
                dataTattoo,
                hTattoo,
                hTerminoTattoo,
                observacoes,
                fotoReferencia,
                status,
                tipoTattoo
            });
            res.status(200).json({ message: 'Tatuagem marcada atualizada com sucesso.' });
            } catch (err) {
                console.error('Erro ao atualizar tatuagem marcada: ', err);
                res.status(500).json({ message: 'Erro ao atualizar tatuagem marcada.' });
            }
        },

        async deleteAgenda(req, res){
            const {id} = req.params;

            try{
                await db('confirmaagenda').where({id}).del();
                res.status(200).json({ message: 'Tatuagem marcada excluída com sucesso.' });
            } catch (err) {
                console.error('Erro ao excluir tatuagem marcada: ', err);
                res.status(500).json({ message: 'Erro ao excluir tatuagem marcada.' });
            }
        }
    }
