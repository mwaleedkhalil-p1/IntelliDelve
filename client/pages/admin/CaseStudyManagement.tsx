import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ArrowLeft,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { 
  useCaseStudies, 
  useCreateCaseStudy 
} from '../../hooks/useApi';
import { CaseStudy, CaseStudyFilters } from '../../services/apiService';
import { SEO } from '../../components/SEO';
import RichTextEditor from '../../components/ui/rich-text-editor';
import { processRichTextContent } from '../../utils/contentSanitizer';
import { verifyContentIntegrity, runContentVerificationSuite } from '../../utils/contentVerification';

// UI Components
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '../../components/ui/alert-dialog';

const CaseStudyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<CaseStudy>>({
    title: '',
    client: '',
    industry: '',
    challenge: '',
    solution: '',
    results: '',
    status: 'draft',
    tags: [],
    testimonial: { quote: '', author: '', position: '' },
    metrics: [{ metric: '', label: '', improvement: '' }],
  });

  // API filters
  const filters: CaseStudyFilters = {
    page: currentPage,
    search: searchQuery.trim() || undefined,
    limit: 10,
  };

  // Fetch case studies from API
  const { 
    data: caseStudiesResponse, 
    isLoading, 
    error, 
    refetch 
  } = useCaseStudies(filters);

  // Mutations
  const createCaseStudyMutation = useCreateCaseStudy();

  // Get case studies from API response and normalize UUID field
  const rawCaseStudies = caseStudiesResponse?.success ? caseStudiesResponse.data.data : [];
  const caseStudies = (rawCaseStudies || []).map((cs: any) => ({
    ...cs,
    uuid: cs.uuid || cs.id, // Ensure we have a uuid field
  }));
  const totalPages = caseStudiesResponse?.success ? Math.ceil(caseStudiesResponse.data.total / (caseStudiesResponse.data.limit || 10)) : 1;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rich text editor changes
  const handleRichTextChange = (field: 'challenge' | 'solution' | 'results' | 'content', content: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: content
    }));
  };

  // Handle tags input (comma separated)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  // Handle metrics input
  const handleMetricsChange = (index: number, field: 'metric' | 'label' | 'improvement', value: string) => {
    setFormData(prev => {
      const updated = [...(prev.metrics || [])];
      if (!updated[index]) {
        updated[index] = { metric: '', label: '', improvement: '' };
      }
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, metrics: updated };
    });
  };

  // Add new metric
  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...(prev.metrics || []), { metric: '', label: '', improvement: '' }]
    }));
  };

  // Remove metric
  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== index)
    }));
  };

  // Handle testimonial input
  const handleTestimonialChange = (field: 'quote' | 'author' | 'position', value: string) => {
    setFormData(prev => ({
      ...prev,
      testimonial: { ...(prev.testimonial || { quote: '', author: '', position: '' }), [field]: value }
    }));
  };

  // Open create dialog
  const openCreateDialog = () => {
    setFormData({
      title: '',
      client: '',
      industry: '',
      challenge: '',
      solution: '',
      results: '',
      status: 'draft',
      tags: [],
      testimonial: { quote: '', author: '', position: '' },
      metrics: [{ metric: '', label: '', improvement: '' }],
    });
    setIsCreateDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setFormData({
      title: caseStudy.title || '',
      client: caseStudy.client || '',
      industry: caseStudy.industry || '',
      challenge: caseStudy.challenge || '',
      solution: caseStudy.solution || '',
      results: caseStudy.results || '',
      status: caseStudy.status || 'draft',
      tags: caseStudy.tags || [],
      testimonial: caseStudy.testimonial || { quote: '', author: '', position: '' },
      metrics: caseStudy.metrics || [{ metric: '', label: '', improvement: '' }],
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsDeleteDialogOpen(true);
  };

  // Handle create case study
  const handleCreateCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data according to API docs - process rich text content
    const caseStudyData = {
      title: formData.title || '',
      client: formData.client || '',
      industry: formData.industry || '',
      challenge: processRichTextContent(formData.challenge || ''),
      solution: processRichTextContent(formData.solution || ''),
      results: processRichTextContent(formData.results || ''),
      status: formData.status || 'draft',
      tags: formData.tags || [],
      testimonial: formData.testimonial || { quote: '', author: '', position: '' },
      metrics: (formData.metrics || []).filter(m => m.metric || m.label || m.improvement)
    };

    // Verify content integrity in development mode
    if (process.env.NODE_ENV === 'development') {
      verifyContentIntegrity('casestudy', {
        challenge: caseStudyData.challenge,
        solution: caseStudyData.solution,
        results: caseStudyData.results
      });
    }

    createCaseStudyMutation.mutate(caseStudyData as any, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        // No need to call refetch() - the mutation handles cache invalidation automatically
      }
    });
  };

  // Handle update case study
  const handleUpdateCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseStudy?.uuid) return;

    // Prepare data according to API docs - process rich text content
    const caseStudyData = {
      title: formData.title,
      client: formData.client,
      industry: formData.industry,
      challenge: processRichTextContent(formData.challenge || ''),
      solution: processRichTextContent(formData.solution || ''),
      results: processRichTextContent(formData.results || ''),
      status: formData.status,
      tags: formData.tags,
      testimonial: formData.testimonial,
      metrics: (formData.metrics || []).filter(m => m.metric || m.label || m.improvement)
    };

    // Verify content integrity in development mode
    if (process.env.NODE_ENV === 'development') {
      verifyContentIntegrity('casestudy', {
        challenge: caseStudyData.challenge,
        solution: caseStudyData.solution,
        results: caseStudyData.results
      });
    }

    updateCaseStudyMutation.mutate(
      { uuid: selectedCaseStudy.uuid, caseStudy: caseStudyData },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          // No need to call refetch() - the mutation handles cache invalidation automatically
        }
      }
    );
  };

  // Handle delete case study
  const handleDeleteCaseStudy = () => {
    if (!selectedCaseStudy?.uuid) return;
    
    deleteCaseStudyMutation.mutate(selectedCaseStudy.uuid, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        // No need to call refetch() - the mutation handles cache invalidation automatically
      }
    });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // The useCaseStudies hook will automatically refetch when filters change due to the dependency array
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SEO
        title="Case Study Management | IntelliDelve Admin"
        description="Manage case studies for IntelliDelve"
        noindex={true}
      />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Case Study Management</h1>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Case Study
        </Button>
        {process.env.NODE_ENV === 'development' && (
          <Button 
            variant="outline" 
            onClick={() => runContentVerificationSuite()}
            className="ml-2"
          >
            Verify Content
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <Card className="mb-6 p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </Card>

      {/* Case Studies Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading case studies...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 text-red-500">
            <AlertTriangle className="h-8 w-8 mr-2" />
            <span>Error loading case studies. Please try again.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStudies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No case studies found. Create your first case study!
                    </TableCell>
                  </TableRow>
                ) : (
                  caseStudies.map((caseStudy) => (
                    <TableRow key={caseStudy.uuid}>
                      <TableCell className="font-medium">{caseStudy.title}</TableCell>
                      <TableCell>{caseStudy.client}</TableCell>
                      <TableCell>{caseStudy.industry}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          caseStudy.status === 'published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        }`}>
                          {caseStudy.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(caseStudy.tags || []).slice(0, 2).map((tag: string, index: number) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800">
                              {tag}
                            </span>
                          ))}
                          {(caseStudy.tags || []).length > 2 && (
                            <span className="text-xs text-gray-500">+{(caseStudy.tags || []).length - 2} more</span>
                          )}
                        </div>
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </Card>

      {/* Create Case Study Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Case Study
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Create a detailed case study to showcase your success stories and build credibility with potential clients.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCaseStudy} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Case Study Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., How We Helped TechCorp Increase Security by 300%"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Client Name *
                    </label>
                    <Input
                      id="client"
                      name="client"
                      value={formData.client || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Client or company name"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Industry *
                    </label>
                    <Input
                      id="industry"
                      name="industry"
                      value={formData.industry || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Technology, Healthcare, Finance"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Publication Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status || 'draft'}
                      onChange={handleInputChange}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      value={(formData.tags || []).join(', ')}
                      onChange={handleTagsChange}
                      placeholder="AI, ML, Security, Performance"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
                Case Study Content
              </h3>
              
              {/* Challenge Section */}
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <span className="text-red-600 dark:text-red-400 font-semibold">Challenge *</span>
                  <span className="text-gray-500 ml-2">What problem did the client face?</span>
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                  <RichTextEditor
                    value={formData.challenge || ''}
                    onChange={(content) => handleRichTextChange('challenge', content)}
                    placeholder="Describe the client's challenge in detail. What obstacles were they facing? What was at stake? Be specific about pain points..."
                    height={250}
                    className="editor-enhanced"
                  />
                </div>
              </div>

              {/* Solution Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Solution *</span>
                  <span className="text-gray-500 ml-2">How did you solve their problem?</span>
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                  <RichTextEditor
                    value={formData.solution || ''}
                    onChange={(content) => handleRichTextChange('solution', content)}
                    placeholder="Explain your approach and methodology. What specific strategies, tools, or processes did you implement? Include technical details..."
                    height={250}
                    className="editor-enhanced"
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <label htmlFor="results" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <span className="text-green-600 dark:text-green-400 font-semibold">Results & Impact *</span>
                  <span className="text-gray-500 ml-2">What were the measurable outcomes?</span>
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                  <RichTextEditor
                    value={formData.results || ''}
                    onChange={(content) => handleRichTextChange('results', content)}
                    placeholder="Detail the specific results achieved. Include metrics, improvements, ROI, and long-term benefits. Use numbers and percentages where possible..."
                    height={250}
                    className="editor-enhanced"
                  />
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
                Testimonial & Metrics
              </h3>
              
              {/* Testimonial Section */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="text-md font-semibold text-yellow-800 dark:text-yellow-300 mb-4">
                  Client Testimonial (Optional)
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="testimonial-quote" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Testimonial Quote
                    </label>
                    <textarea
                      id="testimonial-quote"
                      value={formData.testimonial?.quote || ''}
                      onChange={(e) => handleTestimonialChange('quote', e.target.value)}
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Add a powerful client testimonial here. This adds credibility and social proof to your case study..."
                      rows={5}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="testimonial-author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Author Name
                      </label>
                      <Input
                        id="testimonial-author"
                        value={formData.testimonial?.author || ''}
                        onChange={(e) => handleTestimonialChange('author', e.target.value)}
                        placeholder="e.g., John Smith"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="testimonial-position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Position & Company
                      </label>
                      <Input
                        id="testimonial-position"
                        value={formData.testimonial?.position || ''}
                        onChange={(e) => handleTestimonialChange('position', e.target.value)}
                        placeholder="e.g., CEO, TechCorp Inc."
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h4 className="text-md font-semibold text-indigo-800 dark:text-indigo-300 mb-4">
                  Performance Metrics (Optional)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Add quantifiable metrics that showcase the impact of your solution. These will be displayed prominently in the case study.
                </p>
                
                <div className="space-y-4">
                  {(formData.metrics || []).map((metric, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <label htmlFor={`metric-metric-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Value
                          </label>
                          <Input
                            id={`metric-metric-${index}`}
                            value={metric.metric}
                            onChange={(e) => handleMetricsChange(index, 'metric', e.target.value)}
                            placeholder="85%"
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`metric-label-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Metric Label
                          </label>
                          <Input
                            id={`metric-label-${index}`}
                            value={metric.label}
                            onChange={(e) => handleMetricsChange(index, 'label', e.target.value)}
                            placeholder="Efficiency Increase"
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`metric-improvement-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                          </label>
                          <Input
                            id={`metric-improvement-${index}`}
                            value={metric.improvement}
                            onChange={(e) => handleMetricsChange(index, 'improvement', e.target.value)}
                            placeholder="vs previous year"
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => removeMetric(index)}
                            disabled={(formData.metrics || []).length === 1}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addMetric}
                    className="w-full mt-4 border-dashed border-2 border-indigo-300 dark:border-indigo-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Performance Metric
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createCaseStudyMutation.isPending}>
                {createCaseStudyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Case Study'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Case Study Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Case Study</DialogTitle>
            <DialogDescription>
              Update the case study details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCaseStudy}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-title" className="text-right font-medium">
                  Title *
                </label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-client" className="text-right font-medium">
                  Client *
                </label>
                <Input
                  id="edit-client"
                  name="client"
                  value={formData.client || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-industry" className="text-right font-medium">
                  Industry *
                </label>
                <Input
                  id="edit-industry"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right font-medium">
                  Status *
                </label>
                <select
                  id="edit-status"
                  name="status"
                  value={formData.status || 'draft'}
                  onChange={handleInputChange}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-tags" className="text-right font-medium">
                  Tags
                </label>
                <Input
                  id="edit-tags"
                  name="tags"
                  value={(formData.tags || []).join(', ')}
                  onChange={handleTagsChange}
                  className="col-span-3"
                  placeholder="AI, ML"
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="edit-challenge" className="block text-sm font-medium mb-2">
                  Challenge *
                </label>
                <RichTextEditor
                  value={formData.challenge || ''}
                  onChange={(content) => handleRichTextChange('challenge', content)}
                  placeholder="Describe the challenge..."
                  height={200}
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="edit-solution" className="block text-sm font-medium mb-2">
                  Solution *
                </label>
                <RichTextEditor
                  value={formData.solution || ''}
                  onChange={(content) => handleRichTextChange('solution', content)}
                  placeholder="Describe the solution..."
                  height={200}
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="edit-results" className="block text-sm font-medium mb-2">
                  Results *
                </label>
                <RichTextEditor
                  value={formData.results || ''}
                  onChange={(content) => handleRichTextChange('results', content)}
                  placeholder="Describe the results..."
                  height={200}
                />
              </div>

              {/* Testimonial Section */}
              <div className="col-span-4">
                <h3 className="font-medium text-lg mb-2">Testimonial</h3>
                <div className="border p-4 rounded-md space-y-4">
                  <div>
                    <label htmlFor="edit-testimonial-quote" className="text-sm font-medium mb-1 block">
                      Quote
                    </label>
                    <textarea
                      id="edit-testimonial-quote"
                      value={formData.testimonial?.quote || ''}
                      onChange={(e) => handleTestimonialChange('quote', e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Amazing!"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-testimonial-author" className="text-sm font-medium mb-1 block">
                        Author
                      </label>
                      <Input
                        id="edit-testimonial-author"
                        value={formData.testimonial?.author || ''}
                        onChange={(e) => handleTestimonialChange('author', e.target.value)}
                        placeholder="CEO"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-testimonial-position" className="text-sm font-medium mb-1 block">
                        Position
                      </label>
                      <Input
                        id="edit-testimonial-position"
                        value={formData.testimonial?.position || ''}
                        onChange={(e) => handleTestimonialChange('position', e.target.value)}
                        placeholder="CTO"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Section */}
              <div className="col-span-4">
                <h3 className="font-medium text-lg mb-2">Metrics</h3>
                {(formData.metrics || []).map((metric, index) => (
                  <div key={index} className="grid grid-cols-8 gap-4 mb-4 items-end">
                    <div className="col-span-2">
                      <label htmlFor={`edit-metric-metric-${index}`} className="text-sm font-medium mb-1 block">
                        Metric
                      </label>
                      <Input
                        id={`edit-metric-metric-${index}`}
                        value={metric.metric}
                        onChange={(e) => handleMetricsChange(index, 'metric', e.target.value)}
                        placeholder="CTR"
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor={`edit-metric-label-${index}`} className="text-sm font-medium mb-1 block">
                        Label
                      </label>
                      <Input
                        id={`edit-metric-label-${index}`}
                        value={metric.label}
                        onChange={(e) => handleMetricsChange(index, 'label', e.target.value)}
                        placeholder="Click Rate"
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor={`edit-metric-improvement-${index}`} className="text-sm font-medium mb-1 block">
                        Improvement
                      </label>
                      <Input
                        id={`edit-metric-improvement-${index}`}
                        value={metric.improvement}
                        onChange={(e) => handleMetricsChange(index, 'improvement', e.target.value)}
                        placeholder="30%"
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => removeMetric(index)}
                        disabled={(formData.metrics || []).length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addMetric}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Metric
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateCaseStudyMutation.isPending}>
                {updateCaseStudyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Case Study'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case study
              <strong> "{selectedCaseStudy?.title}"</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCaseStudy}
              disabled={deleteCaseStudyMutation.isPending}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {deleteCaseStudyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseStudyManagement;