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

interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ name, dashboardUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaaS Starter — let&apos;s get you set up.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Welcome, {name}!</Heading>
          <Text style={textStyle}>
            Thanks for signing up. You&apos;re on the Free plan — plenty to
            explore while you decide if Pro is right for you.
          </Text>
          <Section style={{ margin: "32px 0" }}>
            <Button href={dashboardUrl} style={buttonStyle}>
              Open your dashboard
            </Button>
          </Section>
          <Text style={mutedStyle}>
            If you didn&apos;t create this account, you can safely ignore this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  name: "Alex",
  dashboardUrl: "https://example.com/dashboard",
} satisfies WelcomeEmailProps;

export default WelcomeEmail;

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
const headingStyle = { fontSize: "24px", color: "#111", margin: "0 0 16px" };
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
