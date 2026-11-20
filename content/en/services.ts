import type { EnServiceKey } from '../../components/i18n';

// Versión en inglés de 4 páginas de servicio (decisión de Renato, 19-11-2026).
// Es una traducción FIEL de la página en español vigente: no agrega normas, plazos,
// cifras ni credenciales. Los nombres chilenos se dejan en español, con la traducción
// entre paréntesis la primera vez. Si cambia la página en español, hay que cambiar
// también esta. Enlaces en el texto: [texto](url).

export interface EnSection {
    heading: string;
    body: string;
}

export interface EnFaq {
    question: string;
    answer: string;
}

export interface EnServicePageData {
    key: EnServiceKey;
    path: string;
    /** Página equivalente en español. */
    esPath: string;
    seoTitle: string;
    seoDescription: string;
    h1Before: string;
    h1Gold: string;
    h1After: string;
    serviceName: string;
    serviceDescription: string;
    areaServed: { '@type': string; name: string }[];
    breadcrumbName: string;
    /** Nombre de seguimiento del botón de WhatsApp/consulta de la página. */
    contactSource: string;
    intro: string[];
    sectionsTitle: string;
    sections: EnSection[];
    extraTitle?: string;
    extra?: EnSection[];
    faqs?: EnFaq[];
}

const LEY_20720 = 'https://www.bcn.cl/leychile/navegar?idNorma=1058072';
const LEY_20416 = 'https://www.bcn.cl/leychile/navegar?idNorma=1010668';
const CODIGO_CIVIL = 'https://www.bcn.cl/leychile/navegar?idNorma=172986';
const LGUC = 'https://www.bcn.cl/leychile/navegar?idNorma=13560';

const LOS_LAGOS = [
    { '@type': 'City', name: 'Puerto Varas' },
    { '@type': 'City', name: 'Puerto Montt' },
    { '@type': 'City', name: 'Llanquihue' },
    { '@type': 'AdministrativeArea', name: 'Región de Los Lagos' },
];

