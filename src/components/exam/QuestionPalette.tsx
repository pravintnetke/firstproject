import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  status: 'not-visited' | 'not-answered' | 'answered' | 'marked-for-review' | 'answered-and-marked';
}

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  onMarkForReview: () => void;
  onClearResponse: () => void;
}

export function QuestionPalette({ 
  questions, 
  currentQuestionIndex, 
  onQuestionSelect,
  onMarkForReview,
  onClearResponse 
}: QuestionPaletteProps) {
  const getStatusIcon = (status: Question['status']) => {
    switch (status) {
      case 'not-visited':
        return <Circle className="w-4 h-4 text-muted-foreground" />;
      case 'not-answered':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'answered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'marked-for-review':
        return <Flag className="w-4 h-4 text-purple-500" />;
      case 'answered-and-marked':
        return <Flag className="w-4 h-4 text-blue-500 fill-current" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Question['status']) => {
    switch (status) {
      case 'not-visited':
        return 'bg-muted hover:bg-muted/80';
      case 'not-answered':
        return 'bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-200';
      case 'answered':
        return 'bg-green-100 hover:bg-green-200 text-green-800 border-green-200';
      case 'marked-for-review':
        return 'bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-200';
      case 'answered-and-marked':
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200';
      default:
        return 'bg-muted hover:bg-muted/80';
    }
  };

  const statusCounts = questions.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Question Palette</CardTitle>
        
        {/* Status Legend */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-muted-foreground" />
            <span>Not Visited ({statusCounts['not-visited'] || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span>Not Answered ({statusCounts['not-answered'] || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Answered ({statusCounts['answered'] || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-purple-500" />
            <span>Marked for Review ({statusCounts['marked-for-review'] || 0})</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <Button
              key={question.id}
              variant="outline"
              size="sm"
              className={`
                relative h-10 w-10 p-0 
                ${getStatusColor(question.status)}
                ${currentQuestionIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}
              `}
              onClick={() => onQuestionSelect(index)}
            >
              <span className="font-medium">{index + 1}</span>
              <div className="absolute -top-1 -right-1">
                {getStatusIcon(question.status)}
              </div>
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={onMarkForReview}
          >
            <Flag className="w-4 h-4 mr-2" />
            Mark for Review
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={onClearResponse}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Clear Response
          </Button>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Badge variant="secondary" className="justify-center">
              Total: {questions.length}
            </Badge>
            <Badge variant="secondary" className="justify-center">
              Answered: {statusCounts['answered'] || 0}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}