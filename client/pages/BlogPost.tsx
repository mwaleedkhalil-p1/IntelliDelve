import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Eye,
  CheckCircle,
  Shield,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { SEO } from "../components/SEO";

const BlogPost = () => {
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const blogPosts = {
    "1": {
      id: 1,
      title: "What are Background Checks and Why are They Important?",
      excerpt: "Discover the comprehensive guide to background checks, their types, legal requirements, and why they're crucial for protecting your business and making informed hiring decisions.",
      author: "IntelliDelve Team",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Background Screening",
      image: "/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg",
      tags: ["Background Checks", "Employment Screening", "Risk Management", "Compliance"],
      views: "2.4k",
      content: `
        <h2>Understanding Background Checks: The Foundation of Safe Hiring</h2>
        <p>Background checks are systematic investigations into an individual's personal, professional, and criminal history. They serve as a critical tool for employers, landlords, and organizations to verify information and assess potential risks before making important decisions.</p>

        <h3>Types of Background Checks</h3>
        <p>There are several types of background checks, each serving different purposes:</p>
        <ul>
          <li><strong>Criminal Background Checks:</strong> Search for criminal records at local, state, and federal levels</li>
          <li><strong>Employment Verification:</strong> Confirms previous employment history and job performance</li>
          <li><strong>Education Verification:</strong> Validates educational credentials and degrees</li>
          <li><strong>Credit Checks:</strong> Reviews financial history and creditworthiness</li>
          <li><strong>Reference Checks:</strong> Contacts provided references to verify character and work ethic</li>
        </ul>

        <h3>Why Background Checks Are Essential</h3>
        <p>The importance of background checks cannot be overstated in today's business environment:</p>

        <h4>1. Legal Protection</h4>
        <p>Conducting thorough background checks helps protect your organization from negligent hiring lawsuits. Courts have held employers liable for the actions of employees when they failed to conduct reasonable pre-employment screening.</p>

        <h4>2. Workplace Safety</h4>
        <p>Background checks help identify individuals with a history of violence, theft, or other concerning behaviors that could pose risks to other employees, customers, or company property.</p>

        <h4>3. Financial Security</h4>
        <p>For positions involving financial responsibilities, background checks can reveal past instances of fraud, embezzlement, or financial irresponsibility that could indicate future risks.</p>

        <h4>4. Regulatory Compliance</h4>
        <p>Many industries have specific requirements for background screening. Healthcare, finance, education, and transportation sectors often mandate certain types of checks.</p>

        <h3>Best Practices for Background Screening</h3>
        <p>To maximize the effectiveness of your background screening program:</p>
        <ul>
          <li>Develop clear, consistent policies for all positions</li>
          <li>Ensure compliance with federal and state laws (FCRA, EEOC guidelines)</li>
          <li>Use reputable screening providers with proper accreditation</li>
          <li>Maintain confidentiality and secure handling of sensitive information</li>
          <li>Provide candidates with proper disclosures and obtain written consent</li>
        </ul>

        <h3>The Cost of Not Conducting Background Checks</h3>
        <p>The financial and reputational costs of negligent hiring can be devastating. Studies show that companies can face:</p>
        <ul>
          <li>Legal settlements averaging $1.6 million for negligent hiring cases</li>
          <li>Increased insurance premiums and potential coverage denial</li>
          <li>Loss of customer trust and brand reputation damage</li>
          <li>Decreased employee morale and increased turnover</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Background checks are not just a best practice—they're a business necessity. By implementing comprehensive screening procedures, organizations can protect themselves legally, financially, and reputationally while creating safer work environments for all employees.</p>

        <p>At IntelliDelve, we provide comprehensive background screening solutions tailored to your industry and specific needs. Our advanced technology and expert team ensure accurate, compliant, and timely results to support your hiring decisions.</p>
      `
    },
    "2": {
      id: 2,
      title: "Why Companies Lose Money When They Don't Conduct Background Checks",
      excerpt: "Learn about the hidden costs of negligent hiring, including legal liabilities, workplace incidents, and reputation damage that can cost companies millions.",
      author: "Sarah Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Risk Management",
      image: "/images/downloaded/unsplash-photo-1451187580459-43490279c0fa.jpg",
      tags: ["Cost Analysis", "Risk Management", "Legal Compliance", "Business Protection"],
      views: "1.8k",
      content: `
        <h2>The Hidden Costs of Skipping Background Checks</h2>
        <p>Many companies view background checks as an unnecessary expense, but the reality is that failing to conduct proper screening can cost businesses far more than the investment in comprehensive background verification.</p>

        <h3>Direct Financial Losses</h3>

        <h4>1. Negligent Hiring Lawsuits</h4>
        <p>The average settlement for negligent hiring cases is $1.6 million, with some cases reaching tens of millions. Companies can be held liable when:</p>
        <ul>
          <li>An employee with a criminal history harms a coworker or customer</li>
          <li>A driver with a poor driving record causes an accident</li>
          <li>An employee with a history of theft steals from the company or clients</li>
        </ul>

        <h4>2. Employee Theft and Fraud</h4>
        <p>According to the Association of Certified Fraud Examiners, organizations lose 5% of their annual revenue to fraud. Employee theft costs include:</p>
        <ul>
          <li>Direct financial losses from stolen money, inventory, or intellectual property</li>
          <li>Investigation costs and legal fees</li>
          <li>Increased security measures and monitoring systems</li>
          <li>Time spent on internal investigations and documentation</li>
        </ul>

        <h4>3. Workplace Violence Incidents</h4>
        <p>Workplace violence costs employers billions annually through:</p>
        <ul>
          <li>Medical expenses and workers' compensation claims</li>
          <li>Lost productivity and business interruption</li>
          <li>Increased security measures and training programs</li>
          <li>Legal fees and potential settlements</li>
        </ul>

        <h3>Indirect Costs and Long-term Impact</h3>

        <h4>1. Reputation Damage</h4>
        <p>A single incident involving an improperly screened employee can devastate a company's reputation:</p>
        <ul>
          <li>Loss of customer trust and loyalty</li>
          <li>Negative media coverage and social media backlash</li>
          <li>Difficulty attracting top talent</li>
          <li>Reduced market value and investor confidence</li>
        </ul>

        <h4>2. Increased Insurance Premiums</h4>
        <p>Insurance companies may:</p>
        <ul>
          <li>Raise premiums after incidents involving unscreened employees</li>
          <li>Deny coverage for companies with poor screening practices</li>
          <li>Require additional security measures as policy conditions</li>
        </ul>

        <h4>3. Employee Morale and Turnover</h4>
        <p>Poor hiring decisions affect the entire workforce:</p>
        <ul>
          <li>Good employees may leave due to unsafe or uncomfortable work environments</li>
          <li>Increased recruitment and training costs for replacement staff</li>
          <li>Reduced productivity and team cohesion</li>
          <li>Higher absenteeism and stress-related health issues</li>
        </ul>

        <h3>Industry-Specific Risks</h3>

        <h4>Healthcare</h4>
        <p>Healthcare organizations face unique risks including patient safety concerns, regulatory violations, and potential loss of accreditation.</p>

        <h4>Financial Services</h4>
        <p>Banks and financial institutions risk regulatory fines, loss of licenses, and customer financial losses from fraudulent employees.</p>

        <h4>Education</h4>
        <p>Schools and universities must protect students and maintain their reputation, with incidents potentially leading to enrollment drops and funding losses.</p>

        <h3>The ROI of Background Screening</h3>
        <p>While background checks require an upfront investment, the return on investment is substantial:</p>
        <ul>
          <li>Prevention of costly legal settlements</li>
          <li>Reduced employee theft and fraud</li>
          <li>Lower insurance premiums</li>
          <li>Improved workplace safety and morale</li>
          <li>Enhanced company reputation and customer trust</li>
        </ul>

        <h3>Conclusion</h3>
        <p>The question isn't whether you can afford to conduct background checks—it's whether you can afford not to. The costs of negligent hiring far exceed the investment in proper screening, making background checks one of the most cost-effective risk management tools available to businesses.</p>

        <p>Protect your business with IntelliDelve's comprehensive background screening solutions. Our expert team helps you implement cost-effective screening programs that protect your organization while ensuring compliance with all applicable laws.</p>
      `
    },
    "3": {
      id: 3,
      title: "The Complete Guide to Pre-Employment Screening in 2024",
      excerpt: "Stay updated with the latest trends, technologies, and legal requirements in pre-employment screening. Essential reading for HR professionals and business owners.",
      author: "Michael Chen",
      date: "2024-01-05",
      readTime: "12 min read",
      category: "Employment Screening",
      image: "/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg",
      tags: ["Pre-Employment", "HR Technology", "Screening Process", "2024 Trends"],
      views: "3.1k",
      content: `
        <h2>Pre-Employment Screening in 2024: What's New and What Matters</h2>
        <p>The landscape of pre-employment screening continues to evolve rapidly, driven by technological advances, changing regulations, and shifting workplace dynamics. This comprehensive guide covers everything HR professionals and business owners need to know about modern screening practices.</p>

        <h3>Key Trends Shaping Pre-Employment Screening in 2024</h3>

        <h4>1. AI-Powered Screening Technologies</h4>
        <p>Artificial intelligence is revolutionizing background screening through:</p>
        <ul>
          <li>Automated data collection and verification</li>
          <li>Predictive analytics for risk assessment</li>
          <li>Natural language processing for document analysis</li>
          <li>Machine learning algorithms for pattern recognition</li>
        </ul>

        <h4>2. Real-Time Verification</h4>
        <p>Modern screening platforms now offer:</p>
        <ul>
          <li>Instant identity verification</li>
          <li>Real-time database searches</li>
          <li>Continuous monitoring capabilities</li>
          <li>Mobile-friendly candidate experiences</li>
        </ul>

        <h4>3. Enhanced Compliance Features</h4>
        <p>New tools help ensure compliance with:</p>
        <ul>
          <li>Fair Credit Reporting Act (FCRA) requirements</li>
          <li>Equal Employment Opportunity Commission (EEOC) guidelines</li>
          <li>State and local ban-the-box laws</li>
          <li>International data privacy regulations</li>
        </ul>

        <h3>Essential Components of Modern Pre-Employment Screening</h3>

        <h4>1. Identity Verification</h4>
        <p>Confirming candidate identity through:</p>
        <ul>
          <li>Government-issued ID verification</li>
          <li>Social Security number validation</li>
          <li>Address history verification</li>
          <li>Biometric authentication where appropriate</li>
        </ul>

        <h4>2. Criminal History Checks</h4>
        <p>Comprehensive criminal screening includes:</p>
        <ul>
          <li>County-level criminal searches</li>
          <li>State criminal database searches</li>
          <li>Federal criminal searches</li>
          <li>Sex offender registry checks</li>
          <li>International criminal searches when relevant</li>
        </ul>

        <h4>3. Employment and Education Verification</h4>
        <p>Validating candidate credentials through:</p>
        <ul>
          <li>Direct employer contact and verification</li>
          <li>Educational institution verification</li>
          <li>Professional license validation</li>
          <li>Certification and training verification</li>
        </ul>

        <h4>4. Reference Checks</h4>
        <p>Modern reference checking includes:</p>
        <ul>
          <li>Structured interview processes</li>
          <li>Digital reference platforms</li>
          <li>360-degree feedback collection</li>
          <li>Behavioral assessment integration</li>
        </ul>

        <h3>Legal Considerations and Compliance</h3>

        <h4>Fair Credit Reporting Act (FCRA) Compliance</h4>
        <p>Key FCRA requirements include:</p>
        <ul>
          <li>Proper disclosure and authorization forms</li>
          <li>Adverse action procedures</li>
          <li>Dispute resolution processes</li>
          <li>Record retention requirements</li>
        </ul>

        <h4>Ban-the-Box Legislation</h4>
        <p>Many jurisdictions now require:</p>
        <ul>
          <li>Delaying criminal history inquiries until later in the hiring process</li>
          <li>Individualized assessments of criminal history</li>
          <li>Consideration of job-relatedness and business necessity</li>
          <li>Opportunity for candidates to provide context</li>
        </ul>

        <h4>International Considerations</h4>
        <p>For global organizations:</p>
        <ul>
          <li>GDPR compliance for European operations</li>
          <li>Country-specific privacy laws</li>
          <li>Cross-border data transfer restrictions</li>
          <li>Local screening practices and limitations</li>
        </ul>

        <h3>Best Practices for 2024</h3>

        <h4>1. Develop Comprehensive Policies</h4>
        <ul>
          <li>Create position-specific screening requirements</li>
          <li>Establish clear decision-making criteria</li>
          <li>Document all screening procedures</li>
          <li>Regular policy reviews and updates</li>
        </ul>

        <h4>2. Invest in Technology</h4>
        <ul>
          <li>Choose platforms with strong compliance features</li>
          <li>Prioritize user-friendly candidate experiences</li>
          <li>Ensure integration with existing HR systems</li>
          <li>Implement continuous monitoring where appropriate</li>
        </ul>

        <h4>3. Focus on Candidate Experience</h4>
        <ul>
          <li>Provide clear communication throughout the process</li>
          <li>Offer mobile-friendly screening options</li>
          <li>Minimize time-to-completion</li>
          <li>Maintain transparency about screening requirements</li>
        </ul>

        <h4>4. Train Your Team</h4>
        <ul>
          <li>Regular compliance training for HR staff</li>
          <li>Decision-maker training on fair hiring practices</li>
          <li>Updates on changing laws and regulations</li>
          <li>Best practices for handling sensitive information</li>
        </ul>

        <h3>Measuring Success</h3>

        <h4>Key Performance Indicators</h4>
        <ul>
          <li>Time-to-hire metrics</li>
          <li>Screening completion rates</li>
          <li>Candidate satisfaction scores</li>
          <li>Quality of hire measurements</li>
          <li>Compliance audit results</li>
        </ul>

        <h3>Looking Ahead: Future Trends</h3>
        <p>Emerging trends to watch:</p>
        <ul>
          <li>Blockchain-based credential verification</li>
          <li>Enhanced social media screening tools</li>
          <li>Predictive analytics for hiring success</li>
          <li>Increased focus on soft skills assessment</li>
          <li>Integration with diversity and inclusion initiatives</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Pre-employment screening in 2024 requires a balance of advanced technology, legal compliance, and human judgment. Organizations that invest in comprehensive, compliant screening programs will be better positioned to make informed hiring decisions while protecting their business interests.</p>

        <p>IntelliDelve stays at the forefront of screening technology and compliance requirements. Our platform combines cutting-edge AI with expert human oversight to deliver accurate, compliant, and efficient screening solutions for modern businesses.</p>
      `
    }
  };

  const currentPost = blogPosts[id as keyof typeof blogPosts];

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }

    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current.children,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link to="/blogs" className="text-primary hover:text-primary/80">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${currentPost.title} | IntelliDelve Blog`}
        description={currentPost.excerpt}
        keywords={currentPost.tags.join(", ")}
        canonicalUrl={`/blogs/${id}`}
      />

      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          <div className="mb-6">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentPost.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {currentPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{currentPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(currentPost.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{currentPost.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{currentPost.views} views</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Share2 className="w-4 h-4" />
              Share Article
            </button>
            <div className="flex gap-2">
              {currentPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            <div className="lg:col-span-3">
              <div className="mb-8">
                <img
                  src={currentPost.image}
                  alt={currentPost.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              <div
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-primary dark:prose-a:text-sky-300"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />

              <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-brand-navy/50 dark:to-purple-900/50 rounded-2xl p-8">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-primary dark:text-sky-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Implement Professional Background Screening?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Get expert guidance and comprehensive screening solutions tailored to your business needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Get Free Consultation
                    </Link>
                    <Link
                      to="/what-we-offer"
                      className="inline-flex items-center gap-2 border border-primary text-primary dark:text-sky-300 px-6 py-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-sky-300 dark:hover:text-brand-navy transition-colors font-medium"
                    >
                      <BookOpen className="w-5 h-5" />
                      Explore Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div ref={sidebarRef} className="space-y-8">

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {Object.values(blogPosts)
                      .filter(post => post.id !== currentPost.id)
                      .slice(0, 2)
                      .map((post) => (
                        <Link
                          key={post.id}
                          to={`/blogs/${post.id}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-sky-300 transition-colors line-clamp-2 text-sm">
                                {post.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {post.readTime}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Expert Help?</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Get personalized guidance on implementing background screening for your organization.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm w-full justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Contact Our Experts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
