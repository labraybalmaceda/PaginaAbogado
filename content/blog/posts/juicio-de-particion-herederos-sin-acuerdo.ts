import type { Post } from '../types';

const post: Post = {
    slug: 'juicio-de-particion-herederos-sin-acuerdo',
    title: 'Herederos que no se ponen de acuerdo: el juicio de partición',
    metaTitle: 'Juicio de partición de herencia en Chile | Labra & Balmaceda',
    description:
        'Qué hacer cuando los herederos no logran repartir los bienes: posesión efectiva, acción de partición del artículo 1317, juez partidor y venta del inmueble en subasta.',
    excerpt:
        'La casa quedó para los cuatro hermanos. Uno vive ahí, dos quieren vender y el cuarto no contesta el teléfono. La ley tiene una salida para eso.',
    date: '2026-07-23',
    service: 'civil',
    blocks: [
        {
            type: 'p',
            text: 'Murió el papá y quedó la casa. Uno de los hermanos se quedó viviendo ahí, dos quieren vender porque necesitan el dinero, y el cuarto opina distinto cada vez que se toca el tema. Pasan tres años, la casa se deteriora, las contribuciones las paga siempre el mismo, y nadie puede hacer nada porque cualquier decisión requiere la firma de todos.',
        },
        {
            type: 'p',
            text: 'Esa situación tiene nombre, se llama comunidad hereditaria, y la ley la mira con desconfianza. Justamente por eso entrega una salida que no depende de que todos estén de acuerdo. En el estudio asesoramos a herederos de Puerto Varas, Puerto Montt y toda la Región de Los Lagos para desbloquear estas herencias y repartir los bienes.',
        },
        { type: 'h2', text: 'Primero: la posesión efectiva' },
        {
            type: 'p',
            text: 'Antes de repartir nada hay que tramitar la posesión efectiva. Si la sucesión es intestada, es decir sin testamento, y se abrió en Chile, el trámite es administrativo y se hace ante el Registro Civil. Si hay testamento, o la sucesión se abrió en el extranjero, se tramita ante un juez de letras.',
        },
        {
            type: 'p',
            text: 'No es un trámite opcional. El artículo 688 del Código Civil impide a los herederos disponer de los inmuebles mientras no esté inscrita la resolución y practicadas las inscripciones especiales de herencia.',
        },
        { type: 'h2', text: 'Nadie está obligado a quedarse en la comunidad' },
        {
            type: 'quote',
            text: 'Ninguno de los coasignatarios de una cosa universal o singular será obligado a permanecer en la indivisión; la partición del objeto asignado podrá siempre pedirse con tal que los coasignatarios no hayan estipulado lo contrario.',
            cite: 'Artículo 1317 del Código Civil',
        },
        {
            type: 'p',
            text: 'La acción de partición se puede ejercer en cualquier momento y el derecho a pedirla no se puede renunciar. Cualquiera de los herederos, aunque sea el único que quiera salir, puede provocarla.',
        },
        { type: 'h2', text: 'El juez partidor' },
        {
            type: 'p',
            text: 'La partición es materia de arbitraje: Si los herederos no logran repartir de común acuerdo por escritura pública, la partición la hace un árbitro.',
        },
        {
            type: 'p',
            text: 'Ese árbitro se llama partidor y tiene que ser abogado habilitado. Puede haberlo designado el causante en el testamento o por instrumento público. Si no lo hizo, lo designan los herederos de común acuerdo, y si tampoco hay acuerdo en eso, lo nombra la justicia ordinaria.',
        },
        { type: 'h2', text: 'La cesión de derechos hereditarios' },
        {
            type: 'p',
            text: 'El hermano que quiere quedarse con la casa puede hacerlo pagando a los demás lo que les corresponde.',
        },
        {
            type: 'p',
            text: 'Además, un heredero ceder su cuota en la herencia a un tercero, sin necesidad del consentimiento de los demás. Quien compra pasa a ocupar su lugar y puede pedir la partición e intervenir en ella.',
        },
        { type: 'h2', text: 'El heredero que vive en la casa y no paga nada' },
        {
            type: 'p',
            text: 'La ley establece que basta la reclamación de cualquier interesado para que cese el goce gratuito de un bien común. A partir de ahí el ocupante debe pagar una renta a la comunidad o desocupar el inmueble. Además, el artículo 1338 del Código Civil da a todos los herederos derecho a los frutos de la masa a prorrata de sus cuotas.',
        },
        { type: 'h2', text: 'Qué revisar antes de empezar' },
        {
            type: 'p',
            text: 'Casi siempre conviene intentar un acuerdo antes, porque una partición por escritura pública es más rápida y económica que un arbitraje. Pero se negocia mucho mejor cuando la otra parte sabe que existe la acción de partición y que no puede bloquearla. Si heredaste un bien en Puerto Varas, Puerto Montt o cualquier comuna de la Región de Los Lagos y no logran ponerse de acuerdo, conviene revisar tu caso antes de que el tiempo lo haga más caro.',
        },
    ],
    faq: [
        {
            question: '¿Puedo obligar a mis hermanos a vender la casa heredada?',
            answer:
                'No se los puede obligar a vender a un tercero, pero sí a salir de la comunidad.',
        },
        {
            question: '¿Hay plazo para hacer la partición?',
            answer:
                'La acción de partición es imprescriptible, así que se puede pedir en cualquier momento. Sin embargo, las demás acciones hereditarias si tienen plazos.',
        },
        {
            question: '¿Cuánto cuesta un juicio de partición?',
            answer:
                'Los componentes principales son los honorarios del juez partidor, que fija en el laudo y paga la masa hereditaria a prorrata, las tasaciones de los bienes y los honorarios del abogado de cada heredero. Por eso, cuando el acuerdo es posible, la partición por escritura pública casi siempre conviene más.',
        },
    ],
};

export default post;
