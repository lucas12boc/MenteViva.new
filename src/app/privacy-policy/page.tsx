import { getDictionary, getLanguage } from "@/lib/i18n/i18n.server"
import Link from "next/link"

export default async function PrivacyPolicyPage() {
  const lang = getLanguage()
  const dictionary = await getDictionary(lang)

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-headline font-bold mb-6 text-foreground">Política de Privacidad de MenteViva</h1>
        <p className="text-muted-foreground mb-8">Última actualización: 24 de julio de 2024</p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground">
          <p>
            Bienvenido/a a MenteViva. Tu privacidad y la seguridad de tus datos son nuestra máxima prioridad. Esta Política de Privacidad explica cómo manejamos tu información personal.
          </p>

          <h2 className="font-headline">1. Información que Recopilamos</h2>
          <p>
            MenteViva está diseñada para ser un espacio seguro y privado. La información que proporcionas, incluyendo:
          </p>
          <ul>
            <li>Entradas del diario de estado de ánimo</li>
            <li>Respuestas terapéuticas de la IA</li>
            <li>Perfil emocional y metas de entrenamiento</li>
            <li>Gemas guardadas en el Santuario de Resiliencia</li>
          </ul>
           <p>
            Tus datos de cuenta (correo electrónico) se gestionan a través de Firebase Authentication para el inicio de sesión. La información de tus interacciones con la app (entradas de diario, perfil, etc.) <strong>se almacena de forma segura en una base de datos de Firestore vinculada exclusivamente a tu cuenta de usuario.</strong> Nadie más tiene acceso a esta información.
          </p>

          <h2 className="font-headline">2. Uso de la Información</h2>
          <p>
           La información que ingresas se utiliza únicamente para proporcionarte las funcionalidades de la aplicación en tiempo real y para que puedas acceder a tu historial.
          </p>

          <h2 className="font-headline">3. Servicios de Terceros</h2>
          <ul>
            <li>
              <strong>Firebase Authentication & Firestore:</strong> Utilizamos los servicios de Firebase para gestionar el inicio de sesión y almacenar de forma segura tus datos personales de la app.
            </li>
            <li>
              <strong>Google AI (Genkit):</strong> Tus entradas se envían de forma anónima a los modelos de IA de Google a través de Genkit para generar las respuestas terapéuticas. Estas solicitudes no están vinculadas a tu identidad personal.
            </li>
          </ul>

          <h2 className="font-headline">4. Seguridad de los Datos</h2>
          <p>
            Utilizamos las prácticas de seguridad estándar de Firebase para proteger tu información. El acceso a tus datos está protegido por tu autenticación.
          </p>

          <h2 className="font-headline">5. Privacidad de los Niños</h2>
          <p>
            MenteViva no está dirigida a personas menores de 13 años. No recopilamos conscientemente información de identificación personal de niños.
          </p>

          <h2 className="font-headline">6. Cambios en esta Política de Privacidad</h2>
          <p>
            Podemos actualizar nuestra Política de Privacidad de vez en quando. Te notificaremos de cualquier cambio publicando la nueva Política de Privacidad en esta página.
          </p>

          <h2 className="font-headline">7. Contáctanos</h2>
          <p>
            Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos en <a href="mailto:menteglobalempresarial@gmail.com">menteglobalempresarial@gmail.com</a>.
          </p>

          <div className="mt-12 text-center">
             <Link href="/" className="text-primary hover:underline">Volver a la página de inicio</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
