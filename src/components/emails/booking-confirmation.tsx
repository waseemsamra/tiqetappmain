
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
  Row,
  Column,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  bookingId: string;
  bookingReference: string;
  bookingDate: Date;
  excursionName: string;
  excursionImage: string;
  customerEmail: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const BookingConfirmationEmail = ({
  bookingId,
  bookingReference,
  bookingDate,
  excursionName,
  excursionImage,
  customerEmail,
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your AAFare Booking Confirmation for {excursionName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
            <Heading style={h1}>AAFare</Heading>
        </Section>
        <Heading style={h1}>Your Booking is Confirmed!</Heading>
        <Text style={text}>
          Hello there,
        </Text>
        <Text style={text}>
          Thank you for booking with AAFare! We're excited to have you on board for an unforgettable experience. Here are the details of your booking:
        </Text>

        <Section style={{ margin: '20px 0', padding: '0 20px' }}>
          <Img
            src={excursionImage.startsWith('http') ? excursionImage : `${baseUrl}${excursionImage}`}
            width="100%"
            alt={excursionName}
            style={image}
          />
        </Section>

        <Section style={detailsContainer}>
            <Heading as="h2" style={h2}>{excursionName}</Heading>
            <Row style={detailRow}>
                <Column style={detailHeader}>Booking Reference</Column>
                <Column style={detailValue}>{bookingReference}</Column>
            </Row>
            <Row style={detailRow}>
                <Column style={detailHeader}>Booking Date</Column>
                <Column style={detailValue}>
                  {new Date(bookingDate).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </Column>
            </Row>
        </Section>

        <Text style={text}>
          You can view your booking details and voucher online at any time by clicking the button below. Please keep this confirmation for your records. If you have any questions, please don't hesitate to contact our support team.
        </Text>

        <Section style={buttonContainer}>
            <Link style={button} href={`${baseUrl}/booking/${bookingId}`}>
                View Your Booking Details
            </Link>
        </Section>
        
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

export default BookingConfirmationEmail;

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

const h2 = {
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 20px',
};

const image = {
  borderRadius: '5px',
  margin: '0 auto',
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: '16/9',
  objectFit: 'cover' as const,
};

const detailsContainer = {
    padding: '20px',
    border: '1px solid #eaeaea',
    borderRadius: '5px',
    margin: '0 20px',
};

const detailRow = {
    paddingTop: '10px',
    paddingBottom: '10px',
};

const detailHeader = {
    fontSize: '14px',
    color: '#555',
    width: '30%',
};

const detailValue = {
    fontSize: '14px',
    color: '#000',
    fontWeight: 'bold' as const,
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
