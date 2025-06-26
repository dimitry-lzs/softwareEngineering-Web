import axios from 'axios';

interface GroqMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface GroqApiParams {
    messages: GroqMessage[];
    model?: string;
    temperature?: number;
    max_completion_tokens?: number;
    top_p?: number;
    stream?: boolean;
    stop?: string | string[] | null;
}

interface UseSummaryParams {
    model?: string;
    temperature?: number;
    max_completion_tokens?: number;
    top_p?: number;
    stream?: boolean;
    stop?: string | string[] | null;
    apiKey?: string;
}

export const useSummary = () => {
    const generateSummary = async (
        prompt: string,
        params: UseSummaryParams = {}
    ) => {
        try {
            const {
                model = "meta-llama/llama-4-scout-17b-16e-instruct",
                temperature = 1,
                max_completion_tokens = 1024,
                top_p = 1,
                stream = false,
                stop = null,
                apiKey = import.meta.env.VITE_GROQ_API_KEY
            } = params;

            const requestBody: GroqApiParams = {
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model,
                temperature,
                max_completion_tokens,
                top_p,
                stream,
                stop
            };

            const response = await axios.post(
                'https://api.groq.com/openai/v1/chat/completions',
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error generating summary:', error);
            throw error;
        }
    };

    const generateDoctorRoast = async (reviews: string[], params: UseSummaryParams = {}) => {
        const reviewsText = reviews.map(review => `[${review}]`).join(',\n');

        const prompt = `Based on the reviews below, generate a very short, funny, teasing one-liner directed at the doctor as if someone is speaking to him after reading his reviews. The tone should be humorous, sarcastic, or ironic — like a roast or a punchy comment from a friend, patient, or stand-up comic. Keep it clever, brief (1–2 sentences), and avoid stating the reviews directly — just imply or twist them into a joke. Think smart, punchy, and memorable.
            Do not include any explanations or extra commentary. Output only the joke or comment.
            Here are the reviews: ${reviewsText}`;

        return generateSummary(prompt, params);
    };

    const generatePatientRoast = async (diagnoses: [string, string][], params: UseSummaryParams = {}) => {
        const diagnosesText = diagnoses.map(d => `[${d[0]}: ${d[1]}]`).join(',\n');
        const prompt = `You are a sarcastic digital assistant reviewing a patient's medical records. Based on the diagnoses listed below, generate a short, dark-humored, ironic one-liner **about the patient**, spoken as if you're making a witty comment to someone else (or directly to the patient) — not as a doctor, but as a brutally honest observer or AI sidekick.
            The line should mention or clearly imply at least one condition, optionally with a specific detail, and end with a dry, clever punch. Do not just summarize clinically. Turn the input into a biting or funny comment like a roast — think black comedy, but not mean-spirited.
            Output only the one-liner. No preamble, no notes.
            Here are the diagnoses: ${diagnosesText}`;

        return generateSummary(prompt, params);
    };

    const generateDoctorSummaryToPatient = async (
        reviews: string[],
        bio: string,
        params: UseSummaryParams = {}
    ) => {
        const reviewsText = reviews.map(r => `[${r}]`).join(',\n');

        const prompt = `A patient is considering booking an appointment with a doctor. Below are the doctor's bio and some reviews from previous patients. Write a short, darkly humorous one-liner or sarcastic comment directed to the patient, as if you're a cynical friend or brutally honest AI summarizing what kind of experience they should expect.
            The line should twist the info from the bio and/or reviews into a single clever joke. You may exaggerate or connect dots ironically, but don’t directly quote the reviews or bio. Use wit, irony, and morbid humor if needed — like you're warning them, playfully.
            Output only the final one-liner. Do not include explanations or extra commentary.
            Doctor's bio: [${bio}]
            Doctor's reviews: ${reviewsText}`;

        return generateSummary(prompt, params);
    };

    return { generateSummary, generateDoctorRoast, generatePatientRoast, generateDoctorSummaryToPatient };
}
