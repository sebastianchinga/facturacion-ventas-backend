import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const confirmarCuenta = async (data) => {
    const { nombre, email, token } = data;

    const resend = new Resend(process.env.EMAIL_CONEXION);

    try {
        const { data } = await resend.emails.send({
            from: "No Reply <onboarding@resend.dev>",
            to: email,
            subject: "Confirma tu Cuenta",
            html: `
                <p>Hola ${nombre}, te hemos enviado este e-mail para que confirmes tu cuenta</p>
                <p>Sigue el siguiente enlace: <a href="${process.env.URL_FRONTEND}/confirmar-cuenta/${token}">Confirmar cuenta</a></p>
                <p>Si no te has registrado en nuestra plataforma, ignora este mensaje</p>
            `,
        })
        console.log(`Email enviado ${data.id}`);
    } catch (error) {
        console.log(error);
    }
}

export default confirmarCuenta