export const EN_SERVICES: Record<EnServiceKey, EnServicePageData> = {
    corporate: {
        key: 'corporate',
        path: '/en/corporate-law',
        esPath: '/abogado-corporativo-puerto-montt',
        seoTitle: 'Corporate Lawyers in Puerto Varas, Chile | Labra & Balmaceda',
        seoDescription: 'Corporate law attorneys in Puerto Varas and Puerto Montt, Chile: incorporation of companies, shareholder agreements, contracts and disputes between partners.',
        h1Before: '',
        h1Gold: 'Corporate Law',
        h1After: ' Attorneys in Puerto Varas and Puerto Montt',
        serviceName: 'Corporate Law',
        serviceDescription: 'Corporate law attorneys in Puerto Varas and Puerto Montt, Chile: incorporation of companies, shareholder agreements, commercial contracts and purchase and sale of companies.',
        areaServed: LOS_LAGOS,
        breadcrumbName: 'Corporate Law',
        contactSource: 'Landing Corporativo EN',
        intro: [
            'An inadequate corporate structure generates significant costs at later stages. The legal form chosen to incorporate a company, what the bylaws say and what was left unwritten in the partners’ agreement determine what happens when an investor comes in, when a partner wants to leave or when the business comes to a standstill. We advise companies and entrepreneurs in Puerto Varas, Puerto Montt and the rest of the Los Lagos Region from incorporation to sale.',
            'For companies that need a lawyer on an ongoing basis, and not just for a one-off matter, we offer [monthly legal counsel for companies](/en/monthly-legal-counsel).',
        ],
        sectionsTitle: 'Matters we cover',
        sections: [
            {
                heading: 'Incorporation and amendment of companies.',
                body: 'Choosing between a sociedad por acciones (simplified joint-stock company), a sociedad de responsabilidad limitada (limited liability company), a sociedad anónima cerrada (closely held corporation) or an empresa individual (sole proprietorship company) is not a formality: it defines who is in charge, how capital comes in and goes out, and how far each partner is liable. We incorporate companies under the general regime, by public deed, or under the simplified regime of Ley N° 20.659. We also draft capital increases, transformations, mergers and dissolutions, and cure formal defects under Ley N° 19.499.',
            },
            {
                heading: 'Shareholder agreements and disputes between partners.',
                body: 'The agreement is there for the day the partners stop agreeing. We draft right of first refusal, drag-along and tag-along, lock-up and exit clauses. When a dispute arises between the partners, we act in the arbitration that the law requires for disputes between shareholders, the company and its managers, and we assess judicial dissolution when the company has come to a standstill.',
            },
            {
                heading: 'Commercial contracts.',
                body: 'Services, distribution, suppliers, confidentiality, leases of commercial premises, terms and conditions. We draft and review the contract before it is signed, paying attention to what is almost never negotiated and always disputed: deadlines, grounds for termination, penalties, guarantees and the competent court.',
            },
            {
                heading: 'Purchase and sale of companies and due diligence.',
                body: 'Before buying a company, the buyer needs to know what is being bought: pending lawsuits, labor and social security debts, contracts with change-of-control clauses, assets subject to prohibitions. We carry out the prior legal review and draft the share purchase agreement or the agreement for the sale of partnership interests, with the seller’s representations and warranties.',
            },
        ],
        faqs: [
            {
                question: 'How far is a partner liable for the company’s debts?',
                answer: 'Up to the amount of their contribution. For the sociedad por acciones this is set out in article 429 of the Código de Comercio (Commercial Code), and the same applies to the limited liability company. The exception is when the partner or the legal representative signed a personal guarantee or surety, or when the company’s business was managed with fraud or fault. Before signing any document on behalf of the company, it is advisable to check what personal risk is being assumed.',
            },
            {
                question: 'Can I sue my partner in the civil court?',
                answer: 'As a general rule, no. In the sociedad por acciones, article 441 of the Código de Comercio requires that disputes between shareholders, between them and the company, or with its managers or liquidators, be resolved by arbitration.',
            },
            {
                question: 'Do I need a lawyer to incorporate a company?',
                answer: 'No, the law does not require one. The form of the simplified regime of Ley N° 20.659 is signed by the founder, without the involvement of a lawyer. Someone incorporating alone, with a simple line of business and no partners, probably does not need advice. If there are two or more partners, contributions of different kinds, or the expectation that an investor will come in, advice is advisable, in order to set out in writing the management, the sale of shares and the exit of a partner before signing.',
            },
        ],
    },

    counsel: {
        key: 'counsel',
        path: '/en/monthly-legal-counsel',
        esPath: '/asesoria-legal-empresas-puerto-montt',
        seoTitle: 'Monthly Legal Counsel for Companies in Chile | Labra & Balmaceda',
        seoDescription: 'Outside lawyer for companies and SMEs, billed by the hour with a monthly cap: contracts, labor, tax risks and collections. Puerto Montt, Puerto Varas and all of Chile.',
        h1Before: '',
        h1Gold: 'Ongoing Legal Counsel',
        h1After: ' for Companies in Puerto Montt and Puerto Varas',
        serviceName: 'Ongoing legal counsel for companies',
        serviceDescription: 'Outside lawyer for companies, SMEs and individuals with businesses under a monthly agreement: ongoing advice, contracts, negotiations, labor and tax risks, corporate housekeeping, collection of receivables and lawsuits. Fees by hours worked, with a monthly cap and a detailed statement every month.',
        areaServed: [
            { '@type': 'City', name: 'Puerto Montt' },
            { '@type': 'City', name: 'Puerto Varas' },
            { '@type': 'AdministrativeArea', name: 'Región de Los Lagos' },
            { '@type': 'Country', name: 'Chile' },
        ],
        breadcrumbName: 'Legal counsel for companies',
        contactSource: 'Landing Asesoría Mensual EN',
        intro: [
            'Ongoing legal counsel gives the company an outside lawyer who is part of its operations: one who knows the business, its contracts and its corporate structure, and who supports management decisions before they turn into a risk or a lawsuit.',
            'We advise companies and their partners in Puerto Montt, Puerto Varas and the Los Lagos Region on contracting with customers and suppliers, relations with their employees, inspections by the authorities and the disputes that arise in the course of their business. The agreement covers all of the company’s legal work: the day-to-day work and also the lawsuits and matters that come up.',
        ],
        sectionsTitle: 'What the monthly counsel includes',
        sections: [
            {
                heading: 'Day-to-day legal questions.',
                body: 'Questions are answered by the same lawyers who already know the company, its contracts and its history. There is no need to book a new consultation or to explain everything from scratch each time.',
            },
            {
                heading: 'Contracts and documents.',
                body: 'Contracts with customers and suppliers, service agreements, leases of commercial premises, confidentiality agreements, terms and conditions, powers of attorney and formal letters. We draft or review them before signing, paying attention to deadlines, penalties, guarantees and grounds for termination.',
            },
            {
                heading: 'Negotiations and agreements.',
                body: 'When the company negotiates with a customer, a supplier or a partner, we review the other party’s proposal, prepare the response and put in writing what was agreed, including payment agreements and settlements.',
            },
            {
                heading: 'Labor risk prevention.',
                body: 'Employment contracts and their annexes, internal regulations, warning letters, dismissals and settlement agreements (finiquitos).',
            },
            {
                heading: 'Tax risks.',
                body: 'We review the legal consequences of decisions with tax effects, such as partners’ withdrawals, contracts between related companies or the structure of the company, as well as notices from the Servicio de Impuestos Internos.',
            },
            {
                heading: 'Corporate housekeeping.',
                body: 'Amendments to bylaws, admission and exit of partners, powers of attorney and minutes of shareholders’ and board meetings. For the incorporation of companies and shareholder agreements, see [Corporate Law](/en/corporate-law).',
            },
            {
                heading: 'Collection of company receivables.',
                body: 'Collection letters and negotiation with customers who do not pay invoices, promissory notes or other debts, before going to court. If they still do not pay, we collect in court through a juicio ejecutivo (enforcement proceeding).',
            },
            {
                heading: 'Lawsuits and inspections, on time.',
                body: 'When a lawsuit, a court notice or a summons from the Inspección del Trabajo (Labor Inspectorate) or the Servicio de Impuestos Internos arrives, we review it as soon as it arrives, so that deadlines do not run without a response.',
            },
        ],
    },

    litigation: {
        key: 'litigation',
        path: '/en/litigation',
        esPath: '/abogado-civil-puerto-montt',
        seoTitle: 'Civil and Commercial Litigation in Puerto Varas | Labra & Balmaceda',
        seoDescription: 'Civil and commercial litigation lawyers in Puerto Varas and Puerto Montt, Chile: inheritances, probate, partition proceedings, precario actions and damages claims.',
        h1Before: '',
        h1Gold: 'Civil and Commercial Litigation',
        h1After: ' Attorneys in Puerto Varas and Puerto Montt',
        serviceName: 'Civil and Commercial Litigation',
        serviceDescription: 'Civil and commercial litigation lawyers in Puerto Varas and Puerto Montt, Chile.',
        areaServed: LOS_LAGOS,
        breadcrumbName: 'Civil and Commercial Litigation',
        contactSource: 'Landing Civil EN',
        intro: [
            'We represent companies and individuals in civil and commercial litigation: debt collection and enforcement proceedings, contractual and non-contractual liability, damages claims, inheritances and partitions, and the recovery of properties occupied without title. We act for both plaintiffs and defendants.',
            'Every case starts with an assessment of whether litigation makes sense: the available evidence, how long the process may take and whether there are assets that would allow the judgment to be enforced. A favourable judgment that cannot be collected does not solve the client’s problem.',
        ],
        sectionsTitle: 'Matters we cover',
        sections: [
            {
                heading: 'Enforcement proceedings (cobro ejecutivo).',
                body: 'When someone owes money and the claim is recorded in an enforceable instrument (título ejecutivo), the law allows it to be collected without going through ordinary proceedings. The enforcement procedure applies to promissory notes, unpaid invoices and final judgments. We handle the collection from the lawsuit to the attachment and auction of assets if the debtor does not pay voluntarily.',
            },
            {
                heading: 'Inheritances and posesiones efectivas.',
                body: 'The posesión efectiva (grant of probate) is the procedure that allows the heirs to prove their status as such and to dispose of the deceased’s assets. We handle it before the Registro Civil (Civil Registry) when there is no will, and before the courts when there is one. We also advise on the partition of estates when the heirs cannot reach an agreement.',
            },
            {
                heading: 'Recovery actions (acciones reivindicatorias) and precario.',
                body: 'When someone occupies real estate without a contract and without the owner’s permission, the acción de precario allows the owner to recover it.',
            },
            {
                heading: 'Damages claims.',
                body: 'When a breach of contract or a wrongful act causes damage, the law allows its compensation to be claimed. We assess with the client whether the case justifies litigation, considering the amount of the damage, the available evidence and the time the process takes, before recommending legal action.',
            },
            {
                heading: 'Other civil matters.',
                body: 'We also handle name changes before the civil courts, declarations of legal incapacity (interdicción) and other matters that require judicial intervention.',
            },
        ],
        faqs: [
            {
                question: 'Is it advisable to get legal advice before signing a contract?',
                answer: 'Yes. We review and draft contracts so that they say what the parties really need. That includes setting out clearly how the contract can be terminated, incorporating the essential clauses and making sure that the contract stays within what the law permits. A well-drafted contract prevents most problems, which is why it is always better to get advice before signing.',
            },
            {
                question: 'Can I sue if there is no written contract?',
                answer: 'Yes. The lack of a written contract does not prevent a lawsuit, but it does affect the evidence available. In that case, the existence of the obligation has to be proved by other means: emails, messages, witnesses or bank transfers.',
            },
            {
                question: 'What is needed to start an enforcement proceeding?',
                answer: 'An enforceable instrument is needed: a promissory note, an invoice with enforceable status (mérito ejecutivo) or a final judgment. With the document at hand, we assess whether the case is viable and how to proceed.',
            },
            {
                question: 'What happens if the heirs cannot agree on how to divide an inheritance?',
                answer: 'The law does not require anyone to remain a co-owner of an inheritance forever. Any heir can request its division, and when there is no agreement, the division is decided by a juez partidor (partition arbitrator). The same happens after a divorce, when the former spouses cannot agree on how to divide the assets and who keeps what. We handle both types of cases.',
            },
        ],
    },

    insolvency: {
        key: 'insolvency',
        path: '/en/insolvency',
        esPath: '/abogado-insolvencia-puerto-montt',
        seoTitle: 'Insolvency Lawyers in Puerto Montt and Puerto Varas, Chile',
        seoDescription: 'Insolvency law for companies in Puerto Montt and Puerto Varas, Chile: reorganization, liquidation, procedures for SMEs and representation of creditors.',
        h1Before: '',
        h1Gold: 'Insolvency Law',
        h1After: ' Attorneys for Companies in Puerto Varas and Puerto Montt',
        serviceName: 'Insolvency Law',
        serviceDescription: 'Insolvency law attorneys for companies in Puerto Varas and Puerto Montt, Chile: reorganization and liquidation of companies, simplified procedures for micro and small companies and representation of creditors.',
        areaServed: LOS_LAGOS,
        breadcrumbName: 'Insolvency Law',
        contactSource: 'Landing Insolvencia EN',
        intro: [
            `Insolvency law sets out the rules that apply when a company faces insolvency that prevents it from meeting its obligations. Chilean [insolvency legislation](${LEY_20720}) provides two routes: reorganization, aimed at preserving the company when its business is still viable, and liquidation, intended to realize its assets in an orderly manner and pay creditors according to their legal preferences when it is not.`,
            'We advise debtor companies and creditor companies that need to enforce their claims within an insolvency proceeding. Every engagement begins with a diagnosis of the company’s situation: the amount and composition of its debts, the assets pledged as collateral, any enforcement proceedings under way and whether it may qualify as a micro or small company. That analysis determines the appropriate procedure and the deadlines that must be observed.',
        ],
        sectionsTitle: 'What we do in insolvency law',
        sections: [
            {
                heading: 'Judicial reorganization of the company.',
                body: 'The company applies for its reorganization before the court of its domicile (article 54 of Ley N° 20.720). While it lasts, no liquidation, enforcement proceedings or repossessions in lease proceedings may be initiated against it, and those in progress are suspended, except for certain labor proceedings (article 57). We prepare the proposed agreement and negotiate it with the creditors.',
            },
            {
                heading: 'Out-of-court agreement and direct negotiation.',
                body: 'Not every debt problem ends up in court. Often a serious proposal to banks and suppliers, which we put in writing, is enough. If the company already has the support of its main creditors, it can sign a Reorganization Agreement and later submit it for court approval (article 102).',
            },
            {
                heading: 'Voluntary liquidation of the company.',
                body: 'When continuing to operate is no longer possible, the company may apply for its own liquidation before the competent court, attaching the list of its assets and the other documents required by law. A liquidator sells the assets and pays the creditors according to the legal order of priority. When the closing resolution becomes final, the balances that could not be paid are extinguished by operation of law, with certain exceptions (article 255). We represent the company before the court and in the proceedings before the Superintendencia de Insolvencia y Reemprendimiento (Superintendency of Insolvency and Re-entrepreneurship).',
            },
            {
                heading: 'Simplified procedures for micro and small companies.',
                body: `Ley N° 21.563 created shorter procedures for companies that qualify as micro or small under article 2 of [Ley N° 20.416](${LEY_20416}) (annual sales of up to 25,000 UF, Unidades de Fomento).`,
            },
            {
                heading: 'Representation of creditors.',
                body: 'If a customer of the company has entered insolvency proceedings, deadlines run from day one. In a liquidation, creditors have 30 days from notification of the Liquidation Resolution to file their claims and assert their priority (article 170). We file the claim, defend it against objections and challenges, and represent the creditor company at creditors’ meetings. In addition, any creditor may request the compulsory liquidation of a company that has failed to pay it an obligation typical of its line of business that is recorded in an overdue enforceable instrument (article 117). If the debtor is not in insolvency proceedings, the usual path is the juicio ejecutivo (enforcement proceeding).',
            },
            {
                heading: 'Defense in enforcement proceedings, attachments and auctions.',
                body: 'When enforcement proceedings are already under way against the company, with attachment of assets or bank accounts, we file the opposition to the enforceable instrument within the legal deadline, third-party claims (tercerías) of ownership or possession over attached assets that do not belong to the company, and the substitution of the attachment when possible. We also assess whether it is advisable to initiate an insolvency proceeding that suspends the ongoing enforcement actions.',
            },
            {
                heading: 'Individuals with debts.',
                body: 'Although we work mainly with companies, we also advise individuals, who may request the renegotiation of their debts before the Superintendencia de Insolvencia y Reemprendimiento, provided they have not been served with a liquidation claim (articles 260 and 261). If renegotiation is not possible, there is the simplified liquidation (article 273).',
            },
        ],
        faqs: [
            {
                question: 'What is the difference between reorganizing and liquidating a company?',
                answer: 'Reorganizing seeks to keep the company running: under Protección Financiera Concursal (insolvency financial protection), it proposes to its creditors an agreement to pay under new conditions (articles 54 to 58 of Ley N° 20.720). Liquidating means closing: a liquidator sells the assets and pays according to the legal priorities, and when the procedure ends the unpaid balances are extinguished, with certain exceptions (article 255).',
            },
            {
                question: 'What deadline does a creditor have to file its claim in a liquidation?',
                answer: 'Thirty days from notification of the Liquidation Resolution. The claim is filed before the court hearing the proceeding, attaching the documents that support it and asserting its priority (article 170). After that deadline the claim can be filed late (verificación extraordinaria), but that filing does not suspend the distributions made in the meantime (article 251).',
            },
            {
                question: 'Can my company use a simpler procedure because it is an SME?',
                answer: 'Yes, if it qualifies as a micro or small company under article 2 of Ley N° 20.416 (annual sales of up to 25,000 UF). For these companies, Ley N° 21.563 created a simplified reorganization, with 40 days of Protección Financiera Concursal, and a simplified liquidation (articles 273 and 286 of Ley N° 20.720).',
            },
            {
                question: 'Are the partners or the legal representative personally liable for the company’s debts?',
                answer: 'As a general rule, no: the company is liable with its own assets and the partners only up to the amount of their contributions. The exception is if the legal representative signed personal guarantees or sureties, or if the company’s business was managed with fraud or fault. We review each specific case to determine what personal risk exists before moving forward.',
            },
            {
                question: 'What happens to the employees and their severance payments if the company goes into liquidation?',
                answer: 'Labor claims (wages, severance payments and social security contributions) have first-class priority and are paid before most other creditors, within the limits set by law. Together with the client, we review how that order of payment applies before initiating the process.',
            },
        ],
    },

    realestate: {
        key: 'realestate',
        path: '/en/real-estate-and-construction',
        esPath: '/abogado-inmobiliario-puerto-montt',
        seoTitle: 'Real Estate and Construction Lawyers in Puerto Montt',
        seoDescription: 'Real estate and construction law in Puerto Montt and Puerto Varas, Chile: sales, promissory agreements, title review, commercial leases and building contracts.',
        h1Before: '',
        h1Gold: 'Real Estate and Construction',
        h1After: ' Attorneys in Puerto Varas and Puerto Montt',
        serviceName: 'Real Estate and Construction Law',
        serviceDescription: 'Real estate and construction law in Puerto Montt and Puerto Varas, Chile: sales, promissory agreements, title review, commercial leases and building contracts.',
        areaServed: LOS_LAGOS,
        breadcrumbName: 'Real Estate and Construction',
        contactSource: 'Landing Inmobiliario EN',
        intro: [
            'We advise companies, real estate developers, construction companies and property owners at the different stages of a real estate business: assessing a plot of land and reviewing its titles, the sale, the commercial lease and the construction of a project.',
            'A real estate transaction does not end with the signing of the deed. Reviewing the titles, negotiating the promissory agreement and contracting the works involve decisions with long-term legal and economic effects. That is why it pays for the lawyer to take part from the planning stage, while the terms can still be adjusted, and not only once the contract has already been drafted. We handle transactions in Puerto Varas, Puerto Montt and the rest of the Los Lagos Region.',
        ],
        sectionsTitle: 'Matters we cover',
        sections: [
            {
                heading: 'Sale and promissory agreements to sell.',
                body: `We assist in the negotiation and closing of promissory agreements (promesas) and sales of real estate up to the [public deed](${CODIGO_CIVIL}): price and payment terms, guarantees, deadlines and the consequences of non-performance. The aim is a contract that is legally sound and, at the same time, works in practice for those who sign it.`,
            },
            {
                heading: 'Title review.',
                body: 'Before buying, promising to buy or taking a property as collateral, we review its titles and records to detect encumbrances, prohibitions, lawsuits or other restrictions that affect the transaction, and we propose how to clear them before signing.',
            },
            {
                heading: 'Commercial leases.',
                body: 'Lease agreements for commercial premises, offices and warehouses, drafted according to the use the property will have: term, rent and adjustment, guarantees, improvements and grounds for termination. Lease disputes in general, such as non-payment or the return of the property, are handled by our [Arriendos (leases) area, in Spanish](/abogado-arriendo-puerto-montt).',
            },
            {
                heading: 'Building contracts.',
                body: 'We advise project owners, real estate developers and construction companies on the negotiation, drafting and performance of building contracts: price and payment terms, deadlines, penalties, guarantees, acceptance of the works and liability for defects, with attention to the operational requirements of each project.',
            },
            {
                heading: 'Urban planning and land use.',
                body: `We advise on [urban planning regulation](${LGUC}) and land use: reading the applicable zoning plan (plano regulador), building conditions and the permits of the Dirección de Obras Municipales (Municipal Works Department) that bear on the feasibility of a project.`,
            },
            {
                heading: 'Real estate and construction litigation.',
                body: 'We represent plaintiffs and defendants in disputes in the sector: breach of promissory agreements, sales and building contracts, disputes between the promising buyer and the promising seller, claims for construction faults or defects, and problems with title to the property.',
            },
        ],
        extraTitle: 'How we work',
        extra: [
            {
                heading: 'Before signing.',
                body: 'The most useful moment to step in is before signing: when assessing the land, negotiating the promissory agreement or drafting the building contract. At that stage the titles can still be cleared, the terms adjusted and what happens if the other party does not perform can be put in writing.',
            },
            {
                heading: 'When there is already a dispute.',
                body: 'We start by reviewing the signed documents, the available evidence and the deadlines that are running.',
            },
        ],
        faqs: [
            {
                question: 'When is the sale of a property complete?',
                answer: 'When the public deed is executed. The law does not consider the sale of real estate complete until that deed has been executed, so a verbal agreement or a private document on the property and the price is not enough.',
            },
            {
                question: 'What requirements must a promissory agreement to sell meet?',
                answer: 'For it to bind the parties, the promissory agreement must be in writing, refer to a contract that the law does not declare ineffective, set by a term or condition the time at which the sale will be executed, and specify the sale in such a way that only the transfer of title (tradición) or the legal formalities are missing.',
            },
            {
                question: 'What is the deadline to bring a claim for construction defects?',
                answer: 'The Ley General de Urbanismo y Construcciones (General Law on Urban Planning and Construction) sets different periods depending on the type of defect: claims are time-barred after ten years if the faults or defects affect the load-bearing structure of the property, after five years if they affect the building elements or the installations, and after three years if they affect the finishes. Defects that are not comparable to those cases are time-barred after five years. The periods run from the final acceptance of the works by the Dirección de Obras Municipales, except for the three-year period, which runs from the registration of the property in the buyer\u2019s name at the Conservador de Bienes Raíces (Real Estate Registry).',
            },
        ],
    },
};
