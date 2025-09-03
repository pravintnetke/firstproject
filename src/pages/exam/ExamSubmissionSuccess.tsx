import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Award,
  Home,
  Eye,
  Calendar
} from 'lucide-react';
import { sampleExams } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export default function ExamSubmissionSuccess() {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get exam data
  const exam = sampleExams.find(e => e.id === examId);

  useEffect(() => {
    // Prevent going back to exam interface
    window.history.replaceState(null, '', window.location.href);
  }, []);

  const handleGoToDashboard = () => {
    navigate('/candidate');
  };

  const handleViewMyExams = () => {
    navigate('/candidate/exams');
  };

  const handleViewResults = () => {
    navigate('/candidate/results');
  };

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Exam not found</p>
            <Button onClick={handleGoToDashboard} className="mt-4">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Message Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Exam Submitted Successfully!
            </CardTitle>
            <p className="text-green-600 mt-2">
              Your exam has been submitted and recorded successfully
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Exam Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Exam Details</h3>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Completed
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{exam.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-500" />
                  <span>Subject: {exam.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Duration: {exam.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Submitted on: {format(new Date(), 'PPP p')}</span>
                </div>
              </div>
            </div>

            {/* Submission Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your answers have been securely saved</li>
                <li>• Results will be processed and made available soon</li>
                <li>• You will be notified when results are ready</li>
                <li>• Check the Results section for updates</li>
              </ul>
            </div>

            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Candidate Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Submission ID:</span> {examId?.toUpperCase()}-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleGoToDashboard}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
              
              <Button 
                onClick={handleViewMyExams}
                variant="outline"
                className="flex-1"
              >
                <FileText className="mr-2 h-4 w-4" />
                View My Exams
              </Button>
              
              <Button 
                onClick={handleViewResults}
                variant="outline"
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-800 text-xs font-bold">!</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Important Note</p>
                <p className="text-yellow-700">
                  Please save this confirmation for your records. If you have any questions about your submission, 
                  contact the exam administrator with your submission ID.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
