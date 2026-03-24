import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Copy, Eye, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const RecentResumesSection = ({ variants }) => {
  return (
    <motion.div variants={variants}>
      <Card className="dashboard-glass-card shadow-2xl text-white">
        <CardHeader>
          <CardTitle className="text-white">Recent Resumes</CardTitle>
          <CardDescription className="text-gray-100/80">
            View and manage your recent resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <AnimatePresence>
                {[1, 2, 3].map((resume) => (
                  <motion.div
                    key={resume}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group bg-white/95 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-700/80 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-xl bg-primary-100 p-3 group-hover:bg-primary-200 transition-colors">
                              <FileText className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Software Engineer Resume
                              </h4>
                              <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Last updated 2 days ago</span>
                                <span className="mx-2">•</span>
                                <span>Modern Professional Template</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentResumesSection;
