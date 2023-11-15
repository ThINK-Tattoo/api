const db = require('../database/db');
const QRCode =  require ('qrcode');
const nodemailer = require ('nodemailer');
const PDFDocument = require ('pdfkit');


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
        subject: 'QRCode para sua consulta de tatuagem, favor não perder pois o mesmo é único',
        html: '<p> Escaneie o QRCode abaixo para confirmar sua consulta: </p><br>' +
                '<img src= "${qrCodeDataUrl}" alt= "QRCode">',
    };
    await transporter.sendMail(mailOptions);
}


module.exports = {
    async getAllAgendas(req, res){
        try{
            const agenda = await db('confirmaagenda').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens marcadas: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens marcadas"});
        }
    },

    async createAgenda(req, res){
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
            tipoTattoo,
            qrCode
        } = req.body;

        try{
            //Gerar código aleatório para QRCode
            const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

            // Gerar o QRCode com base no código aleatório
            const qrCodeDataUrl = await QRCode.toDataURL(codigoAleatorio);


            const [id] = await db('confirmaagenda').insert({
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
                tipoTattoo,
                qrCode: qrCodeDataUrl // Armazenando a String de dados do QRCode no banco de dados.
            });

            const cliente = await db('cliente').select('email').where({ id: idCliente}).first();
            
            if (cliente && cliente.email) {
                //Enviar email com o QRCode anexado
                await sendEmail(cliente.email, qrCodeDataUrl);
            }

            res.status(201).json({id, message: 'Tatuagem marcada com sucesso.'});

        }catch(err){
            console.error('Erro ao marcar tatuagem: ', err);
            res.status(500).json({message: 'Erro ao marcar tatuagem: '});
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
