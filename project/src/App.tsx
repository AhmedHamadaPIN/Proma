import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, BookOpen, Sparkles, Building2, DollarSign, FileText, ClipboardList, Hammer, Handshake, Users, MessageSquare, Settings, Rocket, Calendar, BookMarked, Database, BarChart3, Star, MessageCircle, HelpCircle, Shield, Zap, Target } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: 'overview' | 'bp-types' | 'implementation' | 'resources';
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] pb-6' : 'max-h-0'}`}>
        <div className="px-6 border-t border-gray-100 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections: Section[] = [
    { id: 'introduction', title: 'Introduction', icon: <Sparkles className="w-5 h-5" />, category: 'overview' },
    { id: 'about', title: 'About Oracle Unifier', icon: <BookOpen className="w-5 h-5" />, category: 'overview' },
    { id: 'foundations', title: 'Foundations', icon: <Building2 className="w-5 h-5" />, category: 'overview' },
    { id: 'features', title: 'Key Features', icon: <Zap className="w-5 h-5" />, category: 'overview' },
    
    { id: 'cost-bp', title: 'Cost BP', icon: <DollarSign className="w-5 h-5" />, category: 'bp-types' },
    { id: 'document-bp', title: 'Document BP', icon: <FileText className="w-5 h-5" />, category: 'bp-types' },
    { id: 'line-item-bp', title: 'Line Item BP', icon: <ClipboardList className="w-5 h-5" />, category: 'bp-types' },
    { id: 'project-shell-creation-bp', title: 'Project/Shell Creation', icon: <Hammer className="w-5 h-5" />, category: 'bp-types' },
    { id: 'rfb-bp', title: 'Request for Bid (RFB)', icon: <Handshake className="w-5 h-5" />, category: 'bp-types' },
    { id: 'resource-bp', title: 'Resource BP', icon: <Users className="w-5 h-5" />, category: 'bp-types' },
    { id: 'simple-bp', title: 'Simple BP', icon: <Target className="w-5 h-5" />, category: 'bp-types' },
    { id: 'text-bp', title: 'Text BP', icon: <MessageSquare className="w-5 h-5" />, category: 'bp-types' },
    
    { id: 'advanced-config', title: 'Advanced Configuration', icon: <Settings className="w-5 h-5" />, category: 'implementation' },
    { id: 'deployment', title: 'Deployment & Best Practices', icon: <Rocket className="w-5 h-5" />, category: 'implementation' },
    { id: 'project-schedule-managers', title: 'Project & Schedule Managers', icon: <Calendar className="w-5 h-5" />, category: 'implementation' },
    { id: 'data-elements', title: 'Data Elements & Logic', icon: <Database className="w-5 h-5" />, category: 'implementation' },
    
    { id: 'reporting-analytics', title: 'Reporting & Analytics', icon: <BarChart3 className="w-5 h-5" />, category: 'resources' },
    { id: 'testimonials', title: 'Success Stories', icon: <Star className="w-5 h-5" />, category: 'resources' },
    { id: 'faq', title: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, category: 'resources' },
    { id: 'references', title: 'References', icon: <BookMarked className="w-5 h-5" />, category: 'resources' },
  ];

  const categories = {
    overview: { title: 'Overview', color: 'text-blue-600' },
    'bp-types': { title: 'BP Types', color: 'text-green-600' },
    implementation: { title: 'Implementation', color: 'text-purple-600' },
    resources: { title: 'Resources', color: 'text-orange-600' }
  };

  const costDonutData = {
    labels: ['Line items with WBS code', 'Line items with fund code', 'Line items with both', 'Other'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  const costBarData = {
    labels: ['WBS Code', 'Fund Code', 'Both Codes', 'Company Accounts'],
    datasets: [
      {
        label: 'Budget Impact',
        data: [100, 20, 80, 0],
        backgroundColor: '#3B82F6',
        borderRadius: 8
      },
      {
        label: 'Fund Management',
        data: [0, 100, 100, 0],
        backgroundColor: '#93C5FD',
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 12 }
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, beginAtZero: true, display: false }
    }
  };

  const renderContent = () => {
    const contents: Record<string, React.ReactNode> = {
      introduction: (
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Oracle Unifier BP Master Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              This comprehensive guide provides an end-to-end, expert-level explanation of Oracle Unifier Business Processes (BPs), 
              from fundamental concepts to advanced configuration and production deployment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Standardized Workflows</h3>
              <p className="text-gray-600">Automate complex business processes with unprecedented transparency and accountability.</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Efficiency</h3>
              <p className="text-gray-600">Streamline operations and reduce manual processes with intelligent automation.</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Precise Control</h3>
              <p className="text-gray-600">Manage critical project information with granular control and real-time visibility.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is a Business Process?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              In Unifier, a BP is a meticulously designed sequence of coordinated tasks aimed at achieving a specific business objective, 
              like approving a purchase order. The primary user interface is through forms, which collect the "who, what, where, and when" 
              information necessary to drive the process, manage documents, track tasks, and generate reports.
            </p>
          </div>
        </div>
      ),

      about: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Oracle Unifier</h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enterprise Project Management Platform</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Oracle Primavera Unifier is a comprehensive project and portfolio management solution designed for capital program and project-intensive industries. 
                It provides a unified platform for managing all aspects of project delivery, from initial planning through execution and closeout.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Integrated Workflows:</strong> Seamlessly connect all project stakeholders and processes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Real-time Visibility:</strong> Monitor project health and performance across your entire portfolio</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Scalable Architecture:</strong> Support projects of any size and complexity</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Industries</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Construction</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Energy</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Settings className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Manufacturing</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Government</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Oracle Unifier?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Proven Track Record</h3>
                <p className="text-gray-600 text-sm">Trusted by Fortune 500 companies worldwide for mission-critical projects</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 text-sm">Powerful reporting and analytics capabilities for data-driven decisions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Customizable</h3>
                <p className="text-gray-600 text-sm">Highly configurable to meet your organization's unique requirements</p>
              </div>
            </div>
          </div>
        </div>
      ),

      features: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Key Features</h1>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Core Capabilities</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Workflow Automation</h3>
                    <p className="text-gray-600 text-sm">Streamline complex approval processes with intelligent routing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Document Management</h3>
                    <p className="text-gray-600 text-sm">Centralized document control with version management</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Financial Management</h3>
                    <p className="text-gray-600 text-sm">Comprehensive cost tracking and budget management</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advanced Features</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Analytics</h3>
                    <p className="text-gray-600 text-sm">Interactive dashboards and customizable reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Resource Management</h3>
                    <p className="text-gray-600 text-sm">Optimize resource allocation across projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Security & Compliance</h3>
                    <p className="text-gray-600 text-sm">Enterprise-grade security with audit trails</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-800">Basic</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-800">Advanced</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-800">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium">Workflow Automation</td>
                    <td className="py-3 px-4 text-center">✓</td>
                    <td className="py-3 px-4 text-center">✓</td>
                    <td className="py-3 px-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Advanced Analytics</td>
                    <td className="py-3 px-4 text-center">—</td>
                    <td className="py-3 px-4 text-center">✓</td>
                    <td className="py-3 px-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Custom Integrations</td>
                    <td className="py-3 px-4 text-center">—</td>
                    <td className="py-3 px-4 text-center">—</td>
                    <td className="py-3 px-4 text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),

      foundations: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Foundational Concepts</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Every BP is built on fundamental components and concepts that determine its structure, behavior, and control within the Unifier ecosystem.
          </p>
          
          <div className="space-y-6">
            <Accordion title="The Central Role of uDesigner">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  uDesigner is the primary design tool for creating and publishing customized shells, managers, and business processes. 
                  It defines the architecture of automated workflows. Designs are rigorously configured, set up, and thoroughly tested 
                  in dedicated Development and Test environments before they are imported into the Unifier Production environment, 
                  preventing operational disruptions.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800">
                    <strong>Pro Tip:</strong> uDesigner includes a built-in validation feature to check for errors in forms and 
                    configurations (e.g., referenced BPs, picker references, formula definitions) before deployment.
                  </p>
                </div>
              </div>
            </Accordion>

            <Accordion title="Core Components: DDs, DEs, Forms, Workflows, and Logs">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      Data Definitions & Elements
                    </h4>
                    <p className="text-gray-700 text-sm">
                      DDs serve as foundational building blocks, defining data characteristics (type, size, input method). 
                      DEs are the actual fields on forms, governed by DDs. Both are reusable across various components.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      Forms
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Primary user interface components. Can be View (read-only) or Action (editable). 
                      Key types include Upper Form, Detail Form, and Item Logs.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-600" />
                      Workflows
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Define sequential progression, routing, and step behavior of business processes. 
                      They dictate how records are routed between users or groups.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookMarked className="w-5 h-5 text-orange-600" />
                      Logs
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Comprehensive audit trails containing all records created for specific components 
                      throughout their lifecycle, from initial creation to archiving.
                    </p>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="Workflow vs. Non-Workflow BPs">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3">Workflow BPs</h4>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>• Include defined workflow</li>
                    <li>• Sequential progression and approvals</li>
                    <li>• Strict governance</li>
                    <li>• Clear audit trail</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Non-Workflow BPs</h4>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• Primary data storage purpose</li>
                    <li>• No sequential approval process</li>
                    <li>• Examples: contact lists, company info</li>
                    <li>• Simpler structure</li>
                  </ul>
                </div>
              </div>
            </Accordion>

            <Accordion title="Record Status vs. Line Item Status">
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <h4 className="font-semibold text-yellow-800 mb-2">Record Status</h4>
                  <p className="text-yellow-700 text-sm">
                    Indicates the overall position of a form in the BP workflow (e.g., "approved," "pending," "closed"). 
                    Applied by the user at each step to link to the next task.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <h4 className="font-semibold text-green-800 mb-2">Line Item Status</h4>
                  <p className="text-green-700 text-sm">
                    Provides granular control over individual items within a BP form. For example, in a Document BP, 
                    each attached document can have a separate status, allowing independent approval workflows.
                  </p>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      ),

      'cost-bp': (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cost Business Process (BP)</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Cost BPs are the financial engine of Unifier, designed for comprehensive financial tracking and management. 
            They interact directly with the project or shell cost sheet and handle a wide array of financial transactions.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sub-Type Composition</h3>
              <p className="text-sm text-center text-gray-600 mb-6">
                Cost BPs are divided into specialized sub-types to handle different financial dimensions.
              </p>
              <div className="h-80">
                <Doughnut data={costDonutData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Budget vs. Fund Focus</h3>
              <p className="text-sm text-center text-gray-600 mb-6">
                Key distinction between budget impact and fund management focus.
              </p>
              <div className="h-80">
                <Bar data={costBarData} options={barChartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Key Sub-Types Explained</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-800">Sub-Type</th>
                    <th className="text-left p-4 font-semibold text-gray-800">Primary Purpose</th>
                    <th className="text-left p-4 font-semibold text-gray-800">Budget Impact</th>
                    <th className="text-left p-4 font-semibold text-gray-800">Roll-up To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">Commit at company level</td>
                    <td className="p-4 text-gray-700">Track non-WBS costs at company level</td>
                    <td className="p-4 text-gray-600">Independent of budget</td>
                    <td className="p-4 text-gray-600">Company-level tracking</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">Line items with WBS code</td>
                    <td className="p-4 text-gray-700">Track costs related to cost sheet</td>
                    <td className="p-4 text-green-600 font-medium">Directly affects budget</td>
                    <td className="p-4 text-gray-600">Project/Shell Cost Sheet</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">Line items with fund code</td>
                    <td className="p-4 text-gray-700">Manage fund appropriation</td>
                    <td className="p-4 text-blue-600 font-medium">Fund management focus</td>
                    <td className="p-4 text-gray-600">Fund Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Classifications</h4>
              <p className="text-blue-700 text-sm">
                Beyond sub-types, Cost BPs can be categorized by classifications such as Generic, Transfer, Base Commit, 
                Change Commit, General Spends, and Payment Applications. Effective implementation requires meticulous 
                alignment with an organization's financial structure.
              </p>
            </div>
          </div>
        </div>
      ),

      testimonials: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Success Stories</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Discover how organizations worldwide have transformed their project management with Oracle Unifier Business Processes.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                     alt="Sarah Johnson" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                  <p className="text-gray-600 text-sm">Project Director, TechBuild Corp</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "Oracle Unifier's BP system transformed our project delivery process. We reduced approval times by 60% 
                and gained complete visibility into our $500M construction portfolio."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                     alt="Michael Chen" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Michael Chen</h3>
                  <p className="text-gray-600 text-sm">Operations Manager, Energy Solutions Inc</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "The advanced workflow automation in Unifier BPs helped us standardize processes across 15 different 
                project sites. Our compliance reporting is now automated and error-free."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                     alt="Emma Rodriguez" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Emma Rodriguez</h3>
                  <p className="text-gray-600 text-sm">IT Director, Global Manufacturing Ltd</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "Implementing Cost BPs gave us real-time financial visibility we never had before. We can now track 
                every dollar across our global operations with unprecedented accuracy."
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Thousands of Satisfied Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-700">Enterprise Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                <p className="text-gray-700">Uptime Guarantee</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-700">Expert Support</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Start Your Success Story
            </button>
          </div>
        </div>
      ),

      faq: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Find answers to common questions about Oracle Unifier Business Processes and implementation.
          </p>

          <div className="space-y-6">
            <Accordion title="What is the difference between a Business Process and a Manager in Unifier?">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Business Processes (BPs) are workflow-driven forms designed to capture and route specific types of data through 
                  approval processes. Managers, on the other hand, are data storage containers that consolidate information from 
                  multiple sources, including BPs.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Differences:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• BPs focus on workflow and approvals</li>
                    <li>• Managers focus on data aggregation and reporting</li>
                    <li>• BPs typically have multiple records; Managers often have single records</li>
                  </ul>
                </div>
              </div>
            </Accordion>

            <Accordion title="How long does it typically take to implement a Business Process?">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Implementation time varies significantly based on complexity, but here are typical timelines:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800">Simple BP</h4>
                    <p className="text-green-700 text-sm">1-2 weeks</p>
                    <p className="text-green-600 text-xs">Basic forms, linear workflow</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800">Complex BP</h4>
                    <p className="text-yellow-700 text-sm">4-8 weeks</p>
                    <p className="text-yellow-600 text-xs">Multiple forms, advanced logic</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800">Enterprise BP</h4>
                    <p className="text-red-700 text-sm">2-6 months</p>
                    <p className="text-red-600 text-xs">Multiple integrations, custom features</p>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="Can Business Processes integrate with external systems?">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Yes, Oracle Unifier provides several integration options for connecting BPs with external systems:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Web Services API:</strong> RESTful and SOAP APIs for real-time integration</li>
                  <li><strong>Data Exchange Gateway:</strong> Scheduled data synchronization</li>
                  <li><strong>CSV Import/Export:</strong> Bulk data transfer capabilities</li>
                  <li><strong>Third-party Connectors:</strong> Pre-built integrations with popular systems</li>
                </ul>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-700 text-sm">
                    <strong>Note:</strong> Integration complexity depends on the external system's capabilities and 
                    data structure compatibility.
                  </p>
                </div>
              </div>
            </Accordion>

            <Accordion title="What are the security considerations for Business Processes?">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Oracle Unifier provides enterprise-grade security features for protecting your BP data:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Access Control</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Role-based permissions</li>
                      <li>• Field-level security</li>
                      <li>• Step-based access control</li>
                      <li>• Integration with LDAP/AD</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Data Protection</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Encryption at rest and in transit</li>
                      <li>• Comprehensive audit trails</li>
                      <li>• Data backup and recovery</li>
                      <li>• Compliance reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="How do I troubleshoot common BP configuration issues?">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Here's a systematic approach to resolving common BP configuration problems:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 border-l-4 border-blue-400 p-4 rounded">
                    <h4 className="font-semibold text-gray-800 mb-2">1. Validation Errors</h4>
                    <p className="text-gray-700 text-sm">
                      Use uDesigner's built-in validation tool to identify configuration errors before deployment.
                    </p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-green-400 p-4 rounded">
                    <h4 className="font-semibold text-gray-800 mb-2">2. Workflow Issues</h4>
                    <p className="text-gray-700 text-sm">
                      Check step configurations, user assignments, and action conditions in the workflow designer.
                    </p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-purple-400 p-4 rounded">
                    <h4 className="font-semibold text-gray-800 mb-2">3. Data Picker Problems</h4>
                    <p className="text-gray-700 text-sm">
                      Verify source BP configurations, query conditions, and data element mappings.
                    </p>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our expert team is here to help you succeed with Oracle Unifier implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      ),

      'document-bp': (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Document Business Process (BP)</h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Document BPs function as a digital "envelope" to package and manage a set of files that need to flow 
            systematically from one group or department to another within the project or organization.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Key Characteristics & Sub-Types</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Core Features</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Individual Status Control:</strong> Each file attached as a line item can be approved 
                      or rejected independently within the same package.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Common Use Cases:</strong> Ideal for managing Submittals and Transmittals where 
                      multiple documents are formally bundled for review.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">Sub-Types Comparison</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-800">With Folder Structure</h5>
                    <p className="text-blue-700 text-sm">Maintains original hierarchy and organization</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-800">Without Folder Structure</h5>
                    <p className="text-blue-700 text-sm">Creates flat list of documents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),

      references: (
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">References & Resources</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Access comprehensive documentation, training materials, and community resources to master Oracle Unifier Business Processes.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Official Documentation</h2>
              <div className="space-y-4">
                <a href="https://docs.oracle.com/en/industries/construction-engineering/primavera-unifier/" 
                   className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                  <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-900">Primavera Unifier Documentation</h3>
                    <p className="text-gray-600 text-sm">Complete technical documentation and user guides</p>
                  </div>
                </a>
                <a href="https://docs.oracle.com/cd/E73815_01/index.html" 
                   className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group">
                  <Settings className="w-6 h-6 text-green-600 group-hover:text-green-700" />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-900">uDesigner User Guide</h3>
                    <p className="text-gray-600 text-sm">Step-by-step configuration and design instructions</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Learning Resources</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Oracle University</h3>
                    <p className="text-gray-600 text-sm">Certified training courses and certifications</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Forums</h3>
                    <p className="text-gray-600 text-sm">Connect with other Unifier professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Video Tutorials</h3>
                    <p className="text-gray-600 text-sm">Visual guides and best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Need Expert Guidance?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our certified Oracle Unifier consultants can help accelerate your implementation 
                and ensure best practices are followed from day one.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )
    };

    // Add placeholder content for missing sections
    const defaultSections = [
      'line-item-bp', 'project-shell-creation-bp', 'rfb-bp', 'resource-bp', 
      'simple-bp', 'text-bp', 'advanced-config', 'deployment', 
      'project-schedule-managers', 'data-elements', 'reporting-analytics'
    ];

    defaultSections.forEach(sectionId => {
      if (!contents[sectionId]) {
        const section = sections.find(s => s.id === sectionId);
        contents[sectionId] = (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{section?.title}</h1>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
              {section?.icon && <div className="text-6xl mb-6 opacity-50">{section.icon}</div>}
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Content Coming Soon</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Detailed information about {section?.title} will be added here. 
                This section will cover comprehensive guidelines, best practices, and implementation details.
              </p>
            </div>
          </div>
        );
      }
    });

    return contents[activeSection] || contents.introduction;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Oracle Unifier BP Guide</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-white border-r border-gray-200 z-40 transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 flex flex-col h-full">
            <nav className="flex-1">
              {Object.entries(categories).map(([categoryKey, category]) => (
                <div key={categoryKey} className="mb-8">
                  <h3 className={`text-xs uppercase font-bold mb-3 ${category.color} px-2`}>{category.title}</h3>
                  <div className="space-y-1">
                    {sections.filter(section => section.category === categoryKey).map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {section.icon}
                        <span className="text-sm">{section.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            
            <div className="border-t border-gray-200 pt-4 text-center">
              <p className="text-sm text-gray-500">Created by Ahmed Hamada</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 p-6 lg:p-12">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;