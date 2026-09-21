import type { Post } from '../types';

const post: Post = {
    slug: 'posesion-efectiva-herencia',
    title: 'Posesión efectiva: qué es, cómo se tramita y por qué no conviene postergarla',
    metaTitle: 'Posesión efectiva en Chile: qué es y por qué hacerla',
    description: '¿Murió un familiar y no saben por dónde partir? La posesión efectiva es el primer paso para heredar en Chile. Cómo pedirla y qué pasa si no la haces.',
    excerpt: 'La casa sigue a nombre del padre, la cuenta del banco está congelada y nadie sabe por dónde empezar. Casi siempre el primer paso es el mismo.',
    date: '2026-09-17',
    service: 'civil',
    blocks: [
        {
            type: 'summary',
            text: 'La posesión efectiva es la resolución que reconoce quiénes son los herederos de una persona fallecida. Si no hubo testamento, se pide al Registro Civil según la Ley 19.903; si lo hubo, a un juez de letras. Sin ella inscrita, los herederos no pueden disponer de los bienes de la herencia (artículo 25 de la Ley 16.271) ni vender los inmuebles (artículo 688 del Código Civil).',
        },
        {
            type: 'p',
            text: 'Falleció el padre hace un año. La casa sigue a su nombre, en el banco dicen que sin «las inscripciones de la herencia» no pueden entregar el dinero de la cuenta, uno de los hermanos ya encontró un comprador para el terreno y nadie hizo el trámite legal.',
        },
        {
            type: 'p',
            text: 'Es un escenario común. El trámite que falta se llama posesión efectiva. Con ella, los herederos pueden empezar a ordenar los bienes, pagar lo que corresponda y, más adelante, repartir.',
        },
        {
            type: 'p',
            text: 'Lo que cambia en su tramitación es si hubo testamento o no, qué bienes quedaron y si hay deudas, lo cual define dónde se hace el trámite y qué cuidados tomar. En Puerto Varas, y también en Puerto Montt, muchas herencias incluyen parcelas o terrenos, y ahí un error en el inventario se nota recién cuando el Conservador revisa los datos.',
        },
        { type: 'h2', text: 'Qué es la posesión efectiva' },
        {
            type: 'p',
            text: 'Es la resolución que reconoce la calidad de herederos a quienes aparecen con derecho a la herencia del fallecido, al que la ley llama causante. Resolución que decreta el Director Regional del Registro Civil o un juez de letras, según el caso.',
        },
        {
            type: 'p',
            text: 'No es lo mismo que la posesión legal. El artículo 722 del Código Civil dispone que la posesión de la herencia se adquiere desde el momento en que es deferida, aunque el heredero lo ignore. O sea, desde la muerte los herederos ya tienen esa posesión por el solo ministerio de la ley. El problema es que no consta en ningún registro. La posesión efectiva sí queda inscrita, y con ella bancos, notarios, conservadores y el Servicio de Impuestos Internos pueden saber quiénes son los herederos.',
        },
        { type: 'h2', text: 'Registro Civil o tribunal: depende de si hubo testamento' },
        {
            type: 'quote',
            text: 'Las posesiones efectivas de herencias, originadas en sucesiones intestadas abiertas en Chile, serán tramitadas ante el Servicio de Registro Civil e Identificación, de conformidad a lo dispuesto en la presente ley. Las demás serán conocidas por el tribunal competente de acuerdo a lo dispuesto en el Código de Procedimiento Civil.',
            cite: 'Artículo 1 de la Ley 19.903',
            citeUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=215613',
        },
        {
            type: 'p',
            text: 'Esto significa que, si la persona murió sin testamento y con último domicilio en Chile, el trámite es administrativo y se hace en el Registro Civil. Todos los demás casos, partiendo por los que tienen testamento, van a un juez de letras con el procedimiento de los artículos 877 y siguientes del Código de Procedimiento Civil.',
        },
        {
            type: 'p',
            text: 'Por eso lo primero es averiguar si hay testamento. Los testamentos otorgados o protocolizados ante notario deben figurar en el Registro Nacional de Testamentos, que lleva el Registro Civil (artículo 439 del Código Orgánico de Tribunales).',
        },
        { type: 'h2', text: 'Quiénes heredan si no hay testamento' },
        {
            type: 'p',
            text: 'La posesión efectiva no decide quién hereda. Eso lo fija el Código Civil, por órdenes que se excluyen entre sí:',
        },
        {
            type: 'list',
            items: [
                'Primero, los hijos junto con el cónyuge sobreviviente. Por regla general el cónyuge recibe el doble de lo que corresponde a cada hijo, y si hay un solo hijo, lo mismo que él. Nunca baja de la cuarta parte de la herencia o de la mitad legitimaria (artículo 988).',
                'A falta de hijos, el cónyuge y los ascendientes de grado más próximo: dos tercios para el cónyuge y un tercio para los ascendientes (artículo 989).',
                'Si no hay descendientes, ascendientes ni cónyuge, heredan los hermanos. (artículo 990).',
            ],
        },
        {
            type: 'p',
            text: 'Después vienen los demás familaires colaterales y, al final, el Fisco. En familias con segundas uniones o hijos de distintas relaciones, este punto es el que más dudas genera, y conviene aclararlo antes de llenar el formulario.',
        },
        { type: 'h2', text: 'Qué pide la ley para solicitarla en el Registro Civil' },
        {
            type: 'p',
            text: 'Puede pedirla cualquier persona que invoque la calidad de heredero (artículo 2 de la Ley 19.903). No hace falta que la firmen todos. Se presenta en el formulario del Registro Civil, que debe contener:',
        },
        {
            type: 'list',
            items: [
                'Los datos del causante: nombre, RUN, profesión u oficio, estado civil, lugar y fecha de muerte y último domicilio.',
                'Todos los herederos, con su nombre, RUN, domicilio y la calidad en que heredan.',
                'El inventario valorado de los bienes, con los muebles, inmuebles, créditos y deudas de que haya comprobante. Cada inmueble se identifica con fojas, número, año y Conservador de Bienes Raíces.',
                'La declaración de si el solicitante acepta con beneficio de inventario, que debe hacerse expresamente en el formulario.',
            ],
        },
        {
            type: 'p',
            text: 'Además, el artículo 60 de la Ley 16.271 exige indicar en la solicitud si las asignaciones están afectas o exentas del impuesto a las herencias. Si todas están exentas, esa constancia basta para tener por cumplida la obligación de declarar el impuesto.',
        },
        {
            type: 'p',
            text: 'El artículo 6 de la Ley 19.903 ordena otorgar la posesión efectiva a todos los que tengan la calidad de herederos según los registros del Registro Civil, aunque no aparezcan en la solicitud. Dejar a un hermano fuera del formulario no lo saca de la herencia. La misma norma permite concederla a quienes acrediten ser herederos aunque no estén inscritos en Chile.',
        },
        { type: 'h2', text: 'Publicación, inscripción y correcciones' },
        {
            type: 'p',
            text: 'El Registro Civil publica un extracto de la resolución en un diario regional de la región donde se inició el trámite. Hecha la publicación, el Director Regional ordena inscribirla en el Registro Nacional de Posesiones Efectivas, y esa inscripción se acredita con un certificado del Registro Civil.',
        },
        { type: 'h2', text: 'Por qué importa: sin ella no se puede disponer de la herencia' },
        {
            type: 'p',
            text: 'La regla general está en el artículo 25 de la Ley 16.271: el heredero no puede disponer de los bienes de la herencia sin que antes se haya inscrito la resolución de posesión efectiva. Para los inmuebles, el Código Civil agrega más exigencias.',
        },
        {
            type: 'quote',
            text: 'En el momento de deferirse la herencia, la posesión efectiva de ella se confiere por el ministerio de la ley al heredero; pero esta posesión legal no habilita al heredero para disponer en manera alguna de un inmueble, mientras no preceda: 1. La inscripción del decreto judicial o la resolución administrativa que otorgue la posesión efectiva: el primero ante el conservador de bienes raíces de la comuna o agrupación de comunas en que haya sido pronunciado, junto con el correspondiente testamento, y la segunda en el Registro Nacional de Posesiones Efectivas.',
            cite: 'Artículo 688 del Código Civil',
            citeUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=172986&idParte=8717776',
        },
        {
            type: 'p',
            text: 'El mismo artículo exige otras dos inscripciones. En la práctica, para vender una propiedad heredada el camino es este:',
        },
        {
            type: 'list',
            items: [
                'Inscribir la resolución de posesión efectiva, que en el caso del Registro Civil queda en el Registro Nacional de Posesiones Efectivas.',
                'Hacer la inscripción especial de herencia en el Conservador de Bienes Raíces donde está el inmueble. Con ella, los herederos pueden venderlo de consuno, es decir, todos juntos.',
                'Si se hace la partición, inscribir la adjudicación. Sin esa inscripción, el heredero al que le tocó la propiedad no puede venderla por sí solo.',
            ],
        },
        {
            type: 'p',
            text: 'Saltarse un paso sale caro. Si los herederos firman la compraventa con la resolución en la mano pero sin la inscripción especial de herencia, el Conservador no inscribe el inmueble a nombre del comprador.',
        },
        { type: 'h2', text: 'Beneficio de inventario: para no pagar las deudas del fallecido con tu plata' },
        {
            type: 'p',
            text: 'Con la herencia también llegan las deudas. El beneficio de inventario es un tope: según el artículo 1247 del Código Civil, los herederos que aceptan su cuota con beneficio de inventario responden de las obligaciones de la herencia solo hasta el valor total de los bienes que recibieron. Si el causante debía más de lo que dejó, la diferencia no sale del bolsillo del heredero.',
        },
        {
            type: 'p',
            text: 'En el trámite del Registro Civil, el inventario del formulario vale como inventario solemne, pero para quedar protegido el solicitante debe declarar en el mismo formulario que acepta con beneficio de inventario (artículo 4 de la Ley 19.903).',
        },
        { type: 'h2', text: 'Si te dejaron fuera de la herencia' },
        {
            type: 'p',
            text: 'Cuando otra persona ocupa la herencia como heredera y tú tienes mejor derecho, la herramienta es la acción de petición de herencia del artículo 1264 del Código Civil. Con ella puedes pedir que se te adjudique la herencia y se te restituyan los bienes. Si esos bienes ya pasaron a manos de terceros, el artículo 1268 permite reivindicarlos, salvo que esos terceros ya los hayan ganado por prescripción.',
        },
        {
            type: 'p',
            text: 'Aquí sí hay plazo. El artículo 1269 dispone que esta acción expira en diez años. Pero el heredero aparente que obtuvo la posesión efectiva a su favor puede oponer una prescripción de cinco años.',
        },
        { type: 'h2', text: 'Antes de empezar' },
        {
            type: 'p',
            text: 'Algunas posesiones efectivas son simples. Otras se complican por un testamento que nadie conocía, un hijo no reconocido, deudas grandes o una propiedad con problemas en sus títulos. Si falleció un familiar y tienen bienes en Puerto Varas, Puerto Montt o cualquier comuna de la Región de Los Lagos, podemos revisar el caso, preparar el inventario y ordenar los pasos siguientes para que la herencia no quede detenida.',
        },
    ],
    faq: [
        {
            question: '¿Hay plazo para pedir la posesión efectiva?',
            answer: 'No hay un plazo legal para pedirla, pero el impuesto a las herencias debe declararse y pagarse dentro de dos años desde que se defiere la asignación, normalmente la fecha del fallecimiento (artículo 50 de la Ley 16.271). Pasado ese plazo se deben intereses penales.',
        },
        {
            question: '¿Se puede vender una casa heredada sin posesión efectiva?',
            answer: 'No. El artículo 688 del Código Civil impide a los herederos disponer de un inmueble mientras no se inscriba la posesión efectiva y se practique la inscripción especial de herencia en el Conservador de Bienes Raíces. Con esas dos inscripciones pueden venderlo todos juntos.',
        },
        {
            question: '¿Puedo sacar dinero del banco sin posesión efectiva?',
            answer: 'Sí, hasta cinco unidades tributarias anuales de una cuenta de ahorro. El artículo 26 de la Ley 16.271 permite ese retiro a los herederos probando solo el estado civil. Sobre ese monto se necesita la posesión efectiva.',
        },
        {
            question: '¿Qué pasa si un heredero no aparece en la solicitud?',
            answer: 'Igual queda incluido. El artículo 6 de la Ley 19.903 ordena otorgar la posesión efectiva a todos los que tengan la calidad de herederos según los registros del Registro Civil, aunque no hayan sido nombrados en la solicitud.',
        },
    ],
};

export default post;
