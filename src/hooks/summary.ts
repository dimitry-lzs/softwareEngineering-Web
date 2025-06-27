import { client } from '../api';

export const useSummary = () => {
    const generateSummary = async (
        prompt: string,
    ) => {
        try {
            const response = await client.post(
                '/generate-summary',
                {
                    prompt
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error generating summary:', error);
            throw error;
        }
    };

    const generateDoctorRoast = async (reviews: string[]) => {
        const reviewsText = reviews.map(review => `[${review}]`).join(',\n');

        const prompt = `Based on the reviews below, generate a very short, funny, teasing one-liner directed at the doctor as if someone is speaking to him after reading his reviews. The tone should be humorous, sarcastic, or ironic — like a roast or a punchy comment from a friend, patient, or stand-up comic. Keep it clever, brief (1–2 sentences), and avoid stating the reviews directly — just imply or twist them into a joke. Think smart, punchy, and memorable.
            Do not include any explanations or extra commentary. Output only the joke or comment.
            Here are the reviews: ${reviewsText}`;

        return generateSummary(prompt);
    };

    const generatePatientRoast = async (diagnoses: [string, string][]) => {
        const diagnosesText = diagnoses.map(d => `[${d[0]}: ${d[1]}]`).join(',\n');
        const prompt = `You are a sarcastic digital assistant reviewing a patient's medical records. Based on the diagnoses listed below, generate a short, dark-humored, ironic one-liner **about the patient**, spoken as if you're making a witty comment to someone else (or directly to the patient) — not as a doctor, but as a brutally honest observer or AI sidekick.
            The line should mention or clearly imply at least one condition, optionally with a specific detail, and end with a dry, clever punch. Do not just summarize clinically. Turn the input into a biting or funny comment like a roast — think black comedy, but not mean-spirited.
            Output only the one-liner. No preamble, no notes.
            Here are the diagnoses: ${diagnosesText}`;

        return generateSummary(prompt);
    };

    const generateDoctorSummaryToPatient = async (
        reviews: string[],
        bio: string,
    ) => {
        const reviewsText = reviews.map(r => `[${r}]`).join(',\n');

        const prompt = `A patient is considering booking an appointment with a doctor. Below are the doctor's bio and some reviews from previous patients. Write a short, darkly humorous one-liner or sarcastic comment directed to the patient, as if you're a cynical friend or brutally honest AI summarizing what kind of experience they should expect.
            The line should twist the info from the bio and/or reviews into a single clever joke. You may exaggerate or connect dots ironically, but don’t directly quote the reviews or bio. Use wit, irony, and morbid humor if needed — like you're warning them, playfully.
            Output only the final one-liner. Do not include explanations or extra commentary.
            Doctor's bio: [${bio}]
            Doctor's reviews: ${reviewsText}`;

        return generateSummary(prompt);
    };

    return { generateSummary, generateDoctorRoast, generatePatientRoast, generateDoctorSummaryToPatient };
}
