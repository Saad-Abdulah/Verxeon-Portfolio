'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Trash2, X, CheckCircle, Clock, MessageSquare, AlertCircle, Archive, Loader2, Mail, Building, User, FileText, Calendar, Reply, Send, Paperclip, Smile, Bold, Italic, Link, List, Quote, Undo, Redo, Save, Copy, Check, Type, AlignLeft, AlignCenter, AlignRight, Hash, Minus, Plus, Zap } from 'lucide-react'
import { getContactSubmissions, updateContactSubmission, deleteDocumentById } from '@/lib/appwrite'

interface ContactSubmission {
  $id: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  timestamp: string
  status: 'new' | 'in-progress' | 'responded' | 'closed' | 'spam'
}

const ContactManager = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [replyId, setReplyId] = useState<string | null>(null)
  const [replySubject, setReplySubject] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const [replyFeedback, setReplyFeedback] = useState<string | null>(null)
  const [replyHistory, setReplyHistory] = useState<string[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [showFormatting, setShowFormatting] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  useEffect(() => {
    if (replyMessage) {
      const words = replyMessage.trim().split(/\s+/).filter(word => word.length > 0).length
      setWordCount(words)
    } else {
      setWordCount(0)
    }
  }, [replyMessage])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const data = await getContactSubmissions()
      setSubmissions(data as unknown as ContactSubmission[])
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (submissionId: string, newStatus: string) => {
    try {
      await updateContactSubmission(submissionId, { status: newStatus })
      await fetchSubmissions()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (submissionId: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await deleteDocumentById('contact_submissions', submissionId)
        await fetchSubmissions()
      } catch (error) {
        console.error('Error deleting submission:', error)
      }
    }
  }

  const openReply = (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    setReplyId(submission.$id)
    setReplySubject(prev => prev || `Re: ${submission.subject}`)
    const quoted = submission.message.split('\n').map(l => `> ${l}`).join('\n')
    setReplyMessage(prev => prev || `Hi ${submission.name},\n\nThank you for reaching out to us. We appreciate your interest in our services.\n\nBest regards,\nDevSol Team\n\n---\nOriginal message:\n${quoted}`)
    setIsDraft(true)
  }

  const cancelReply = () => {
    setReplyId(null)
    setReplySubject('')
    setReplyMessage('')
    setReplyFeedback(null)
    setSendingReply(false)
    setIsDraft(false)
    setShowTemplates(false)
    setShowFormatting(false)
    setWordCount(0)
  }

  const saveDraft = () => {
    if (replyId && replyMessage.trim()) {
      localStorage.setItem(`draft_${replyId}`, JSON.stringify({
        subject: replySubject,
        message: replyMessage,
        timestamp: new Date().toISOString()
      }))
      setReplyFeedback('Draft saved successfully')
      setTimeout(() => setReplyFeedback(null), 2000)
    }
  }

  const loadDraft = (submissionId: string) => {
    const draft = localStorage.getItem(`draft_${submissionId}`)
    if (draft) {
      const { subject, message } = JSON.parse(draft)
      setReplySubject(subject)
      setReplyMessage(message)
      setReplyFeedback('Draft loaded')
      setTimeout(() => setReplyFeedback(null), 2000)
    }
  }

  const sendReply = async (submission: ContactSubmission) => {
    try {
      setSendingReply(true)
      setReplyFeedback(null)
      const res = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submission.$id,
          to: submission.email,
          subject: replySubject,
          message: replyMessage
        })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to send reply')
      }
      await handleStatusUpdate(submission.$id, 'responded')
      setReplyFeedback('Reply sent successfully')
      localStorage.removeItem(`draft_${submission.$id}`)
      setTimeout(() => cancelReply(), 2000)
    } catch (e) {
      console.error('Reply failed', e)
      setReplyFeedback('Failed to send reply. Please try again.')
    } finally {
      setSendingReply(false)
    }
  }

  const applyTemplate = (template: string) => {
    const templates = {
      'greeting': `Hi ${selectedSubmission?.name || 'there'},\n\nThank you for reaching out to us. We appreciate your interest in our services.\n\n`,
      'follow-up': `Hi ${selectedSubmission?.name || 'there'},\n\nThank you for your inquiry. We are currently reviewing your request and will get back to you within 24 hours.\n\n`,
      'information': `Hi ${selectedSubmission?.name || 'there'},\n\nThank you for contacting us. To better assist you, could you please provide more details about your requirements?\n\n`,
      'pricing': `Hi ${selectedSubmission?.name || 'there'},\n\nThank you for your interest in our services. We would be happy to provide you with a detailed quote. Please let us know your specific requirements.\n\n`,
      'closing': `\n\nBest regards,\nDevSol Team\n\n---\nOriginal message:\n${selectedSubmission?.message.split('\n').map(l => `> ${l}`).join('\n') || ''}`
    }
    
    if (template === 'closing') {
      setReplyMessage(prev => prev + (templates as any)[template])
    } else {
      setReplyMessage((templates as any)[template])
    }
    setShowTemplates(false)
  }

  const formatText = (command: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = replyMessage.substring(start, end)
    let newText = ''

    switch (command) {
      case 'bold':
        newText = `**${selectedText}**`
        break
      case 'italic':
        newText = `*${selectedText}*`
        break
      case 'quote':
        newText = `> ${selectedText}`
        break
      case 'list':
        newText = `- ${selectedText}`
        break
      case 'link':
        newText = `[${selectedText}](url)`
        break
      case 'code':
        newText = `\`${selectedText}\``
        break
      case 'header':
        newText = `# ${selectedText}`
        break
      case 'separator':
        newText = `${selectedText}\n\n---\n\n`
        break
    }

    const newMessage = replyMessage.substring(0, start) + newText + replyMessage.substring(end)
    setReplyMessage(newMessage)
    setIsDraft(true)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + newText.length, start + newText.length)
    }, 0)
  }

  const insertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newMessage = replyMessage.substring(0, start) + text + replyMessage.substring(end)
    setReplyMessage(newMessage)
    setIsDraft(true)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
      case 'in-progress':
        return { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' }
      case 'responded':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
      case 'closed':
        return { icon: Archive, color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' }
      case 'spam':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' }
      default:
        return { icon: MessageSquare, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
    }
  }

  const getStatusBadge = (status: string) => {
    const { icon: Icon, color, bgColor, borderColor } = getStatusIcon(status)
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${bgColor} ${color} border ${borderColor}`}>
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      if (dateString.includes(' ')) {
        const [date, time] = dateString.split(' ')
        return `${date} at ${time}`
      }
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      return dateString
    }
  }

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filterStatus)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Customer Inquiries</h2>
            <p className="text-gray-600 text-sm mt-1">Review and respond to customer messages</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{submissions.length}</div>
            <div className="text-sm text-gray-500">Total Inquiries</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">No contact submissions match your current filter.</p>
          </div>
        ) : (
          filteredSubmissions.map((submission, index) => (
            <motion.div
              key={submission.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{submission.name}</h4>
                        <p className="text-blue-600 text-sm font-medium">{submission.email}</p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">
                          {submission.company || 'No company specified'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm font-medium">{submission.subject}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {submission.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 pb-4 border-b border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        Submitted: {formatDate(submission.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => openReply(submission)}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission)
                        setShowDetails(true)
                      }}
                      className="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(submission.$id)}
                      className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Reply Composer */}
                <AnimatePresence>
                  {replyId === submission.$id && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 overflow-hidden">
                        {/* Reply Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Send className="h-5 w-5 text-white" />
                              <h4 className="text-lg font-bold text-white">Compose Reply</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              {isDraft && (
                                <button
                                  onClick={saveDraft}
                                  className="px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors flex items-center gap-1.5"
                                >
                                  <Save className="h-4 w-4" />
                                  Save Draft
                                </button>
                              )}
                              <button
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors"
                              >
                                Templates
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Template Dropdown */}
                        <AnimatePresence>
                          {showTemplates && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-white border-b border-gray-200 p-4"
                            >
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {[
                                  { key: 'greeting', label: 'Greeting' },
                                  { key: 'follow-up', label: 'Follow-up' },
                                  { key: 'information', label: 'More Info' },
                                  { key: 'pricing', label: 'Pricing' }
                                ].map((template) => (
                                  <button
                                    key={template.key}
                                    onClick={() => applyTemplate(template.key)}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                                  >
                                    {template.label}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Reply Form */}
                        <div className="p-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">To</label>
                              <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                {submission.email}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">Subject</label>
                              <input
                                type="text"
                                value={replySubject}
                                onChange={(e) => setReplySubject(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Subject"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-sm font-semibold text-gray-700">Message</label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setShowFormatting(!showFormatting)}
                                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-lg transition-colors flex items-center gap-1.5"
                                >
                                  <Type className="h-3 w-3" />
                                  Format
                                </button>
                                <button
                                  onClick={() => applyTemplate('closing')}
                                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded transition-colors"
                                >
                                  Add Closing
                                </button>
                                <button
                                  onClick={() => navigator.clipboard.writeText(replyMessage)}
                                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded transition-colors flex items-center gap-1"
                                >
                                  <Copy className="h-3 w-3" />
                                  Copy
                                </button>
                              </div>
                            </div>

                            {/* Formatting Toolbar */}
                            <AnimatePresence>
                              {showFormatting && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-white border border-gray-200 rounded-lg p-3"
                                >
                                  <div className="flex flex-wrap gap-2">
                                    <button
                                      onClick={() => formatText('bold')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Bold"
                                    >
                                      <Bold className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('italic')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Italic"
                                    >
                                      <Italic className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('quote')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Quote"
                                    >
                                      <Quote className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('list')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="List"
                                    >
                                      <List className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('link')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Link"
                                    >
                                      <Link className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('code')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Code"
                                    >
                                      <Hash className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('header')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Header"
                                    >
                                      <Type className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => formatText('separator')}
                                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                                      title="Separator"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="relative">
                              <textarea
                                ref={textareaRef}
                                rows={10}
                                value={replyMessage}
                                onChange={(e) => {
                                  setReplyMessage(e.target.value)
                                  setIsDraft(true)
                                  setIsTyping(true)
                                  setTimeout(() => setIsTyping(false), 1000)
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none font-mono leading-relaxed"
                                placeholder="Write your reply..."
                                style={{ minHeight: '200px' }}
                              />
                              <div className="absolute bottom-3 right-3 flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border text-xs text-gray-500">
                                  <span>{wordCount} words</span>
                                  <span>•</span>
                                  <span>{replyMessage.length} chars</span>
                                  {isTyping && <span className="text-blue-500">• typing</span>}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Reply Suggestions */}
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Quick Replies</label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                'Thanks for reaching out!',
                                'We will get back to you shortly.',
                                'Can you share more details?',
                                'We appreciate your interest.',
                                'Let me check on that for you.',
                                'I\'ll look into this right away.',
                                'Thank you for your patience.',
                                'Is there anything else I can help with?'
                              ].map((suggestion) => (
                                <button
                                  key={suggestion}
                                  onClick={() => insertText(suggestion)}
                                  className="px-3 py-1.5 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-xs transition-colors hover:border-blue-300 hover:text-blue-700"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                              {replyFeedback && (
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                                  replyFeedback.includes('success') 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                  {replyFeedback.includes('success') ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4" />
                                  )}
                                  {replyFeedback}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={cancelReply}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold transition-colors"
                                disabled={sendingReply}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => sendReply(submission)}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold inline-flex items-center gap-2 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!replySubject.trim() || !replyMessage.trim() || sendingReply}
                              >
                                {sendingReply ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Send className="h-4 w-4" />
                                )}
                                <span>{sendingReply ? 'Sending...' : 'Send Reply'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Status Update */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">Quick Status:</span>
                  <div className="flex gap-2">
                    {['new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(submission.$id, status)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          submission.status === status
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showDetails && selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Contact Details</h3>
                    <p className="text-blue-100 text-sm">View complete inquiry information</p>
                  </div>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Name</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Company</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.company || 'Not specified'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Subject</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.subject}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Message</label>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-line">{selectedSubmission.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Submitted</label>
                    <p className="text-gray-900 font-medium">{formatDate(selectedSubmission.timestamp)}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          handleStatusUpdate(selectedSubmission.$id, status)
                          setShowDetails(false)
                        }}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                          selectedSubmission.status === status
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactManager
