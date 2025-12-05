export interface Research {
    id: string;
    title: string;
    abstract: string;
    goals: string[];
    method: string;
    results: string;
    pdfUrl?: string;
    year: string;
}

export const research: Research[] = [
    {
        id: 'research-1',
        title: 'Machine Learning in Modern Web Development',
        abstract: 'This paper explores the integration of machine learning models into web applications, analyzing performance implications and user experience improvements.',
        goals: [
            'Evaluate ML model performance in browser environments',
            'Compare server-side vs client-side inference',
            'Develop best practices for ML-powered web apps',
        ],
        method: 'We conducted a series of experiments using TensorFlow.js and WebGL acceleration across different browsers and devices. Performance metrics including inference time, memory usage, and user experience were measured.',
        results: 'Client-side ML inference showed promising results for smaller models (<10MB), with average inference times under 100ms. Server-side inference remains preferred for complex models requiring GPU acceleration.',
        pdfUrl: '/research/ml-web-dev.pdf',
        year: '2023',
    },
    {
        id: 'research-2',
        title: 'Optimizing Developer Experience in Large Codebases',
        abstract: 'An investigation into tools and practices that improve developer productivity and satisfaction when working with enterprise-scale codebases.',
        goals: [
            'Identify pain points in large codebase navigation',
            'Evaluate impact of AI-assisted coding tools',
            'Measure productivity improvements from tooling changes',
        ],
        method: 'Survey-based study combined with time-tracking analysis across 50 developers working on codebases ranging from 100K to 5M lines of code.',
        results: 'AI-assisted coding tools showed a 25% improvement in task completion time. Improved search and navigation tools had the highest impact on developer satisfaction.',
        year: '2022',
    },
];
