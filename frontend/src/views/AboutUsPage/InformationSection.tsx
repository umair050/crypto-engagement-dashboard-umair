import styled from "styled-components";

export default function InformationSection() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Wrapper>
      <h3>About Info</h3>
      <p>
        StrataMind, you gain access to a powerful social intelligence tool that
        monitors millions of real-time signals across platforms like Twitter,
        Reddit, and Discord. We know that crypto markets can turn in seconds, so
        we deliver insights instantly—empowering you to make data-driven
        decisions that align with the pulse of the market. Whether you're a
        seasoned investor, a hedge fund manager, or just starting your crypto
        journey, StrataMind is here to give you the edge. We’re committed to
        continuous innovation, adding new features and analytics to keep pace
        with the ever-evolving digital landscape. Join us, and start turning
        social signals into your next big opportunity.
      </p>
      <p>
        No need to worry about legality for now, I’m hiring a lawyer to go
        through this part as well in few weeks. Terms of Service template: Terms
        of Service
      </p>

      <p>Last Updated: {currentDate}</p>

      <p>
        1. Acceptance of Terms By accessing or using the Platform, you
        acknowledge that you have read, understood, and agree to be bound by
        these Terms and any applicable laws and regulations. If you do not agree
        to these Terms, please do not use our Platform.
      </p>

      <p>
        2. Eligibility You must be at least 18 years old or the age of majority
        in your jurisdiction to use StrataMind. By using our services, you
        represent that you meet this age requirement and have the legal capacity
        to enter into these Terms.
      </p>

      <p>
        3. Description of Services StrataMind provides a social intelligence
        platform for crypto markets, using engagement scoring, trend detection,
        and analytics to offer insights on cryptocurrency trends based on social
        media signals. StrataMind does not provide financial, investment, or
        legal advice, and any data or insights are for informational purposes
        only.
      </p>

      <p>
        4. Account Registration To access certain features of the Platform, you
        may be required to register an account. You agree to provide accurate
        and complete information during registration and keep your account
        information updated. You are solely responsible for maintaining the
        confidentiality of your account credentials and all activities that
        occur under your account.
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
        6. Subscription and Payment Certain features of the Platform may require
        a paid subscription. By subscribing, you agree to the applicable fees,
        billing cycle, and any terms associated with the subscription. All
        payments are non-refundable, except as required by law or as otherwise
        provided in these Terms.
      </p>
      <p>
        7. Cancellation and Termination You may cancel your subscription at any
        time through your account settings. Upon cancellation, you will retain
        access to the Platform until the end of your current billing period,
        after which your access will be restricted to free-tier features, if
        available. StrataMind reserves the right to suspend or terminate your
        access to the Platform for any violation of these Terms.
      </p>
      <p>
        8. Disclaimer of Warranties StrataMind is provided "as is" without
        warranties of any kind. We do not guarantee the accuracy, completeness,
        or reliability of any data, insights, or content available on the
        Platform. Your use of the Platform is at your sole risk.
      </p>
      <p>
        9. Limitation of Liability To the fullest extent permitted by law,
        StrataMind and its affiliates shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, including loss
        of profits, data, or use, arising from your use of or inability to use
        the Platform.
      </p>

      <p>
        10. Indemnification You agree to indemnify, defend, and hold harmless
        StrataMind and its affiliates, officers, directors, and employees from
        any claims, damages, or expenses arising from your use of the Platform
        or violation of these Terms.
      </p>
      <p>
        11. Modifications to Terms StrataMind reserves the right to update or
        modify these Terms at any time. We will notify users of significant
        changes through the Platform or via email. Your continued use of the
        Platform following any changes signifies your acceptance of the modified
        Terms.
      </p>
      <p>
        12. Governing Law These Terms are governed by and construed in
        accordance with the laws of [Your Jurisdiction]. Any disputes arising
        under these Terms shall be subject to the exclusive jurisdiction of the
        courts in [Your Jurisdiction].
      </p>
      <p>
        13. Contact Information If you have questions about these Terms, please
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
