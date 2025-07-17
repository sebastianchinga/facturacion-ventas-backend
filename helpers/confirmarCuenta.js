import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const confirmarCuenta = async (data) => {
    const { nombre, email, token } = data;

    const resend = new Resend(process.env.EMAIL_CONEXION);

    try {
        const { data } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Confirma tu Cuenta",
            html: "<strong>it works!</strong>",
        })
        console.log(`Email enviado ${data.id}`);
    } catch (error) {
        console.log(error);
    }
}

export default confirmarCuenta