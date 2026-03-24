import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  XMarkIcon,
  DocumentTextIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowRightIcon,
  PaintBrushIcon,
  MinusIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const templates = [
  {
    id: 1,
    name: 'Professional',
    description: 'Clean and modern design perfect for corporate roles',
    icon: BriefcaseIcon,
    category: 'Professional',
    templateKey: 'modern',
    preview: '/templates/professional.png',
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Stand out with this unique and creative layout',
    icon: SparklesIcon,
    category: 'Creative',
    templateKey: 'creative',
    preview: '/templates/creative.png',
  },
  {
    id: 3,
    name: 'Academic',
    description: 'Ideal for research and academic positions',
    icon: AcademicCapIcon,
    category: 'Academic',
    templateKey: 'classic',
    preview: '/templates/academic.png',
  },
  {
    id: 4,
    name: 'Simple',
    description: 'Minimalist design focusing on content',
    icon: DocumentTextIcon,
    category: 'Simple',
    templateKey: 'minimalist',
    preview: '/templates/simple.png',
  },
  {
    id: 5,
    name: 'Modern',
    description: 'Contemporary design with clean typography',
    icon: DocumentTextIcon,
    category: 'Modern',
    templateKey: 'modern',
    preview: '/templates/modern.png',
  },
  {
    id: 6,
    name: 'Classic',
    description: 'Traditional layout with professional styling',
    icon: DocumentTextIcon,
    category: 'Classic',
    templateKey: 'classic',
    preview: '/templates/classic.png',
  },
  {
    id: 7,
    name: 'Sidebar',
    description: 'Two-column layout with sidebar navigation',
    icon: DocumentTextIcon,
    category: 'Layout',
    templateKey: 'sidebar',
    preview: '/templates/sidebar.png',
  },
  {
    id: 8,
    name: 'Minimalist',
    description: 'Clean and simple design with lots of white space',
    icon: MinusIcon,
    category: 'Minimalist',
    templateKey: 'minimalist',
    preview: '/templates/minimalist.png',
  },
  {
    id: 9,
    name: 'Executive',
    description: 'Formal design perfect for senior-level positions',
    icon: StarIcon,
    category: 'Executive',
    templateKey: 'executive',
    preview: '/templates/executive.png',
  },
];

const Templates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [brokenPreviews, setBrokenPreviews] = useState({});

  const categories = ['All', ...new Set(templates.map(t => t.category))];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplateId(template.id);
    setTimeout(() => {
      navigate(`/create?template=${template.templateKey}`);
    }, 150); // slight delay to show highlight
  };

  const isDuplicateCategoryLabel = (template) =>
    template.name.toLowerCase() === template.category.toLowerCase();

  const getFallbackPreviewClass = (templateKey) => {
    switch (templateKey) {
      case 'modern':
        return 'bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300';
      case 'classic':
        return 'bg-gradient-to-br from-slate-100 via-gray-200 to-zinc-300';
      case 'creative':
        return 'bg-gradient-to-br from-fuchsia-100 via-purple-200 to-indigo-300';
      case 'minimalist':
        return 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300';
      case 'executive':
        return 'bg-gradient-to-br from-amber-100 via-yellow-200 to-orange-300';
      case 'sidebar':
        return 'bg-gradient-to-br from-teal-100 via-emerald-200 to-green-300';
      default:
        return 'bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Choose Your Resume Template
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Select from our professionally designed templates to create your perfect resume
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTemplateId(template.id)}
              onDoubleClick={() => setPreviewTemplate(template)}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                selectedTemplateId === template.id ? 'border-blue-400 ring-2 ring-blue-400' : 'border-gray-100 dark:border-gray-700'
              }`}
              tabIndex={0}
              role="button"
              aria-pressed={selectedTemplateId === template.id}
            >
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                {!brokenPreviews[template.id] ? (
                  <img
                    src={template.preview}
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() =>
                      setBrokenPreviews((prev) => ({ ...prev, [template.id]: true }))
                    }
                  />
                ) : (
                  <div className={`w-full h-full ${getFallbackPreviewClass(template.templateKey)}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <template.icon className="w-12 h-12 text-white/85 absolute bottom-3 right-3" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  {!isDuplicateCategoryLabel(template) && (
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      {template.category}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {template.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(template);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Preview
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200"
                  >
                    Use
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <DocumentTextIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {previewTemplate && (
          <div
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <div
              className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {previewTemplate.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {previewTemplate.description}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Close preview"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                </button>
              </div>
              <div className="p-5">
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  {!brokenPreviews[previewTemplate.id] ? (
                    <img
                      src={previewTemplate.preview}
                      alt={`${previewTemplate.name} full preview`}
                      className="w-full h-auto object-cover"
                      onError={() =>
                        setBrokenPreviews((prev) => ({ ...prev, [previewTemplate.id]: true }))
                      }
                    />
                  ) : (
                    <div
                      className={`min-h-[340px] w-full ${getFallbackPreviewClass(
                        previewTemplate.templateKey
                      )} flex items-center justify-center`}
                    >
                      <div className="text-center text-gray-700">
                        <previewTemplate.icon className="w-14 h-14 mx-auto mb-3 text-gray-700/70" />
                        <p className="font-semibold">{previewTemplate.name} Preview</p>
                        <p className="text-sm opacity-80">Image asset missing, using style placeholder</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-5 flex gap-3 justify-end">
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleTemplateSelect(previewTemplate)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates; 