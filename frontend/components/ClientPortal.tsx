'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { FileUpload } from './ui/FileUpload';
import { ChatInterface } from './ChatInterface';
import { Calendar } from './Calendar';
import { InvoiceList } from './InvoiceList';
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function ClientPortal() {
  const { data: session } = useSession();
  const [cases, setCases] = useState([]);
  const [activeCase, setActiveCase] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchCases();
    }
  }, [session]);

  const fetchCases = async () => {
    try {
      const response = await axios.get('/api/cases/my-cases');
      setCases(response.data);
      if (response.data.length > 0) {
        setActiveCase(response.data[0]);
      }
    } catch (error) {
      toast.error('Failed to load cases');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, caseId: string) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('caseId', caseId);

    try {
      await axios.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document uploaded successfully');
      fetchCases();
    } catch (error) {
      toast.error('Failed to upload document');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cases Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-serif text-xl font-bold mb-4">Your Cases</h3>
            <div className="space-y-2">
              {cases.map((case_: any) => (
                <button
                  key={case_._id}
                  onClick={() => setActiveCase(case_)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeCase?._id === case_._id
                      ? 'bg-gold/20 border border-gold'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="font-medium">{case_.caseNumber}</div>
                  <div className="text-sm text-gray-400">{case_.title}</div>
                  <Badge className="mt-2" variant={case_.status === 'active' ? 'success' : 'warning'}>
                    {case_.status}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeCase && (
            <Card className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">{activeCase.title}</h2>
                    <p className="text-gray-400">Case Number: {activeCase.caseNumber}</p>
                  </div>
                  <Badge variant={activeCase.priority === 'high' ? 'danger' : 'info'}>
                    {activeCase.priority} priority
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="timeline">
                <TabsList>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-4">
                    {activeCase.timeline?.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-24 text-sm text-gray-400">
                          {format(new Date(event.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">{event.action}</div>
                          <div className="text-sm text-gray-300">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <FileUpload
                    onUpload={(file) => uploadDocument(file, activeCase._id)}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  
                  <div className="mt-6 space-y-2">
                    {activeCase.documents?.map((doc: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-400">
                            Uploaded: {format(new Date(doc.uploadedAt), 'MMM dd, yyyy')}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="mt-4">
                  <ChatInterface caseId={activeCase._id} />
                </TabsContent>

                <TabsContent value="calendar" className="mt-4">
                  <Calendar
                    events={activeCase.calendarEvents}
                    onEventClick={(event) => {
                      // Handle event click
                    }}
                  />
                </TabsContent>

                <TabsContent value="invoices" className="mt-4">
                  <InvoiceList
                    invoices={activeCase.fees.payments}
                    total={activeCase.fees.total}
                    paid={activeCase.fees.paid}
                    outstanding={activeCase.fees.outstanding}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}