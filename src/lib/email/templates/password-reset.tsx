import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetUrl: string;
}

export function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your SaaS Starter password</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Reset your password</Heading>
          <Text style={textStyle}>
            Someone — hopefully you — requested a password reset for your SaaS
            Starter account. Click the button below to choose a new password.
          </Text>
          <Section style={{ margin: "32px 0" }}>
            <Button href={resetUrl} style={buttonStyle}>
              Reset password
            </Button>
          </Section>
          <Text style={mutedStyle}>
            This link expires in 1 hour. If you didn&apos;t request a reset,
            you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

PasswordResetEmail.PreviewProps = {
  resetUrl: "https://example.com/reset",
} satisfies PasswordResetEmailProps;

export default PasswordResetEmail;

const bodyStyle = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};
const containerStyle = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "32px",
  borderRadius: "12px",
  maxWidth: "560px",
};
const headingStyle = { fontSize: "22px", color: "#111", margin: "0 0 16px" };
const textStyle = { fontSize: "16px", color: "#333", lineHeight: "24px" };
const mutedStyle = { fontSize: "13px", color: "#888", marginTop: "24px" };
const buttonStyle = {
  backgroundColor: "#111",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
};
