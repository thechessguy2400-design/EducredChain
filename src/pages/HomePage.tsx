import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Shield,
  FileUp,
  Award,
  Brain,
  Users,
  LockKeyhole,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useWallet } from "../contexts/WalletContext";

// Type definitions
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  bg: string;
  color: string;
}

interface SectionTitleProps {
  title: string;
  desc: string;
}

interface CardProps extends Feature {}

interface BenefitItemProps extends Feature {}

const features = [
  {
    icon: FileUp,
    title: "Upload Credentials",
    desc: "Simply upload your PDF learning credentials to our secure platform for processing.",
    bg: "bg-primary-100",
    color: "text-primary-600",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    desc: "Our AI engine analyzes your credentials, extracts key information, and generates summaries.",
    bg: "bg-secondary-100",
    color: "text-secondary-600",
  },
  {
    icon: Shield,
    title: "Blockchain Verification",
    desc: "Your credentials are securely stored on IPFS and verified with Polygon blockchain NFTs.",
    bg: "bg-accent-100",
    color: "text-accent-600",
  },
];

const benefits = [
  {
    icon: LockKeyhole,
    title: "Tamper-Proof Security",
    desc: "Blockchain technology ensures your credentials cannot be altered or falsified.",
    bg: "bg-primary-100",
    color: "text-primary-600",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Intelligent summaries and question-answering enhance your credential value.",
    bg: "bg-secondary-100",
    color: "text-secondary-600",
  },
  {
    icon: Users,
    title: "Easy Sharing",
    desc: "Share verified credentials with employers or institutions with just a link.",
    bg: "bg-accent-100",
    color: "text-accent-600",
  },
  {
    icon: Award,
    title: "Credential Ownership",
    desc: "Own your credentials as NFTs for true digital ownership.",
    bg: "bg-success-100",
    color: "text-success-600",
  },
];

const SectionTitle = ({ title, desc }: SectionTitleProps) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{desc}</p>
  </div>
);

const Card = ({ icon: Icon, title, desc, bg, color }: CardProps) => (
  <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
    <div className={`w-16 h-16 rounded-full ${bg} dark:bg-opacity-20 flex items-center justify-center mb-6`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

const BenefitItem = ({ icon: Icon, title, desc, bg, color }: BenefitItemProps) => (
  <div className="flex space-x-4 p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300 h-full">
    <div className="flex-shrink-0">
      <div className={`w-12 h-12 rounded-full ${bg} dark:bg-opacity-20 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  </div>
);

const HomePage = () => {
  const { address } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              The Future of Credential Verification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Secure, Verifiable Learning Credentials on the Blockchain
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Transform your educational certificates and credentials into secure, tamper-proof digital assets with the power of blockchain and AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={address ? "/upload" : "#"}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-white ${
                  address
                    ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600'
                    : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                } transition-colors duration-200`}
              >
                {address ? 'Upload Credentials' : 'Connect Wallet to Get Started'}
              </Link>
              <Link
                to="/dashboard"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 border border-primary-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <SectionTitle
            title="How It Works"
            desc="EduCred Chain makes it simple to secure and verify your educational credentials using cutting-edge technology."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <SectionTitle
            title="Why Choose EduCred Chain"
            desc="Experience the next generation of credential verification with these powerful benefits."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Credentials?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join the future of verifiable credentials today. It's free to get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/upload"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium bg-white text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium border-2 border-white text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
