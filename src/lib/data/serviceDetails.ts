import type { ServiceDetailContent } from "@/lib/types";

/** Contact page link that opens the enquiry form for a service. */
const enquiryHref = (service: string) =>
  `/contact?enquiry=design&service=${service}#start-your-project`;


export const serviceDetails = {
  "interior-design": {
    name: "Interior Design",
    meta: {
      title: "Interior Design Services",
      description:
        "Residential and commercial interior design in Dhaka — space planning, materials, lighting and furniture, designed around how you live, work and use a space.",
    },
    hero: {
      titleLines: ["Interior", "Design."],
      intro:
        "We design homes and commercial spaces around everyday routines, the way teams work and how customers use a space.",
      cta: { label: "Discuss Your Project", href: enquiryHref("interiors") },
      // Alternates residential and commercial work.
      stripImages: [
        "/images/services/interior-design/carousel/Mask group-1.webp",
        "/images/services/interior-design/carousel/Mask group-2.webp",
        "/images/services/interior-design/carousel/Mask group-3.webp",
        "/images/services/interior-design/carousel/Mask group-4.webp",
        "/images/services/interior-design/carousel/Mask group-5.webp",
        "/images/services/interior-design/carousel/Mask group-6.webp",
        "/images/services/interior-design/carousel/Mask group-7.webp",
        "/images/services/interior-design/carousel/Mask group-8.webp",
        "/images/services/interior-design/carousel/Mask group-9.webp",
        "/images/services/interior-design/carousel/Mask group.webp",
      ],
      about:
        "Jam Space designs residential and commercial interiors, from individual rooms to full homes, workplaces and retail spaces. We plan layouts, finishes and details around how people use the space and what the project needs to achieve.",
    },
    included: {
      intro:
        "Your scope can include layouts, lighting, finishes, furniture and visualisation, depending on what your project needs.",
      cta: { label: "Start a Project", href: enquiryHref("interiors") },
      items: [
        { title: "Space Planning", image: "/images/services/interior-design/included/Mask group.webp" },
        { title: "Interior Concepts", image: "/images/services/interior-design/included/Mask group-1.webp" },
        { title: "Furniture & Joinery", image: "/images/services/interior-design/included/Mask group-2.webp" },
        { title: "Lighting Design", image: "/images/services/interior-design/included/Mask group-3.webp" },
        { title: "Materials & Hardware", image: "/images/services/interior-design/included/Mask group-4.webp" },
        { title: "3D Visualisation", image: "/images/services/interior-design/included/Mask group-5.webp" },
        
      ],
    },
    approach: {
      intro:
        "We start with how the space will be used, develop a design direction and refine it with your feedback.",
      cta: { label: "Discuss Your Project", href: enquiryHref("interiors") },
      projectsLink: { label: "See Our Projects", href: "/projects" },
      image: "/images/services/interior-design/our approach.webp",
      steps: [
        {
          title: "Understand",
          description: "We listen to your goals and how the space needs to work.",
        },
        {
          title: "Create",
          description: "We develop layouts, concepts and material directions for your brief.",
        },
        {
          title: "Refine",
          description: "We review the design with you and prepare the agreed deliverables.",
        },
      ],
    },
    relatedProjects: {
      intro:
        "See how we’ve approached the needs of a home, a retail space and a workplace.",
      cta: { label: "View All Projects", href: "/projects" },
      cardLabel: "View Project",
      projects: [
        {
          slug: "taqwaa-residence",
          name: "Taqwaa Residence",
          location: "Jolshiri Abashan, Narayanganj",
          category: "Residential Interiors",
        },
        {
          slug: "eleni",
          name: "Eleni",
          location: "Banani, Dhaka",
          category: "Commercial Interiors",
        },
        {
          slug: "green-hub-co-working-space",
          name: "Greenhub Workspace",
          location: "Dhanmondi, Dhaka",
          category: "Commercial Interiors",
        },
      ],
    },
    whyChoose: {
      intro:
        "We make design decisions with you, from how the space should work to which details are worth investing in.",
      cta: { label: "View All Services", href: "/services" },
      reasons: [
        {
          title: "Designed Around Use",
          description:
            "We plan for daily routines at home and the practical needs of teams and customers.",
        },
        {
          title: "Clear Design Guidance",
          description:
            "We explain the options and trade-offs so you can make informed decisions.",
        },
        {
          title: "Coordinated Details",
          description:
            "We develop layouts, lighting, finishes and built-in elements together.",
        },
        {
          title: "Practical Planning",
          description:
            "We consider materials, budget and how the design can be carried out.",
        },
      ],
    },
    audience: {
      label: "Ideal For",
      // Two residential, two commercial.
      slides: [
        { audience: "New Homeowners", image: "/images/services/interior-design/scroll-image/design highlights image.webp" },
        { audience: "Homeowners Renovating", image: "/images/services/interior-design/scroll-image/design highlights image-2.webp" },
        { audience: "Workplace Teams", image: "/images/services/interior-design/scroll-image/design highlights image-1.webp" },
        { audience: "Retail & Hospitality Businesses", image: "/images/services/interior-design/scroll-image/design highlights image-3.webp" },
      ],
    },
    faq: {
      intro:
        "Find out what we design, what your engagement can include and how to get started.",
      items: [
        {
          question: "What kinds of interiors do you design?",
          answer:
            "We design homes, offices, shops and hospitality spaces. The scope can range from one room to a complete interior.",
        },
        {
          question: "How do I get started?",
          answer:
            "Start with a complimentary project discussion. We’ll learn about your space and agree on the scope and fee before detailed design begins.",
        },
        {
          question: "Are drawings and 3D visuals included?",
          answer:
            "Your design agreement specifies which drawings, visuals and other deliverables are included. We confirm these with you before detailed design begins.",
        },
        {
          question: "Can Jam Space also carry out the work?",
          answer:
            "Yes. If you commission execution, we prepare a separate proposal and agreement covering the approved scope, specifications, cost and timeline.",
        },
      ],
    },
    closing: {
      titleLines: ["Tell Us What", "You’re Planning."],
      cta: { label: "Discuss Your Project", href: enquiryHref("interiors") },
    },
  },

  "architectural-design": {
    name: "Architectural Design",
    meta: {
      title: "Architectural Design Services",
      description:
        "Architectural design for homes and commercial buildings in Dhaka — concepts, layouts, façades and outdoor spaces shaped by the site and how it will be used.",
    },
    hero: {
      titleLines: ["Architectural", "Design."],
      intro:
        "We design homes and commercial buildings, starting with what the site can accommodate and what the building needs to do.",
      cta: { label: "Discuss Your Project", href: enquiryHref("architecture") },
      // PTI Skyline renders (residential tower + commercial base).
      // TODO: add residential building images (e.g. The Regent, Aranya) once verified.
      stripImages: [
        "/images/services/architectural-design/carousel/Mask group.webp",
        "/images/services/architectural-design/carousel/Mask group-1.webp",
        "/images/services/architectural-design/carousel/Mask group-2.webp",
        "/images/services/architectural-design/carousel/Mask group-3.webp",
        "/images/services/architectural-design/carousel/Mask group-4.webp",
        "/images/services/architectural-design/carousel/Mask group-5.webp",
        "/images/services/architectural-design/carousel/Mask group-6.webp",
        "/images/services/architectural-design/carousel/Mask group-7.webp",
      ],
      about:
        "Jam Space develops building concepts and floor plans for residential, commercial and mixed-use projects. We study the site and brief, then explore the building’s footprint, overall form and how space is allocated across floors before refining the design.",
    },
    included: {
      intro:
        "We can develop floor plans, façades and outdoor layouts. Your agreement specifies which drawings and visuals you’ll receive.",
      cta: { label: "Start a Project", href: enquiryHref("architecture") },
      items: [
        { title: "Site & Brief Review", image: "/images/services/architectural-design/included/Mask group.webp" },
        { title: "Building Concepts", image: "/images/services/architectural-design/included/Mask group-1.webp" },
        { title: "Spatial Planning", image: "/images/services/architectural-design/included/Mask group-2.webp" },
        { title: "Facade & Exterior Design", image: "/images/services/architectural-design/included/Mask group-3.webp" },
        { title: "Rooftop & Outdoor Design", image: "/images/services/architectural-design/included/Mask group-4.webp" },
        { title: "Architectural Visualisation", image: "/images/services/architectural-design/included/Mask group-5.webp" },
      ],
    },
    approach: {
      intro:
        "We compare building concepts, testing how each uses the site and accommodates the spaces the project needs.",
      cta: { label: "Discuss Your Project", href: enquiryHref("architecture") },
      projectsLink: { label: "See Our Projects", href: "/projects" },
      image: "/images/services/architectural-design/our approach.webp",
      steps: [
        {
          title: "Understand",
          description: "We review the site, intended use and your priorities.",
        },
        {
          title: "Create",
          description: "We explore building forms, layouts and exterior treatments.",
        },
        {
          title: "Refine",
          description: "We review the chosen direction and prepare the agreed deliverables.",
        },
      ],
    },
    relatedProjects: {
      intro:
        "See how PTI Skyline separates public and private circulation, alongside two residential building studies.",
      cta: { label: "View All Projects", href: "/projects" },
      cardLabel: "View Project",
      projects: [
        {
          slug: "pti",
          name: "PTI Skyline",
          location: "Kalshi, Mirpur",
          category: "Mixed-Use Architecture",
        },
        // Brochure references — enable once their case studies are published
        // in src/lib/data/projects.ts (cards only show for published slugs).
        // { slug: "the-regent", name: "The Regent", location: "Jolshiri, Dhaka", category: "Residential Architecture" },
        // { slug: "aranya", name: "Aranya", location: "Basail, Tangail", category: "Residential Architecture" },
      ],
    },
    whyChoose: {
      intro:
        "We compare the trade-offs between building options early, including how much space each gives to the project’s main uses.",
      cta: { label: "View All Services", href: "/services" },
      reasons: [
        {
          title: "Site-Led Design",
          description:
            "We consider access, orientation and the building’s relationship to its surroundings.",
        },
        {
          title: "Clear Circulation",
          description:
            "We plan how residents, visitors and teams move through the building.",
        },
        {
          title: "Coherent Exteriors",
          description:
            "We develop façades, openings and materials in relation to the building layout.",
        },
        {
          title: "Practical Decisions",
          description:
            "We consider feasibility and explain trade-offs as we refine the design.",
        },
      ],
    },
    audience: {
      label: "Ideal For",
      slides: [
        { audience: "Homeowners Planning a Build", image: "/images/services/architectural-design/scroll-image/design highlights image.webp" },
        { audience: "Commercial Property Owners", image: "/images/services/architectural-design/scroll-image/design highlights image-1.webp" },
        { audience: "Mixed-Use Developers", image: "/images/services/architectural-design/scroll-image/design highlights image-2.webp" },
        { audience: "Owners Updating Exteriors", image: "/images/services/architectural-design/scroll-image/design highlights image-3.webp" },
      ],
    },
    faq: {
      intro:
        "What to bring to the first discussion and what to agree on before detailed design begins.",
      items: [
        {
          question: "What kinds of buildings do you design?",
          answer:
            "We develop architectural designs for residential, commercial and mixed-use projects. We also take on façade and outdoor-space assignments where the scope is agreed separately.",
        },
        {
          question: "What should I bring to the first discussion?",
          answer:
            "Share the site location, intended use and any available plot dimensions, survey drawings or existing plans. We’ll discuss what else is needed before design begins.",
        },
        {
          question: "Are technical drawings and approvals included?",
          answer:
            "Your agreement specifies the drawings and technical documentation included, along with any regulatory coordination or professional certification responsibilities. We clarify these before detailed design begins.",
        },
        {
          question: "Can I commission design separately from construction?",
          answer:
            "Yes. You can engage Jam Space for architectural design alone. If execution is offered for your scope, we’ll discuss it under a separate proposal and agreement.",
        },
      ],
    },
    closing: {
      titleLines: ["Tell Us What", "You’re Planning."],
      cta: { label: "Discuss Your Project", href: enquiryHref("architecture") },
    },
  },

  "custom-furniture": {
    name: "Custom Furniture",
    meta: {
      title: "Custom Furniture Services",
      description:
        "Bespoke furniture, cabinetry and built-in storage designed and built for homes and businesses in Dhaka — from a single piece to a fully coordinated set.",
    },
    hero: {
      titleLines: ["Bespoke", "Furniture."],
      intro:
        "We design custom furniture and fitted storage for homes and businesses, from a single piece to a coordinated set.",
      cta: { label: "Discuss Your Project", href: enquiryHref("furniture") },
      // Alternates residential and commercial furniture.
      stripImages: [
        "/images/services/custom-furniture/carousel/Mask group.webp",
        "/images/services/custom-furniture/carousel/Mask group-1.webp",
        "/images/services/custom-furniture/carousel/Mask group-2.webp",
        "/images/services/custom-furniture/carousel/Mask group-3.webp",
        "/images/services/custom-furniture/carousel/Mask group-4.webp",
        "/images/services/custom-furniture/carousel/Mask group-5.webp",
        "/images/services/custom-furniture/carousel/Mask group-6.webp",
        "/images/services/custom-furniture/carousel/Mask group-7.webp",
        "/images/services/custom-furniture/carousel/Mask group-8.webp",
        "/images/services/custom-furniture/carousel/Mask group-9.webp",

      ],
      about:
        "Jam Space designs freestanding furniture, cabinetry and built-in storage. We work out what each piece needs to hold or support, how it fits the room and how it will be made. Production and installation can be commissioned separately.",
    },
    included: {
      intro:
        "Commission a standalone piece or a coordinated set. We agree on the design deliverables before work begins.",
      cta: { label: "Start a Project", href: enquiryHref("furniture") },
      items: [
        { title: "Bespoke Freestanding Furniture", image: "/images/services/custom-furniture/included/Mask group.webp" },
        { title: "Wardrobes & Fitted Storage", image: "/images/services/custom-furniture/included/Mask group-1.webp" },
        { title: "Kitchen Cabinetry", image: "/images/services/custom-furniture/included/Mask group-2.webp", },
        { title: "Shelving & Display Units", image: "/images/services/custom-furniture/included/Mask group-3.webp" },
        { title: "Materials & Hardware", image: "/images/services/custom-furniture/included/Mask group-4.webp" },
        { title: "Furniture Drawings & Detailing", image: "/images/services/custom-furniture/included/Mask group-5.webp" },
      ],
    },
    approach: {
      intro:
        "We establish what the furniture must do, develop options and agree on the details before any production begins.",
      cta: { label: "Discuss Your Project", href: enquiryHref("furniture") },
      projectsLink: { label: "See Our Projects", href: "/projects" },
      image: "/images/services/custom-furniture/our approach.webp",
      steps: [
        {
          title: "Understand",
          description: "We review the room dimensions, storage needs and intended use.",
        },
        {
          title: "Create",
          description:
            "We develop layouts and compare freestanding and fitted options where relevant.",
        },
        {
          title: "Refine",
          description:
            "We confirm dimensions, finishes and hardware, then prepare the agreed drawings.",
        },
      ],
    },
    relatedProjects: {
      intro:
        "See how custom furniture can solve different needs, from relocatable storage to cabinetry and product displays.",
      cta: { label: "View All Projects", href: "/projects" },
      cardLabel: "View Project",
      // The section stays hidden until at least one card has a published case study.
      projects: [
        // Brochure suggestions — confirm details, publish the case studies in
        // src/lib/data/projects.ts, then uncomment with the matching slugs.
        // { slug: "nafiur-residence", name: "Nafiur Residence", location: "Bashundhara", category: "Modular Furniture" },
        // { slug: "springville-kitchen", name: "Springville Kitchen", location: "Niketon, Gulshan", category: "Kitchen Cabinetry" },
        // { slug: "fotile-experience-center", name: "FOTILE Experience Center", location: "Uttara, Dhaka", category: "Product Displays" },
      ],
    },
    whyChoose: {
      intro:
        "We work through the decisions that determine what you can store, how much floor space you keep and whether a piece can move with you.",
      cta: { label: "View All Services", href: "/services" },
      reasons: [
        {
          title: "Fitted or Freestanding",
          description:
            "We compare built-ins and movable pieces based on the room and how you expect to use it.",
        },
        {
          title: "Storage That Fits",
          description:
            "We plan compartments around what you need to store, display or reach regularly.",
        },
        {
          title: "Coordinated Pieces",
          description:
            "We plan furniture alongside the room layout so doors, drawers and walkways have the space they need.",
        },
        {
          title: "Defined Production Scope",
          description:
            "If commissioned, production and installation are quoted against the approved design and specifications.",
        },
      ],
    },
    audience: {
      label: "Ideal For",
      // Two residential, two commercial.
      slides: [
        { audience: "Homeowners Planning Built-Ins", image: "/images/services/custom-furniture/scroll-image/design highlights image.webp" },
        { audience: "Renters Who Need Movable Furniture", image: "/images/services/custom-furniture/scroll-image/design highlights image-1.webp" },
        { audience: "Workplaces Planning Storage", image: "/images/services/custom-furniture/scroll-image/design highlights image-2.webp" },
        { audience: "Retailers Planning Displays", image: "/images/services/custom-furniture/scroll-image/design highlights image-3.webp" },
      ],
    },
    faq: {
      intro: "Find out what you can commission and what to share before we start.",
      items: [
        {
          question: "Can I commission a single piece?",
          answer:
            "Yes. You can commission an individual piece or a set of furniture. Furniture design can also form part of a larger interiors project.",
        },
        {
          question: "What should I share at the first discussion?",
          answer:
            "Share what you need the piece to do, where it will sit and any photos or approximate dimensions you have. We’ll confirm what measurements are needed.",
        },
        {
          question: "Can you design furniture for a rental property?",
          answer:
            "Yes. We can explore freestanding or demountable options where the brief calls for furniture that can move to another space.",
        },
        {
          question: "Can Jam Space make and install the furniture?",
          answer:
            "Where separately commissioned, we can support production and installation of the approved design. We agree on the scope, quotation and timeline for that work separately.",
        },
      ],
    },
    closing: {
      titleLines: ["Tell Us What", "You’re Planning."],
      cta: { label: "Discuss Your Project", href: enquiryHref("furniture") },
    },
  },

  "consultancy-visualisation": {
    name: "Consultancy & Visualisation",
    meta: {
      title: "Consultancy & Visualisation Services",
      description:
        "Expert design advice, space planning and 2D and 3D visualisation in Dhaka. Compare layouts and see how your space will look before you commit.",
    },
    hero: {
      titleLines: ["Consultancy &", "Visualisation."],
      intro:
        "Get professional advice on a design decision, compare layouts or see how a proposal could look before committing.",
      cta: { label: "Discuss Your Project", href: enquiryHref("consultancy-visualisation") },
      // Consultation, then commercial / residential / commercial renders.
      stripImages: [
        "/images/services/consultancy/carousel/Mask group.webp",
        "/images/services/consultancy/carousel/Mask group-1.webp",
        "/images/services/consultancy/carousel/Mask group-2.webp",
        "/images/services/consultancy/carousel/Mask group-3.webp",
        "/images/services/consultancy/carousel/Mask group-4.webp",
        "/images/services/consultancy/carousel/Mask group-5.webp",
        "/images/services/consultancy/carousel/Mask group-6.webp",
        "/images/services/consultancy/carousel/Mask group-7.webp",
        "/images/services/consultancy/carousel/Mask group-8.webp",
        "/images/services/consultancy/carousel/Mask group-9.webp",
      ],
      about:
        "Jam Space helps homeowners and businesses assess design options before committing to a direction. Commission advice, space planning or visualisation for a specific brief. We agree whether you need a written summary, 2D drawings, 3D visuals or a combination.",
    },
    included: {
      intro:
        "Choose the support you need, from an initial consultation to drawings and visuals for a defined brief.",
      cta: { label: "Start a Project", href: enquiryHref("consultancy-visualisation") },
      items: [
        { title: "Design Consultation", image: "/images/services/consultancy/included/Mask group.webp", },
        { title: "Concept Development", image: "/images/services/consultancy/included/Mask group-1.webp" },
        { title: "Space Planning", image: "/images/services/consultancy/included/Mask group-2.webp" },
        { title: "Material & Finish Guidance", image: "/images/services/consultancy/included/Mask group-3.webp" },
        { title: "2D Design Drawings", image: "/images/services/consultancy/included/Mask group-4.webp" },
        { title: "3D Visualisation", image: "/images/services/consultancy/included/Mask group-5.webp" },
      ],
    },
    approach: {
      intro:
        "We identify the decision you need to make, review what you already have and agree what will help.",
      cta: { label: "Discuss Your Project", href: enquiryHref("consultancy-visualisation") },
      projectsLink: { label: "See Our Projects", href: "/projects" },
      image: "/images/services/consultancy/our approach.webp",
      steps: [
        {
          title: "Understand",
          description: "We review your plans, priorities and the decisions you’re weighing.",
        },
        {
          title: "Create",
          description: "We develop the agreed advice, layout options or visuals.",
        },
        {
          title: "Refine",
          description: "We review the output with you and clarify your next steps.",
        },
      ],
    },
    relatedProjects: {
      intro: "Explore selected Jam Space projects and the ideas that shaped their design.",
      cta: { label: "View All Projects", href: "/projects" },
      cardLabel: "View Project",
      // Published case studies with renders; name, location and category come
      // from each case study.
      projects: [
        { slug: "casa-zaheen" },
        { slug: "green-hub-co-working-space" },
        { slug: "pti" },
      ],
    },
    whyChoose: {
      intro:
        "A focused brief can help you test whether a layout works or see how a material choice changes the space.",
      cta: { label: "View All Services", href: "/services" },
      reasons: [
        {
          title: "Focused Advice",
          description:
            "Bring a specific decision, such as whether to replan a room or keep its existing layout.",
        },
        {
          title: "Comparable Layouts",
          description:
            "Use 2D plans to compare how different arrangements handle space, storage and movement.",
        },
        {
          title: "Visual Decisions",
          description:
            "Use agreed 3D views to assess proportions, finishes and lighting together.",
        },
        {
          title: "Defined Deliverables",
          description: "We agree on the outputs and review scope before work starts.",
        },
      ],
    },
    audience: {
      label: "Ideal For",
      // Two residential, two commercial.
      slides: [
        { audience: "Homeowners Weighing Layouts", image: "/images/services/consultancy/scroll-image/design highlights image.webp" },
        { audience: "Businesses Planning a Space", image: "/images/services/consultancy/scroll-image/design highlights image-1.webp" },
        { audience: "Owners Reviewing a Concept", image: "/images/services/consultancy/scroll-image/design highlights image-2.webp" },
        { audience: "Teams Needing 3D Visuals", image: "/images/services/consultancy/scroll-image/design highlights image-3.webp" },
      ],
    },
    faq: {
      intro: "Find out how to book advice or commission drawings and visuals.",
      items: [
        {
          question: "What does a Jam Session include?",
          answer:
            "Jam Session costs BDT 3,000 for a 60-minute professional consultation. It includes personalised guidance and a brief written action summary. Custom layouts and drawings are excluded.",
        },
        {
          question: "Can I commission drawings or visuals separately?",
          answer:
            "Yes. We can scope 2D drawings or 3D visualisation separately. Share your brief and any available plans or references so we can confirm the deliverables and fee.",
        },
        {
          question: "What should I share before we start?",
          answer:
            "Share your goals, available dimensions or plans, relevant photos and the decisions you need to make. We’ll tell you if the work needs more information.",
        },
        {
          question: "How do I choose between consultancy and a full design engagement?",
          answer:
            "Choose consultancy for focused advice or a defined output. If you need a coordinated design developed across the whole project, discuss a full design engagement with us.",
        },
      ],
    },
    closing: {
      titleLines: ["Let’s Review", "Your Options."],
      cta: { label: "Discuss Your Project", href: enquiryHref("consultancy-visualisation") },
      // TODO: add the dedicated Jam Session scheduler URL, then uncomment.
      // secondaryCta: { label: "Book a Jam Session", href: "https://…" },
    },
  },
} satisfies Record<string, ServiceDetailContent>;

export type ServiceDetailSlug = keyof typeof serviceDetails;
