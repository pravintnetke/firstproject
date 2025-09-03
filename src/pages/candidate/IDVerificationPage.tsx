import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDVerification } from '@/components/exam/IDVerification';
import { toast } from '@/hooks/use-toast';

export default function IDVerificationPage() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationComplete = (verified: boolean) => {
    if (verified) {
      toast({
        title: "Verification Successful",
        description: "Your identity has been verified. Redirecting to exam...",
      });
      
      setTimeout(() => {
        navigate(`/exam/${examId}`);
      }, 2000);
    } else {
      toast({
        title: "Verification Failed",
        description: "Identity verification failed. Please try again with clear, well-lit photos.",
        variant: "destructive",
      });
    }
    setIsVerified(verified);
  };

  return (
    <IDVerification onVerificationComplete={handleVerificationComplete} />
  );
}