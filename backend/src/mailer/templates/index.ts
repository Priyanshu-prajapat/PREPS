export function verificationTemplate(username: string, code: string) {
    return `<!doctype html>
        <html>
            <body>
                <p><b>Hello ${username},</b></p>
                <p>
                    Thank you for signing up! Please verify your email address by clicking the link below:
                </p>
                <p>
                    <a href="http://localhost:5000/auth/verify/${code}" style="color: #fff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Verify Email
                    </a>
                </p>
                <p>
                    If you did not sign up for this account, you can ignore this email.
                </p>
                <p>
                    Best regards,<br/>
                    The Team
                </p>
            </body>
        </html>`
}