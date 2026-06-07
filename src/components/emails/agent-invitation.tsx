import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
} from '@react-email/components';

interface AgentInvitationEmailProps {
  newMemberName: string;
  agentName: string;
  magicLink: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const AgentInvitationEmail = ({
  newMemberName,
  agentName,
  magicLink,
}: AgentInvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>You've been invited to join a team on AAFare!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
            <Heading style={h1}>AAFare</Heading>
        </Section>
        <Heading style={h1}>You're Invited!</Heading>
        <Text style={text}>
          Hello {newMemberName},
        </Text>
        <Text style={text}>
          {agentName} has invited you to join their team on AAFare. Click the button below to accept the invitation, set up your account, and start your journey with us.
        </Text>

        <Section style={buttonContainer}>
            <Link style={button} href={magicLink}>
                Accept Invitation & Complete Profile
            </Link>
        </Section>
        
        <Text style={text}>
          This link is valid for 24 hours and can only be used once. If you did not expect this invitation, you can safely ignore this email.
        </Text>
        
        <Text style={text}>
          Best,
          <br />
          The AAFare Team
        </Text>
        <Section style={footer}>
          <Text style={footerText}>
            © {new Date().getFullYear()} AAFare, Inc. All Rights Reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AgentInvitationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const logoContainer = {
    textAlign: 'center' as const,
    padding: '20px 0',
    borderBottom: '1px solid #f0f0f0',
};

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 20px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#007bff',
  borderRadius: '5px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
  border: '1px solid #007bff',
};

const footer = {
  borderTop: '1px solid #f0f0f0',
  padding: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '15px',
};
