import type { Post } from '../types';

const post: Post = {
    slug: 'juicio-ejecutivo-cobro-de-deudas',
    title: 'Juicio ejecutivo: cómo cobrar una factura, un pagaré o un cheque que no pagaron a tu empresa',
    metaTitle: 'Juicio ejecutivo: cobrar facturas, pagarés y cheques',
    description: '¿Un cliente no te paga una factura, un pagaré o un cheque? El juicio ejecutivo permite embargar sus bienes. Qué necesitas y cuánto plazo tienes.',
    excerpt: 'La factura venció, el cheque volvió protestado o el pagaré no se pagó. Si tienes el documento correcto, puedes pedir que se embarguen los bienes del deudor sin tener que probar la deuda desde cero.',
    date: '2026-10-01',
    service: 'civil',
    blocks: [
        {
            type: 'summary',
            text: 'Si la deuda consta en un pagaré, un cheque protestado, una factura no reclamada, una escritura pública o una sentencia, puedes cobrarla en un juicio ejecutivo. El tribunal ordena cobrarle formalmente al deudor y, si no paga, embargar sus bienes (arts. 434 y 443 del Código de Procedimiento Civil). La deuda debe estar vencida, tener un monto claro y no estar prescrita.',
        },
        {
            type: 'p',
            text: 'Entregaste la mercadería o prestaste el servicio, emitiste la factura y el cliente no paga. O prestaste dinero contra un pagaré que ya venció. O te pagaron con un cheque que el banco devolvió protestado. Pasaron las semanas y el deudor dejó de contestar.',
        },
        {
            type: 'p',
            text: 'Ahí aparece la duda: demandar y probar la deuda desde cero, o ir directo a los bienes del deudor. Depende del documento que tengas. Si es el correcto, el juicio empieza con una orden de pago y embargo, y el deudor tiene pocas defensas posibles.',
        },
        {
            type: 'p',
            text: 'Antes de presentar una demanda ejecutiva revisamos tres cosas con nuestros clientes de Puerto Varas, Puerto Montt y el resto de la Región de Los Lagos: si el documento sirve, si la deuda todavía se puede cobrar y si el deudor tiene bienes.',
        },
        { type: 'h2', text: '¿Sirve el documento que tengo para cobrar?' },
        {
            type: 'p',
            text: 'Sirve si la ley lo considera título ejecutivo, es decir, un documento que por sí solo prueba la deuda. Los que más usan las empresas son estos (art. 434 del Código de Procedimiento Civil):',
        },
        {
            type: 'list',
            items: [
                'La factura.',
                'El pagaré y la letra de cambio.',
                'El cheque protestado.',
                'La copia autorizada de una escritura pública, como un reconocimiento de deuda otorgado ante notario.',
                'Las sentencias firmes y actas de avenimiento (acuerdo) aprobadas ante el tribunal.',
            ],
        },
        {
            type: 'p',
            text: 'Si la deuda consta en un correo, en un contrato firmado sin notario o en una cotización aceptada, todavía no tienes un título ejecutivo. Puedes llegar a tenerlo con una gestión previa ante el tribunal, que vemos más abajo.',
        },
        {
            type: 'p',
            text: 'En el pagaré y el cheque (art. 434 N° 4):',
        },
        {
            type: 'quote',
            text: 'Tendrá mérito ejecutivo, sin necesidad de reconocimiento previo, la letra de cambio, pagaré o cheque, respecto del obligado cuya firma aparezca autorizada por un notario (...)',
            cite: 'Artículo 434 N° 4 del Código de Procedimiento Civil',
            citeUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=22740',
        },
        { type: 'h2', text: '¿La deuda todavía se puede cobrar?' },
        {
            type: 'p',
            text: 'Tener el documento no basta. La deuda tiene que cumplir tres condiciones, y el tribunal revisa la última por su cuenta.',
        },
        {
            type: 'list',
            items: [
                'Que esté vencida: la fecha de pago ya pasó (art. 437).',
                'Que el monto sea claro o líquido: tiene que salir del mismo documento, a lo más con operaciones aritméticas simples hechas con los datos que ese documento trae (art. 438). Si para saber cuánto se debe hay que discutir o probar algo, la vía de cobro no es la ejecutiva.',
                'Que no esté prescrita: si el plazo ya pasó, el tribunal rechaza la demanda ejecutiva aunque el deudor no lo diga (art. 442).',
            ],
        },
        { type: 'h2', text: '¿Cuánto plazo tengo para cobrar?' },
        {
            type: 'p',
            text: 'Para los títulos de crédito que más usan las empresas, en general un año. Para los demás, tres.',
        },
        {
            type: 'list',
            items: [
                'Pagaré y letra de cambio: un año desde el vencimiento (arts. 98 y 107 de la Ley N° 18.092).',
                'Cheque: un año desde la fecha del protesto (art. 34 del DFL N° 707).',
                'Factura: un año desde su vencimiento (art. 10 de la Ley N° 19.983).',
                'Escritura pública, sentencia y otros títulos: tres años. Después la deuda se puede cobrar dos años más, pero en un juicio ordinario, que ya no empieza con el embargo (art. 2515 del Código Civil).',
            ],
        },
        {
            type: 'p',
            text: 'No conviene esperar al final del plazo. Notificar al deudor toma tiempo, y es necesario tenerlo notificado antes de que el plazo venza.',
        },
        { type: 'h2', text: 'Si te pagaron con un cheque sin fondos' },
        {
            type: 'p',
            text: 'El cheque se cobra en un juicio ejecutivo como los demás documentos, pero además presiona al deudor por otro lado. Una vez notificado el protesto, quien giró el cheque tiene tres días para consignar el monto, los intereses y las costas. Si el cheque se protestó por falta de fondos o por cuenta cerrada y no paga en ese plazo, arriesga sanciones penales (art. 22 del DFL N° 707).',
        },
        { type: 'h2', text: 'Si te deben una factura' },
        {
            type: 'p',
            text: 'Una factura se puede cobrar directamente en un juicio ejecutivo si cumple estas condiciones (art. 5° de la Ley N° 19.983):',
        },
        {
            type: 'list',
            items: [
                'Que el cliente no la haya reclamado. Tiene ocho días desde que la recibe para hacerlo (art. 3°).',
                'Que conste que recibió la mercadería o el servicio: en la factura o en la guía de despacho, con el lugar, la fecha, el nombre y la firma de quien recibió. Si no hay recibo, sirve también que haya vencido el plazo legal sin que el cliente la reclamara.',
                'Que la deuda esté vencida y no prescrita.',
                'Que el deudor, notificado por el tribunal, no alegue en ese acto o dentro de tres días que la factura, la guía o el recibo son falsos.',
            ],
        },
        {
            type: 'p',
            text: 'Negar la factura para ganar tiempo es un riesgo para el deudor. Si la impugna de falsa de mala fe y pierde por completo, debe pagar la deuda más una suma igual como indemnización, con el interés máximo convencional (art. 5° de la Ley N° 19.983).',
        },
        { type: 'h2', text: 'Si la deuda no está en ninguno de esos documentos' },
        {
            type: 'p',
            text: 'Si la deuda consta por escrito, aunque sea en un documento simple, puedes pedir al tribunal que cite al deudor para que reconozca su firma o confiese la deuda (art. 435 del Código de Procedimiento Civil). La deuda tiene que estar vencida, tener un monto claro y no estar prescrita. La gestión sirve sobre todo por lo que pasa si el deudor no se presenta:',
        },
        {
            type: 'quote',
            text: 'Si el citado no comparece a la audiencia sin razón que lo justifique, o sólo da respuestas evasivas, se dará por reconocida la firma o por confesada la deuda.',
            cite: 'Artículo 435 del Código de Procedimiento Civil',
            citeUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=22740',
        },
        {
            type: 'p',
            text: 'Con eso ya tienes un título ejecutivo y puedes demandar. Y si el deudor reconoce su firma pero niega que debe el dinero, la vía ejecutiva queda igualmente preparada (art. 436).',
        },
        {
            type: 'p',
            text: 'Si no hay ningún antecedente escrito de la deuda, hay que demandar en un juicio ordinario y probar ahí que la deuda existe.',
        },
        { type: 'h2', text: '¿Qué pasa después de presentar la demanda?' },
        {
            type: 'p',
            text: 'El tribunal ordena cobrarle formalmente al deudor.'
        },
        {
            type: 'p',
            text: 'El deudor tiene ocho días hábiles para oponerse si fue requerido dentro del territorio del tribunal (art. 459), y solo puede defenderse con las excepciones que la ley enumera (art. 464). Por eso el juicio ejecutivo avanza más rápido que uno ordinario: la discusión está acotada desde el principio.',
        },
        { type: 'h2', text: 'Si el deudor está vendiendo sus bienes' },
        {
            type: 'p',
            text: 'Un juicio ganado no te sirve si después no hay bienes que embargar. Antes de demandar conviene averiguar qué tiene el deudor a su nombre: inmuebles, vehículos, cuentas o participaciones en sociedades.',
        },
        {
            type: 'p',
            text: 'Si hay señales de que se está deshaciendo de ellos, puedes pedir al tribunal, incluso antes de demandar, que prohíba vender o gravar bienes determinados o que retenga dineros (arts. 279 y 290 del Código de Procedimiento Civil). Estas son las medidas prejudiciales precautorias.',
        },
        { type: 'h2', text: 'Puntos clave sobre el juicio ejecutivo' },
        {
            type: 'list',
            items: [
                'Revisa primero el documento: sin título ejecutivo no hay embargo inmediato, pero un escrito simple puede convertirse en uno.',
                'Pagarés, cheques y facturas se cobran dentro de un año desde el vencimiento o el protesto. No dejes la demanda para los últimos meses.',
                'Pide que la firma del deudor en un pagaré se autorice ante notario: así se cobra sin gestión previa.',
                'En las facturas, guarda la guía de despacho o el recibo firmado con nombre, fecha y lugar.',
                'Averigua los bienes del deudor antes de demandar y, si los está vendiendo, solicita medidas precautorias.',
            ],
        },
        {
            type: 'p',
            text: 'Si tu empresa tiene facturas, pagarés o cheques impagos, revisamos el documento y los plazos antes de presentar nada, y tramitamos el cobro ante los juzgados de Puerto Montt y Puerto Varas y en el resto de la Región de Los Lagos.',
        },
    ],
    faq: [
        {
            question: '¿Puedo cobrar una factura impaga por juicio ejecutivo?',
            answer: 'Sí, si el cliente no la reclamó dentro de ocho días corridos, consta que recibió la mercadería o el servicio, la deuda está vencida y no prescrita, y el deudor, notificado por el tribunal, no alega dentro de tres días que es falsa (arts. 3° y 5° de la Ley N° 19.983).',
        },
        {
            question: '¿Cuánto tiempo tengo para cobrar un cheque protestado?',
            answer: 'Un año desde la fecha del protesto. Pasado ese plazo, el cheque ya no sirve para iniciar un juicio ejecutivo (art. 34 del DFL N° 707).',
        },
        {
            question: '¿Cuánto tiempo tengo para cobrar un pagaré vencido?',
            answer: 'Un año desde el vencimiento. Pasado ese plazo, prescriben las acciones del pagaré contra quienes estaban obligados a pagarlo (arts. 98 y 107 de la Ley N° 18.092).',
        },
        {
            question: '¿Puedo cobrar si no tengo nada firmado?',
            answer: 'Depende de si hay algún antecedente escrito de la deuda. Si lo hay, puedes citar al deudor a reconocerla, y si no se presenta se tiene por confesada (art. 435 del Código de Procedimiento Civil). Si correos o mensajes sirven como antecedente se revisa caso a caso. Sin nada escrito, hay que demandar en un juicio ordinario y probar ahí la deuda.',
        },
        {
            question: '¿Cuánto tiempo tiene el deudor para defenderse en un juicio ejecutivo?',
            answer: 'Ocho días hábiles, si fue requerido de pago dentro del territorio del tribunal. Además, solo puede oponer las excepciones que la ley enumera, lo que acota la discusión (arts. 459 y 464 del Código de Procedimiento Civil).',
        },
    ],
};

export default post;
