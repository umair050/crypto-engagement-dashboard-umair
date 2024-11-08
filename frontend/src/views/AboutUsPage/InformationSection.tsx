import styled from "styled-components";

export default function InformationSection() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Wrapper>
      <h3>About StrataMind</h3>
      <p>
        With <strong> StrataMind,</strong> you gain access to a powerful social
        intelligence tool that monitors millions of real-time signals across
        platforms like Twitter, Reddit, and Discord. We know that crypto markets
        can turn in seconds, so we deliver insights instantly—empowering you to
        make data-driven decisions that align with the pulse of the market.{" "}
        <br /> Whether you're a seasoned investor, a hedge fund manager, or just
        starting your crypto journey, StrataMind is here to give you the edge.
        We’re committed to continuous innovation, adding new features and
        analytics to keep pace with the ever-evolving digital landscape.
        <br /> Join us, and start turning social signals into your next big
        opportunity.
      </p>

      <p>
        No need to worry about legality for now, I’m hiring a lawyer to go
        through this part as well in few weeks. Terms of Service template: Terms
        of Service
      </p>

      <p>
        <strong>Last Updated:</strong> {currentDate}
      </p>
      <p>
        Welcome to StrataMind! These Terms of Service ("Terms") govern your
        access to and use of the StrataMind platform ("Platform"), including all
        associated features, content, and services provided by StrataMind. By
        using our Platform, you agree to comply with these Terms. Please read
        them carefully.
      </p>

      <Section>
        <strong>1. Acceptance of Terms</strong>
        <br />
        By accessing or using the Platform, you acknowledge that you have read,
        understood, and agree to be bound by these Terms and any applicable laws
        and regulations. If you do not agree to these Terms, please do not use
        our Platform.
      </Section>

      <Section>
        <strong>2. Eligibility</strong>
        <br />
        You must be at least 18 years old or the age of majority in your
        jurisdiction to use StrataMind. By using our services, you represent
        that you meet this age requirement and have the legal capacity to enter
        into these Terms.
      </Section>

      <Section>
        <strong>3. Description of Services</strong>
        <br />
        StrataMind provides a social intelligence platform for crypto markets,
        using engagement scoring, trend detection, and analytics to offer
        insights on cryptocurrency trends based on social media signals.
        StrataMind does not provide financial, investment, or legal advice, and
        any data or insights are for informational purposes only.
      </Section>

      <Section>
        <strong>4. Account Registration</strong>
        <br />
        To access certain features of the Platform, you may be required to
        register an account. You agree to provide accurate and complete
        information during registration and keep your account information
        updated. You are solely responsible for maintaining the confidentiality
        of your account credentials and all activities that occur under your
        account.
      </Section>

      <Section>
        <strong>5. User Conduct</strong>
        <br />
        When using the Platform, you agree not to: <br />• Engage in any
        activity that violates these Terms or applicable laws. <br />
        • Attempt to gain unauthorized access to the Platform or its systems.
        <br />
        • Use the Platform to distribute spam, malware, or engage in any harmful
        activity.
        <br />• Reproduce, duplicate, copy, sell, or exploit any portion of the
        Platform without express permission from StrataMind.
      </Section>

      <Section>
        <strong>6. Subscription and Payment</strong>
        <br />
        Certain features of the Platform may require a paid subscription. By
        subscribing, you agree to the applicable fees, billing cycle, and any
        terms associated with the subscription. All payments are non-refundable,
        except as required by law or as otherwise provided in these Terms.
      </Section>

      <Section>
        <strong>7. Cancellation and Termination</strong>
        <br />
        You may cancel your subscription at any time through your account
        settings. Upon cancellation, you will retain access to the Platform
        until the end of your current billing period, after which your access
        will be restricted to free-tier features, if available. StrataMind
        reserves the right to suspend or terminate your access to the Platform
        for any violation of these Terms.
      </Section>

      <Section>
        <strong>8. Disclaimer of Warranties</strong>
        <br />
        StrataMind is provided "as is" without warranties of any kind. We do not
        guarantee the accuracy, completeness, or reliability of any data,
        insights, or content available on the Platform. Your use of the Platform
        is at your sole risk.
      </Section>

      <Section>
        <strong>9. Limitation of Liability</strong>
        <br />
        To the fullest extent permitted by law, StrataMind and its affiliates
        shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including loss of profits, data, or
        use, arising from your use of or inability to use the Platform.
      </Section>

      <Section>
        <strong>10. Indemnification</strong>
        <br />
        You agree to indemnify, defend, and hold harmless StrataMind and its
        affiliates, officers, directors, and employees from any claims, damages,
        or expenses arising from your use of the Platform or violation of these
        Terms.
      </Section>

      <Section>
        <strong>11. Modifications to Terms</strong>
        <br />
        StrataMind reserves the right to update or modify these Terms at any
        time. We will notify users of significant changes through the Platform
        or via email. Your continued use of the Platform following any changes
        signifies your acceptance of the modified Terms.
      </Section>

      <Section>
        <strong>12. Governing Law</strong>
        <br />
        These Terms are governed by and construed in accordance with the laws of
        [Your Jurisdiction]. Any disputes arising under these Terms shall be
        subject to the exclusive jurisdiction of the courts in [Your
        Jurisdiction].
      </Section>

      <Section>
        <strong>13. Contact Information</strong>
        <br />
        If you have questions about these Terms, please contact us at:{" "}
        <strong>Email:</strong> ryg94@stratamind.io
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
