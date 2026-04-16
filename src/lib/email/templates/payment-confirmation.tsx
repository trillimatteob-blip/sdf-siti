import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PaymentConfirmationEmailProps {
  name: string;
  planName: string;
  amount: string;
  invoiceUrl: string | null;
}

export function PaymentConfirmationEmail({
  name,
  planName,
  amount,
  invoiceUrl,
}: PaymentConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription is active.</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Thanks for your payment, {name}!</Heading>
          <Text style={textStyle}>
            Your <strong>{planName}</strong> subscription is now active. We
            charged <strong>{amount}</strong>.
          </Text>
          <Hr style={{ margin: "24px 0", borderColor: "#eee" }} />
          <Section>
            <Text style={textStyle}>
              You can manage billing, update your card, or cancel anytime from
              your dashboard.
            </Text>
            {invoiceUrl ? (
              <Text style={textStyle}>
                <a href={invoiceUrl} style={{ color: "#111" }}>
                  View invoice
                </a>
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

PaymentConfirmationEmail.PreviewProps = {
  name: "Alex",
  planName: "Pro",
  amount: "$29.00",
  invoiceUrl: "https://example.com/invoice",
} satisfies PaymentConfirmationEmailProps;

export default PaymentConfirmationEmail;

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
