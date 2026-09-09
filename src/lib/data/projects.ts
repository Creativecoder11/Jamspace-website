import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    index: "01",
    slug: "taqwaa-residence",
    name: "Taqwaa Residence",
    location: "Jolshiri Abashan, Narayanganj",
    category: "Residential Design",
    image: "/images/projects/taqwaa.webp",

    year: "2025",
    service: "Residential Design",
    style: "Luxury Modern",
    heroImage: "/images/projects/taqwaa/hero.webp",
    heroDescription: "Taqwaa Residence is a contemporary triplex blending modern luxury with everyday comfort. Warm neutrals, refined materials, clean lines, and thoughtful lighting create a cohesive, elegant, and inviting interior.",
    testimonial: {
      quote: "“From the initial concept to the final details, the team was patient, responsive, and committed to getting everything right. They listened carefully to our feedback and worked through every revision with us, ultimately creating a home that reflects our vision and expectations.”",
      author: "Major Serajus Salekin",
      role: "Homeowner, Dhaka"
    },

    overview: "Taqwaa Residence is a contemporary triplex shaped around understated luxury, spatial comfort, and material harmony. Warm neutral tones, natural textures, refined finishes, and layered lighting establish a cohesive interior language throughout the home, while carefully planned spaces balance everyday functionality with an elegant residential character.",
    bentoImages: [
      "/images/projects/taqwaa/bento1.webp",
      "/images/projects/taqwaa/bento2.webp",
      "/images/projects/taqwaa/bento3.webp",
      "/images/projects/taqwaa/bento4.webp",
      "/images/projects/taqwaa/bento-mid.webp",
      "/images/projects/taqwaa/bento6.webp",
      "/images/projects/taqwaa/bento7.webp",
      "/images/projects/taqwaa/bento8.webp"
    ],
    videoSrc: "/videos/hallway.mp4",
    videoPoster: "/images/projects/taqwaa/bento5.webp",

    scopeUnderstanding: "Privacy, comfort, and flow across the triplex.",
    scopeMaterials: "Warm neutral tones, natural textures",
    scopeDescription: "Interior design and detailing for the complete triplex, including space planning, material selection, custom furniture, lighting, and interior finishes.",

    // planningItems: [], // Left undefined intentionally until client provides data

    beforeImage: "/images/projects/taqwaa/before.webp",
    afterImage: "/images/projects/taqwaa/after.webp",

    challengesMainImage: "/images/projects/taqwaa/challenges1.webp",
    challengesBottomImage: "/images/projects/taqwaa/challenges2.webp",
    challengesRows: [
      { challenge: "Luxury Without Formality", solution: "Warm tones and textures paired with refined finishes." },
      { challenge: "Three-Floor Cohesion", solution: "Carried one material and colour language throughout." },
      { challenge: "Everyday Functionality", solution: "Planned space with integrated, uncluttered storage." },
      { challenge: "A Particular Brief", solution: "Refined through close coordination and revisions." },
    ],

    highlightSlides: [
      { index: "01", audience: "Bold Colour Palette.", image: "/images/projects/taqwaa/slider1.webp" },
      { index: "02", audience: "Material Contrast.", image: "/images/projects/taqwaa/slider2.webp" },
      { index: "03", audience: "Statement Elements.", image: "/images/projects/taqwaa/slider3.webp" },
      { index: "04", audience: "Statement Elements.", image: "/images/projects/taqwaa/slider4.webp" },
    ]
  },

  {
    index: "02",
    slug: "casa-zaheen",
    name: "Casa Zaheen",
    location: "Jolshiri Abashan, Narayanganj",
    category: "Residential Design",
    image: "/images/projects/casa-zaheen.webp",

    year: "2024",
    service: "Residential Design",
    style: "Neoclassicism",
    heroImage: "/images/projects/zaheen/hero.webp",
    heroDescription: "Casa Zaheen blends contemporary forms with bold colours, contrasting materials, and expressive details to create a lively yet balanced home that reflects personality and comfort.",
    testimonial: {
      quote: "“The team understood our vision and brought it to life with thoughtful design and attention to detail. The result is a home that feels vibrant, comfortable, and truly personal to us.”",
      author: "Md. Abdus Sabur Khan",
      role: "Homeowner, Dhaka"
    },

    overview: "Casa Zaheen takes an expressive approach to contemporary living, combining clean architectural forms with bold colours, contrasting materials, and distinctive interior accents. The spaces are composed to feel energetic yet balanced, creating a lively home that reflects personality while maintaining comfort, visual harmony, and everyday functionality.",
    bentoImages: [
      "/images/projects/zaheen/bento1.webp",
      "/images/projects/zaheen/bento2.webp",
      "/images/projects/zaheen/bento3.webp",
      "/images/projects/zaheen/bento4.webp",
      "/images/projects/zaheen/bento-mid.webp",
      "/images/projects/zaheen/bento6.webp",
      "/images/projects/zaheen/bento7.webp",
      "/images/projects/zaheen/bento8.webp"
    ],
    videoSrc: "/videos/hallway.mp4",
    videoPoster: "/images/projects/zaheen/bento5.webp",

    scopeUnderstanding: "The space blends vibrant palettes with comfort & function.",
    scopeMaterials: "Bold Colors, Contrasting materials",
    scopeDescription: "Complete interior design covering space planning, material selection, custom furniture, lighting, colour palette, and detailed interior finishes.",

    beforeImage: "/images/projects/zaheen/before.webp",
    afterImage: "/images/projects/zaheen/after.webp",

    challengesMainImage: "/images/projects/zaheen/challenges1.webp",
    challengesBottomImage: "/images/projects/zaheen/challenges2.webp",
    challengesRows: [
      { challenge: "Bold colours, contrasting materials", solution: "A controlled palette keeps it cohesive and expressive." },
      { challenge: "Consistent language across spaces", solution: "Repeated materials and detailing build a unified identity." },
      { challenge: "Function meets expressive design", solution: "Custom solutions blend both together seamlessly." },
      { challenge: "Reflecting the client's personality", solution: "Bespoke accents add distinct personal characteristics." },
    ],

    highlightSlides: [
      { index: "01", audience: "Elegant Wall Mouldings.", image: "/images/projects/zaheen/slider1.webp" },
      { index: "02", audience: "Symmetrical Space Planning.", image: "/images/projects/zaheen/slider2.webp" },
      { index: "03", audience: "Luxury Material Palette.", image: "/images/projects/zaheen/slider3.webp" },
      { index: "04", audience: "Statement Lighting.", image: "/images/projects/zaheen/slider4.webp" },
    ]
  },


  {
    index: "03",
    slug: "eleni",
    name: "Eleni",
    location: "Banani 11",
    category: "Commercial Design",
    image: "/images/projects/eleni.webp",

    year: "2026",
    service: "Commercial Project",
    style: "Traditional",
    heroImage: "/images/projects/eleni/hero.webp",
    heroDescription: "ELENI is a contemporary bridal boutique blending heritage-inspired details with modern elegance, where warm wood, arched displays, and soft neutrals create a luxurious backdrop for the collections.",
    testimonial: {
      quote: "“We wanted ELENI to feel elegant, warm, and rooted in the richness of our heritage while still feeling contemporary. The design team understood that vision beautifully and created a space where our collections feel elevated and every client feels welcomed.”",
      author: "Najmus Shakib Sunny",
      role: "Owner, ELENI"
    },

    overview: "ELENI is a contemporary fashion retail interior designed to place the collection at the centre of the customer experience. A restrained material palette, clean display systems, considered lighting, and carefully organised circulation create an elegant environment that strengthens merchandise visibility while maintaining a distinctive and refined brand presence.",
    bentoImages: [
      "/images/projects/eleni/bento1.webp",
      "/images/projects/eleni/bento2.webp",
      "/images/projects/eleni/bento3.webp",
      "/images/projects/eleni/bento4.webp",
      "/images/projects/eleni/bento-mid.webp",
      "/images/projects/eleni/bento6.webp",
      "/images/projects/eleni/bento7.webp",
      "/images/projects/eleni/bento8.webp"
    ],
    videoSrc: "/videos/hallway.mp4",
    videoPoster: "/images/projects/eleni/bento5.webp",

    scopeUnderstanding: "The space blends elegant displays, comfortable seating, and smooth circulation for bridal shopping.",
    scopeMaterials: "Rich wood, carved detailing, textured finishes, and soft neutral fabrics.",
    scopeDescription: "Complete boutique interior design covering space planning, display systems, custom furniture, material detailing, lighting, and brand integration.",

    // planningItems: [], // Left undefined intentionally until client provides data

    beforeImage: "/images/projects/eleni/before.webp",
    afterImage: "/images/projects/eleni/after.webp",

    challengesMainImage: "/images/projects/eleni/challenges1.webp",
    challengesBottomImage: "/images/projects/eleni/challenges2.webp",
    challengesRows: [
      { challenge: "Limited Natural Light", solution: "Introduced layered lighting and light reflective materials." },
      { challenge: "Compact Layout", solution: "Optimized space planning with multifunctional furniture." },
      { challenge: "Storage Requirements", solution: "Integrated smart storage throughout the apartment." },
      { challenge: "Warm & Modern Look", solution: "Used natural textures and a soft, neutral palette." },
    ],

    highlightSlides: [
      { index: "01", audience: "Heritage-Inspired Patterns.", image: "/images/projects/eleni/slider1.webp" },
      { index: "02", audience: "Arched Display Niches.", image: "/images/projects/eleni/slider2.webp" },
      { index: "03", audience: "Statement Lighting.", image: "/images/projects/eleni/slider3.webp" },
      { index: "04", audience: "Rich Wood Detailing.", image: "/images/projects/eleni/slider4.webp" },
    ]
  },

  {
    index: "04",
    slug: "green-hub-co-working-space",
    name: "Green Hub Co-Working Space",
    location: "Dhanmondi",
    category: "Commercial Design",
    image: "/images/projects/green-hub.webp",

    year: "2025",
    service: "Commercial Design",
    style: "Modern Industrial",
    heroImage: "/images/projects/green-hub/hero.webp",
    heroDescription: "Green Hub is a vibrant co-working space designed to foster collaboration and productivity. Biophilic elements, open layouts, and flexible work zones create an inspiring environment for modern professionals.",
    testimonial: {
      quote: "“The design perfectly captures the energy we wanted for our workspace. It’s functional, beautiful, and our team loves it.”",
      author: "Green Hub Management",
      role: "Co-Founders"
    },

    overview: "Green Hub reimagines the modern workspace by integrating biophilic design with flexible, collaborative zones. Natural light, sustainable materials, and ergonomic layouts ensure a productive and inspiring environment for diverse professionals.",
    bentoImages: [
      "/images/projects/green-hub/bento1.webp", "/images/projects/green-hub/bento2.webp",
      "/images/projects/green-hub/bento3.webp", "/images/projects/green-hub/bento4.webp",
      "/images/projects/green-hub/bento-mid.webp", "/images/projects/green-hub/bento6.webp",
      "/images/projects/green-hub/bento7.webp", "/images/projects/green-hub/bento8.webp"
    ],
    videoSrc: "/videos/green-hub.mp4",
    videoPoster: "/images/projects/green-hub/bento5.webp",

    scopeUnderstanding: "Collaboration, focus, and community in a shared environment.",
    scopeMaterials: "Raw concrete, warm woods, and abundant greenery.",
    scopeDescription: "Complete commercial interior design including space planning, acoustic solutions, custom workstations, and biophilic integration.",

    beforeImage: "/images/projects/green-hub/before.webp",
    afterImage: "/images/projects/green-hub/after.webp",

    challengesMainImage: "/images/projects/green-hub/challenges1.webp",
    challengesBottomImage: "/images/projects/green-hub/challenges2.webp",
    challengesRows: [
      { challenge: "Acoustic Control", solution: "Integrated sound-absorbing panels and strategic zoning." },
      { challenge: "Maximizing Natural Light", solution: "Open floor plans and glass partitions." },
      { challenge: "Flexible Workstations", solution: "Modular furniture and adaptable power solutions." },
      { challenge: "Brand Identity Integration", solution: "Custom signage and cohesive color palettes." },
    ],

    highlightSlides: [
      { index: "01", audience: "Collaborative Zones.", image: "/images/projects/green-hub/slider1.webp" },
      { index: "02", audience: "Biophilic Elements.", image: "/images/projects/green-hub/slider2.webp" },
      { index: "03", audience: "Focus Pods.", image: "/images/projects/green-hub/slider3.webp" },
      { index: "04", audience: "Community Lounge.", image: "/images/projects/green-hub/slider4.webp" },
    ]
  },


  {
    index: "05",
    slug: "rakeen-residence",
    name: "Rakeen's Residence",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/rakeen.webp",

    year: "2025",
    service: "Residential Design",
    style: "Contemporary Minimal",
    heroImage: "/images/projects/rakeen/hero.webp",
    heroDescription: "Rakeen's Residence is a serene sanctuary that embraces minimalism without sacrificing warmth. Clean lines, soft textures, and a neutral palette create a calming retreat from the city.",
    testimonial: {
      quote: "“They transformed our house into a true home. The attention to detail and understanding of our lifestyle was impeccable.”",
      author: "Rakeen's Family",
      role: "Homeowners"
    },

    overview: "Rakeen's Residence focuses on serene minimalism, utilizing a restrained palette and natural textures to create a calming atmosphere. Every element is purposefully placed to enhance spatial flow and daily comfort.",
    bentoImages: [
      "/images/projects/rakeen/bento1.webp", "/images/projects/rakeen/bento2.webp",
      "/images/projects/rakeen/bento3.webp", "/images/projects/rakeen/bento4.webp",
      "/images/projects/rakeen/bento-mid.webp", "/images/projects/rakeen/bento6.webp",
      "/images/projects/rakeen/bento7.webp", "/images/projects/rakeen/bento8.webp"
    ],
    videoSrc: "/videos/rakeen.mp4",
    videoPoster: "/images/projects/rakeen/bento5.webp",

    scopeUnderstanding: "Tranquility, simplicity, and functional elegance.",
    scopeMaterials: "Soft linens, light woods, and matte finishes.",
    scopeDescription: "Full residential interior design focusing on minimalist aesthetics, custom joinery, and ambient lighting.",

    beforeImage: "/images/projects/rakeen/before.webp",
    afterImage: "/images/projects/rakeen/after.webp",

    challengesMainImage: "/images/projects/rakeen/challenges1.webp",
    challengesBottomImage: "/images/projects/rakeen/challenges2.webp",
    challengesRows: [
      { challenge: "Maintaining Warmth in Minimalism", solution: "Layered textures and warm wood accents." },
      { challenge: "Concealed Storage", solution: "Seamless built-in cabinetry throughout." },
      { challenge: "Flow Between Spaces", solution: "Consistent flooring and sightlines." },
      { challenge: "Child-Friendly Durability", solution: "Stain-resistant fabrics and rounded edges." },
    ],

    highlightSlides: [
      { index: "01", audience: "Minimalist Living.", image: "/images/projects/rakeen/slider1.webp" },
      { index: "02", audience: "Hidden Storage.", image: "/images/projects/rakeen/slider2.webp" },
      { index: "03", audience: "Soft Textures.", image: "/images/projects/rakeen/slider3.webp" },
      { index: "04", audience: "Ambient Lighting.", image: "/images/projects/rakeen/slider4.webp" },
    ]
  },

  {
    index: "06",
    slug: "rooftop-pool-area",
    name: "Rooftop & Pool Area",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/pool.webp",

    year: "2024",
    service: "Landscape & Outdoor Design",
    style: "Resort Luxury",
    heroImage: "/images/projects/pool/hero.webp",
    heroDescription: "An exclusive rooftop oasis designed for relaxation and entertainment. The seamless integration of water features, lush landscaping, and comfortable lounging areas creates a private resort experience.",
    testimonial: {
      quote: "“Our rooftop is now the favorite spot in the house. It feels like a five-star resort right above the city.”",
      author: "The Rahman Family",
      role: "Homeowners"
    },

    overview: "This rooftop transformation turns an unused space into a luxurious outdoor retreat. Featuring a custom pool, ambient lighting, and weather-resistant furnishings, it offers a perfect blend of leisure and aesthetic appeal.",
    bentoImages: [
      "/images/projects/pool/bento1.webp", "/images/projects/pool/bento2.webp",
      "/images/projects/pool/bento3.webp", "/images/projects/pool/bento4.webp",
      "/images/projects/pool/bento-mid.webp", "/images/projects/pool/bento6.webp",
      "/images/projects/pool/bento7.webp", "/images/projects/pool/bento8.webp"
    ],
    videoSrc: "/videos/pool.mp4",
    videoPoster: "/images/projects/pool/bento5.webp",

    scopeUnderstanding: "Leisure, entertainment, and weather resilience.",
    scopeMaterials: "Natural stone, teak wood, and water-resistant textiles.",
    scopeDescription: "Outdoor landscape design, pool detailing, custom pergolas, and outdoor lighting planning.",

    beforeImage: "/images/projects/pool/before.webp",
    afterImage: "/images/projects/pool/after.webp",

    challengesMainImage: "/images/projects/pool/challenges1.webp",
    challengesBottomImage: "/images/projects/pool/challenges2.webp",
    challengesRows: [
      { challenge: "Weight Load Constraints", solution: "Lightweight materials and structural reinforcement." },
      { challenge: "Weather Exposure", solution: "UV-resistant finishes and durable outdoor fabrics." },
      { challenge: "Privacy from Neighbors", solution: "Strategic planting and louvered screens." },
      { challenge: "Waterproofing", solution: "Multi-layer waterproofing systems for the pool deck." },
    ],

    highlightSlides: [
      { index: "01", audience: "Infinity Edge Pool.", image: "/images/projects/pool/slider1.webp" },
      { index: "02", audience: "Lounge Decking.", image: "/images/projects/pool/slider2.webp" },
      { index: "03", audience: "Ambient Night Lighting.", image: "/images/projects/pool/slider3.webp" },
      { index: "04", audience: "Lush Greenery.", image: "/images/projects/pool/slider4.webp" },
    ]
  },

  {
    index: "07",
    slug: "pti",
    name: "PTI",
    location: "Matikata, Kalshi",
    category: "Institutional Design",
    image: "/images/projects/pti.webp",

    year: "2023",
    service: "Institutional Design",
    style: "Functional Modern",
    heroImage: "/images/projects/pti/hero.webp",
    heroDescription: "PTI is a modern educational facility designed to inspire learning. Bright, adaptable spaces with durable materials ensure a conducive environment for both students and educators.",
    testimonial: {
      quote: "“The new facility has completely transformed our training programs. The spaces are engaging and highly functional.”",
      author: "PTI Administration",
      role: "Director"
    },

    overview: "The PTI project focuses on creating an engaging educational environment. Through strategic use of color, flexible classroom layouts, and durable finishes, the design supports dynamic teaching methods and student collaboration.",
    bentoImages: [
      "/images/projects/pti/bento1.webp", "/images/projects/pti/bento2.webp",
      "/images/projects/pti/bento3.webp", "/images/projects/pti/bento4.webp",
      "/images/projects/pti/bento-mid.webp", "/images/projects/pti/bento6.webp",
      "/images/projects/pti/bento7.webp", "/images/projects/pti/bento8.webp"
    ],
    videoSrc: "/videos/pti.mp4",
    videoPoster: "/images/projects/pti/bento5.webp",

    scopeUnderstanding: "Academic focus, collaboration, and institutional durability.",
    scopeMaterials: "High-traffic flooring, acoustic panels, and vibrant accents.",
    scopeDescription: "Educational facility design including classroom layouts, common areas, administrative offices, and wayfinding.",

    beforeImage: "/images/projects/pti/before.webp",
    afterImage: "/images/projects/pti/after.webp",

    challengesMainImage: "/images/projects/pti/challenges1.webp",
    challengesBottomImage: "/images/projects/pti/challenges2.webp",
    challengesRows: [
      { challenge: "High Foot Traffic", solution: "Commercial-grade flooring and wall protections." },
      { challenge: "Acoustic Management", solution: "Sound-absorbing ceilings and partition walls." },
      { challenge: "Flexible Learning Spaces", solution: "Movable furniture and modular classroom setups." },
      { challenge: "Budget Constraints", solution: "Value-engineered materials without compromising design." },
    ],

    highlightSlides: [
      { index: "01", audience: "Interactive Classrooms.", image: "/images/projects/pti/slider1.webp" },
      { index: "02", audience: "Collaborative Commons.", image: "/images/projects/pti/slider2.webp" },
      { index: "03", audience: "Modern Library.", image: "/images/projects/pti/slider3.webp" },
      { index: "04", audience: "Admin Offices.", image: "/images/projects/pti/slider4.webp" },
    ]
  }
];