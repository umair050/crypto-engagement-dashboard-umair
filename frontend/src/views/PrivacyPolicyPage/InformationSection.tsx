import styled from "styled-components";

export default function InformationSection() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Wrapper>
      <h3>Privacy Policy Info</h3>

      <p>
        Last Updated: {currentDate} <br /> StrataMind ("we," "us," or "our") is
        committed to protecting your privacy. This Privacy Policy explains how
        we collect, use, share, and safeguard your personal information when you
        use the StrataMind platform (the "Platform"). By using the Platform, you
        consent to the practices described in this policy.
      </p>
      <p>
        1. Information We Collect <br /> We collect information to provide and
        improve our Platform, to communicate with you, and to comply with legal
        requirements. The types of information we collect include: <br />
        Personal Information: When you register an account, subscribe, or
        contact us, we may collect information such as your name, email address,
        payment details, and any other information you provide. Usage
        Information: We collect information on how you interact with the
        Platform, including IP addresses, device and browser type, pages
        visited, and actions taken. <br />
        Cookies and Similar Technologies: We use cookies, web beacons, and other
        tracking technologies to enhance user experience, personalize content,
        and analyze Platform performance. You can manage your cookie preferences
        in your browser settings.
      </p>

      <p>
        2. How We Use Your Information <br /> We use the information we collect
        for the following purposes: <br />
        To Provide and Improve the Platform: We use your information to create
        and manage your account, process transactions, and deliver relevant
        features and content. To Communicate with You: We may send you emails
        about your account, including updates, promotions, and Platform changes.
        You may opt out of marketing communications at any time. <br />
        For Security and Compliance: We use information to detect and prevent
        fraud, monitor compliance with our Terms of Service, and comply with
        legal obligations.
      </p>

      <p>
        3. How We Share Your Information <br /> We may share your information in
        the following circumstances: <br />
        With Service Providers: We may share information with third-party
        vendors who perform services on our behalf, such as payment processing,
        customer support, and analytics. These providers are obligated to handle
        your information securely and only for the purposes specified. For Legal
        and Safety Reasons: We may disclose information if required by law, to
        protect the rights, safety, and property of StrataMind, or to respond to
        valid legal requests from public authorities. <br /> With Your Consent:
        We may share information with third parties if you provide consent to do
        so.
      </p>

      <p>
        4. Data Security <br /> We implement reasonable administrative,
        technical, and physical security measures to protect your personal
        information. However, no data transmission over the internet or storage
        system is completely secure. While we strive to use acceptable means to
        protect your information, we cannot guarantee its absolute security.
      </p>

      <p>
        5. Data Retention <br /> We retain personal information as long as
        necessary to fulfill the purposes for which it was collected, comply
        with legal obligations, resolve disputes, and enforce our agreements.
        When we no longer need your information, we will securely delete or
        anonymize it.
      </p>

      <p>
        6. Your Privacy Rights <br /> Depending on your jurisdiction, you may
        have certain rights regarding your personal information, such as: <br />
        Access: Request access to the personal data we hold about you.
        Correction: Request that we correct or update inaccurate information.
        Deletion: Request the deletion of your personal information. Opt-Out:
        Opt-out of marketing communications and certain data processing
        activities. <br /> To exercise any of these rights, please contact us at
        ryg94@stratamind.io. <br /> We may need to verify your identity before
        fulfilling your request.
      </p>

      <p>
        5. User Conduct When using the Platform, you agree not to: <br /> Engage
        in any activity that violates these Terms or applicable laws. Attempt to
        gain unauthorized access to the Platform or its systems. Use the
        Platform to distribute spam, malware, or engage in any harmful activity.{" "}
        <br />
        Reproduce, duplicate, copy, sell, or exploit any portion of the Platform
        without express permission from StrataMind.
      </p>

      <p>
        7. International Data Transfers <br />
        If you are located outside [Your Company’s Primary Location], please
        note that we may transfer your information to countries with different
        data protection laws. We take appropriate measures to ensure that your
        personal data remains protected.
      </p>
      <p>
        8. Third-Party Links <br />
        The Platform may contain links to third-party websites or services.
        StrataMind is not responsible for the privacy practices of these third
        parties. We encourage you to read the privacy policies of any external
        websites you visit.
      </p>
      <p>
        9. Changes to This Privacy Policy <br />
        We may update this Privacy Policy periodically to reflect changes in our
        practices or legal requirements. We will notify you of significant
        updates via the Platform or by email. Your continued use of the Platform
        following the updates signifies your acceptance of the revised policy.
      </p>
      <p>
        10. Contact Us <br />
        If you have questions or concerns about this Privacy Policy, please
        contact us at: Email: ryg94@stratamind.io
      </p>
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
