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
        We collect information to provide and improve our Platform, to
        communicate with you, and to comply with legal requirements. The types
        of information we collect include: <br />•{" "}
        <strong>Personal Information:</strong> When you register an account,
        subscribe, or contact us, we may collect information such as your name,
        email address, payment details, and any other information you provide.
        <br />• <strong>Usage Information:</strong> We collect information on
        how you interact with the Platform, including IP addresses, device and
        browser type, pages visited, and actions taken.
        <br />• <strong>Cookies and Similar Technologies:</strong> We use
        cookies, web beacons, and other tracking technologies to enhance user
        experience, personalize content, and analyze Platform performance. You
        can manage your cookie preferences in your browser settings.
      </Section>

      <Section>
        <strong>2. How We Use Your Information</strong>
        <br />
        We use the information we collect for the following purposes: <br />•{" "}
        <strong>To Provide and Improve the Platform:</strong> We use your
        information to create and manage your account, process transactions, and
        deliver relevant features and content.
        <br />• <strong>To Communicate with You:</strong> We may send you emails
        about your account, including updates, promotions, and Platform changes.
        You may opt out of marketing communications at any time.
        <br />• <strong>For Security and Compliance:</strong> We use information
        to detect and prevent fraud, monitor compliance with our Terms of
        Service, and comply with legal obligations.
      </Section>

      <Section>
        <strong>3. How We Share Your Information</strong>
        <br />
        We may share your information in the following circumstances: <br />•{" "}
        <strong>With Service Providers:</strong> We may share information with
        third-party vendors who perform services on our behalf, such as payment
        processing, customer support, and analytics. These providers are
        obligated to handle your information securely and only for the purposes
        specified.
        <br />• <strong>For Legal and Safety Reasons:</strong> We may disclose
        information if required by law, to protect the rights, safety, and
        property of StrataMind, or to respond to valid legal requests from
        public authorities.
        <br />• <strong>With Your Consent:</strong> We may share information
        with third parties if you provide consent to do so.
      </Section>

      <Section>
        <strong>4. Data Security</strong>
        <br />
        We implement reasonable administrative, technical, and physical security
        measures to protect your personal information. However, no data
        transmission over the internet or storage system is completely secure.
        While we strive to use acceptable means to protect your information, we
        cannot guarantee its absolute security.
      </Section>

      <Section>
        <strong>5. Data Retention</strong>
        <br />
        We retain personal information as long as necessary to fulfill the
        purposes for which it was collected, comply with legal obligations,
        resolve disputes, and enforce our agreements. When we no longer need
        your information, we will securely delete or anonymize it.
      </Section>

      <Section>
        <strong>6. Your Privacy Rights</strong>
        <br />
        Depending on your jurisdiction, you may have certain rights regarding
        your personal information, such as: <br />• <strong>
          Access:
        </strong>{" "}
        Request access to the personal data we hold about you.
        <br />• <strong>Correction:</strong> Request that we correct or update
        inaccurate information.
        <br />• <strong>Deletion:</strong> Request the deletion of your personal
        information.
        <br />• <strong>Opt-Out:</strong> Opt-out of marketing communications
        and certain data processing activities.
        <br />
        To exercise any of these rights, please contact us at
        ryg94@stratamind.io. We may need to verify your identity before
        fulfilling your request.
      </Section>

      <Section>
        <strong>7. International Data Transfers</strong>
        <br />
        If you are located outside [Your Company’s Primary Location], please
        note that we may transfer your information to countries with different
        data protection laws. We take appropriate measures to ensure that your
        personal data remains protected.
      </Section>

      <Section>
        <strong>8. Third-Party Links</strong>
        <br />
        The Platform may contain links to third-party websites or services.
        StrataMind is not responsible for the privacy practices of these third
        parties. We encourage you to read the privacy policies of any external
        websites you visit.
      </Section>

      <Section>
        <strong>9. Changes to This Privacy Policy</strong>
        <br />
        We may update this Privacy Policy periodically to reflect changes in our
        practices or legal requirements. We will notify you of significant
        updates via the Platform or by email. Your continued use of the Platform
        following the updates signifies your acceptance of the revised policy.
      </Section>

      <Section>
        <strong>10. Contact Us</strong>
        <br />
        If you have questions or concerns about this Privacy Policy, please
        contact us at: <strong>Email:</strong> ryg94@stratamind.io
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
