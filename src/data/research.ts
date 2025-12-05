export interface Research {
    id: string;
    title: string;
    abstract: string;
    goals: string[];
    method: string;
    results: string;
    pdfUrl?: string;
    year: string;
    tags?: string[];
}

export const research: Research[] = [
    {
        id: 'research-3',
        title: 'Analysis of Adversarial Attacks and Defense Mechanisms on Machine Learning Models',
        abstract: 'A comprehensive literature review analyzing various adversarial attack vectors on machine learning models and evaluating the effectiveness of current defense mechanisms.',
        goals: [
            'Analyze common adversarial attack methods',
            'Evaluate defense mechanism effectiveness',
            'Identify gaps in current security measures',
        ],
        method: 'Systematic literature review of recent publications in the field of adversarial machine learning.',
        results: 'Identified key vulnerabilities in standard CNN architectures and highlighted the trade-offs between model robustness and accuracy.',
        pdfUrl: '/research/Analysis_of_Adversarial_Attacks.pdf',
        year: '2024',
        tags: ['Literature Review'],
    },
];
