import { Resend } from 'resend'
import dotenv from 'dotenv';

const recuperarCuenta = async (data) => {
    const { nombre, email, token } = data;

    const resend = new Resend(process.env.EMAIL_CONEXION);

    try {
        const { data } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Recupera tu Cuenta",
            html: `
                <p>Hola ${nombre}, te hemos enviado este e-mail para que recuperes tu cuenta</p>
                <p>Sigue el siguiente enlace: <a href="${process.env.URL_FRONTEND}/olvide-password/${token}">Recuperar cuenta</a></p>
                <p>Si no has solicitado recuperar tu cuenta, ignora este mensaje.</p>
            `,
        })
        console.log(`Email enviado ${data.id}`);
    } catch (error) {
        console.log(error);
    }
}

export default recuperarCuenta;