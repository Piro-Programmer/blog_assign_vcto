export default function AboutPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">About BlogApp</h1>

          <div className="prose prose-lg">
            {/* Intro */}
            <p className="text-lg text-gray-600 mb-6">
              Welcome to BlogApp, a modern blogging platform built with
              cutting-edge web technologies.
            </p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to provide a seamless and engaging platform for
              writers and readers to connect, share ideas, and explore diverse
              content. We believe in the power of words to inspire, educate, and
              bring people together.
            </p>

            {/* Tech Stack */}
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <p className="mb-4">
              This application is built with modern web technologies to ensure
              the best performance and user experience:
            </p>

            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Next.js 14</strong> - React framework with App Router
              </li>
              <li>
                <strong>Redux Toolkit</strong> - State management
              </li>
              <li>
                <strong>Redux-Saga</strong> - Async handling
              </li>
              <li>
                <strong>Tailwind CSS</strong> - Styling
              </li>
              <li>
                <strong>shadcn/ui</strong> - UI components
              </li>
              <li>
                <strong>DummyJSON API</strong> - Backend data
              </li>
            </ul>

            {/* Features */}
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>

            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>User authentication</li>
              <li>Browse and read blog posts</li>
              <li>Comment system</li>
              <li>Responsive design</li>
              <li>Protected routes</li>
              <li>SEO optimization</li>
            </ul>

            {/* Get Started */}
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>

            <p className="mb-6">
              To experience all features, log in with the test credentials
              provided on the login page. Once authenticated, you'll have access
              to comment on posts and access the dashboard.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
