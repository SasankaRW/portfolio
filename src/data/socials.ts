export interface Social {
    name: string;
    url: string;
    icon: string;
}

export const socials: Social[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/SasankaRW',
        icon: '📦',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/sasankaravindu',
        icon: '💼',
    },
    {
        name: 'Email',
        url: 'mailto:sasankarw@gmail.com',
        icon: '📧',
    },
    {
        name: 'Phone',
        url: 'tel:+94715669231',
        icon: '📱',
    },
];

export const bio = {
    name: "Sasanka Ravindu Wakkumbura",
    title: "Software Engineer | BSc IT Undergraduate",
    location: "Sri Lanka",
    short: "Dynamic software engineer with experience in system integration, scalable applications, and research-driven development.",
    long: "Dynamic software engineer with experience in system integration, scalable applications, and research-driven development. Skilled in Python, C#, and modern web technologies, with additional expertise in low-level hardware integration, device SDK connectivity, and UI/UX design. Experienced in building reliable applications that interface with RFID, barcode scanners, and simulation tools.",
    points: [
        "Dynamic software engineer with experience in system integration and scalable applications.",
        "Skilled in Python, C#, and modern web technologies (React, Next.js).",
        "Expertise in low-level hardware integration, device SDK connectivity, and UI/UX design.",
        "Experienced in building reliable applications interfacing with RFID & barcode scanners."
    ]
};

export const skills = {
    web: ['React', 'Next.js', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    mobile: ['Flutter', 'Kotlin', 'React Native'],
    database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
    languages: ['Python', 'C#', 'Java', 'C', 'Shell Scripting'],
    cloud: ['Docker', 'Firebase', 'GitHub Actions'],
    design: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX Wireframing'],
};

export const education = [
    {
        institution: "University of Moratuwa, Sri Lanka",
        degree: "BSc in Information Technology",
        year: "2022 – July 2026",
        details: "Current C.GPA: 3.62"
    },
    {
        institution: "CICRA Campus, Sri Lanka",
        degree: "Diploma in Cyber Security & Ethical Hacking",
        year: "2020",
        details: ""
    },
    {
        institution: "Kingswood College, Kandy",
        degree: "G.C.E. Advanced Level",
        year: "2020",
        details: "Combined Mathematics – A, ICT – A, Physics – B (Z-Score: 1.909)"
    }
];

export const achievements = [
    "President’s Scout of Sri Lanka (2019)",
    "Google Hash Code — 10th Place National (2021)",
    "Finalist — National Olympiad in Informatics (2019)",
    "University Colors for Basketball (2023, 2025)",
    "Winner — SLUG Championship (2025)",
    "Hackathons: Coderally 2.0 (2021), Google Hash Code (2022), Coderush (2023)"
];
