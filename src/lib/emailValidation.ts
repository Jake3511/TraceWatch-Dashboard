export async function abstractEmailCheck(email: string): Promise<boolean> {
    // Hit Abstract's email validation API.
    const checkEmail = await fetch(`${process.env.ABSTRACT_API_KEY}${encodeURIComponent(email)}`);

    // Parse the response so we can inspect the validation fields.
    const emailData = await checkEmail.json();

    // Basic sanity checks: format must be valid, SMTP must confirm it exists,
    // and we skip disposable emails entirely.
    if (
        !emailData.is_valid_format.value ||
        !emailData.is_smtp_valid.value ||
        emailData.is_disposable_email.value
    ) {
        return false;
    }

    return true;
}
