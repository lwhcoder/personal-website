import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy | lwh" },
    { name: "description", content: "Privacy policy for lwh.codes - How we handle your data and protect your privacy" },
    { name: "robots", content: "index, follow" },
  ];
}

export default function Privacy() {
  const lastUpdated = "January 1, 2025";

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Legal</p>
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-medium">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how lwh.codes ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website. We are committed to ensuring that your privacy is protected and that any information you provide is handled responsibly.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Information We Collect</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Information You Provide</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Email address (when you subscribe to our newsletter)</li>
                  <li>• Name and contact information (when you fill out the contact form)</li>
                  <li>• Any other information you choose to provide</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Automatically Collected Information</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browser type and version</li>
                  <li>• Operating system</li>
                  <li>• IP address</li>
                  <li>• Pages visited and time spent on pages</li>
                  <li>• Referring website addresses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">How We Use Your Information</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• To send you our newsletter (only if you've subscribed)</li>
                <li>• To respond to your inquiries and contact requests</li>
                <li>• To improve our website and user experience</li>
                <li>• To analyze website traffic and usage patterns</li>
                <li>• To detect and prevent fraud or abuse</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Remember your theme preference (dark/light mode)</li>
                <li>• Analyze website traffic and usage</li>
                <li>• Improve website functionality</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can control cookies through your browser settings. However, disabling cookies may affect your experience on our website.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Data Sharing and Third Parties</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Service providers who help us operate our website and newsletter service</li>
                <li>• Analytics providers to understand website usage</li>
                <li>• Legal authorities when required by law</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Any third parties we work with are required to keep your information secure and confidential.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Your Rights</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Access the personal information we hold about you</li>
                <li>• Request correction of inaccurate information</li>
                <li>• Request deletion of your personal information</li>
                <li>• Unsubscribe from our newsletter at any time</li>
                <li>• Object to processing of your personal information</li>
                <li>• Request data portability</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us at contact@lwh.codes
              </p>
            </div>
          </section>

          {/* Newsletter */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Newsletter</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you subscribe to our newsletter, we will use your email address to send you updates about new projects, blog posts, and tech insights. You can unsubscribe at any time by clicking the unsubscribe link in any newsletter email or by contacting us directly.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4 border-t pt-12">
            <h2 className="text-2xl font-medium">Contact Us</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: contact@lwh.codes</p>
                <p>Website: <a href="/" className="text-foreground hover:underline">lwh.codes</a></p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-32 border-t pt-20 text-center">
          <p className="mb-6 text-muted-foreground">
            Have questions about our privacy practices?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm transition-colors hover:bg-muted"
          >
            Get in touch
          </a>
        </div>
      </div>
    </main>
  );
}
