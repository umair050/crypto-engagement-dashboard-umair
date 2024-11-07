import styled from "styled-components";

export default function PrivacyPolicySection() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Wrapper>
      <h3>Privacy Policy Information</h3>

      <p>
        <strong>Last Updated:</strong> {currentDate} <br />
        StrataMind ("we," "us," or "our") is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, share, and
        safeguard your personal information when you use the StrataMind platform
        (the "Platform"). By using the Platform, you consent to the practices
        described in this policy.
      </p>

      <Section>
        <strong>1. Information We Collect</strong>
        <br />
        We collect information to provide and improve our Platform, communicate
        with you, and comply with legal requirements. Types of information
        include: <br />• <strong>Personal Information:</strong> Name, email,
        payment details, etc., provided during registration or contact.
        <br />• <strong>Usage Information:</strong> Data on how you interact
        with the Platform, including IP address, device and browser type, pages
        visited, etc.
        <br />• <strong>Cookies and Tracking:</strong> We use cookies, web
        beacons, and similar technologies to enhance user experience,
        personalize content, and analyze Platform performance. Manage cookie
        preferences in your browser settings.
      </Section>

      <Section>
        <strong>2. How We Use Your Information</strong>
        <br />
        We use the information collected for the following purposes: <br />•{" "}
        <strong>To Provide and Improve the Platform:</strong> Account creation,
        transaction processing, and delivering relevant features.
        <br />• <strong>To Communicate:</strong> Account updates, promotions,
        and Platform changes. Opt-out of marketing communications anytime.
        <br />• <strong>Security and Compliance:</strong> Fraud prevention,
        monitoring compliance with Terms of Service, and fulfilling legal
        obligations.
      </Section>

      <Section>
        <strong>3. How We Share Your Information</strong>
        <br />
        We may share your information in the following circumstances: <br />•{" "}
        <strong>With Service Providers:</strong> Third-party vendors for payment
        processing, support, and analytics who handle your information securely.
        <br />• <strong>For Legal and Safety Reasons:</strong> If required by
        law, or to protect StrataMind’s rights and respond to valid legal
        requests.
        <br />• <strong>With Your Consent:</strong> Sharing information with
        third parties when you provide consent.
      </Section>

      <Section>
        <strong>4. Data Security</strong>
        <br />
        We implement administrative, technical, and physical security measures
        to protect personal information. However, no data transmission or
        storage is completely secure. We strive to protect your information but
        cannot guarantee absolute security.
      </Section>

      <Section>
        <strong>5. Data Retention</strong>
        <br />
        We retain personal information as long as necessary to fulfill its
        purpose, comply with legal obligations, resolve disputes, and enforce
        agreements. When no longer needed, information is securely deleted or
        anonymized.
      </Section>

      <Section>
        <strong>6. Your Privacy Rights</strong>
        <br />
        Depending on your jurisdiction, you may have rights over your personal
        information, including: <br />• <strong>Access:</strong> Request access
        to your personal data.
        <br />• <strong>Correction:</strong> Update or correct inaccurate
        information.
        <br />• <strong>Deletion:</strong> Request deletion of personal
        information.
        <br />• <strong>Opt-Out:</strong> Opt-out of marketing communications.
        <br />
        To exercise these rights, contact us at ryg94@stratamind.io.
        Verification of identity may be required.
      </Section>

      <Section>
        <strong>7. International Data Transfers</strong>
        <br />
        If located outside [Your Company’s Primary Location], note that we may
        transfer your data internationally, taking appropriate measures to
        ensure protection of personal data.
      </Section>

      <Section>
        <strong>8. Third-Party Links</strong>
        <br />
        Our Platform may link to third-party sites. We are not responsible for
        the privacy practices of these sites. Review their privacy policies
        before sharing information.
      </Section>

      <Section>
        <strong>9. Changes to This Privacy Policy</strong>
        <br />
        We may update this Privacy Policy to reflect changes in practices or
        legal requirements. Significant changes will be notified via the
        Platform or email. Continued use of the Platform signifies acceptance of
        revised policy.
      </Section>

      <Section>
        <strong>10. Contact Us</strong>
        <br />
        For questions or concerns about this Privacy Policy, please contact us
        at: <strong>Email:</strong> ryg94@stratamind.io
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  margin-right: 3rem;
  margin-bottom: 3rem;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-weight: normal;
    font-size: 1.6rem;
    color: rgba(var(--text), 0.7);
    padding: 8px 0px;
    line-height: 3rem;
  }

  span {
    opacity: 1;
    color: rgba(var(--text), 1);
  }
`;

const Section = styled.p`
  font-weight: normal;
  font-size: 1.6rem;
  color: rgba(var(--text), 0.8);
  padding: 12px 0px;
  line-height: 2.8rem;

  strong {
    font-weight: bold;
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
