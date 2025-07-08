
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Star, MessageSquare, Send, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserFeedback: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: '',
    serviceType: ''
  });

  const serviceTypes = [
    'Basic Wash',
    'Premium Clean',
    'Luxury Detailing',
    'Exterior Wash',
    'Interior Cleaning',
    'Full Service'
  ];

  const handleSubmitFeedback = () => {
    if (!user) return;

    const feedback = {
      id: Date.now().toString(),
      userId: user.id,
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toISOString().split('T')[0],
      serviceType: newFeedback.serviceType
    };

    const updatedUser = {
      ...user,
      feedback: [...user.feedback, feedback]
    };

    updateUser(updatedUser);
    setNewFeedback({
      rating: 5,
      comment: '',
      serviceType: ''
    });
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating = user?.feedback.length 
    ? user.feedback.reduce((sum, f) => sum + f.rating, 0) / user.feedback.length 
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-wash-blue-dark">Feedback & Reviews</h1>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}
                  </p>
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-wash-blue/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-wash-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold text-wash-blue-dark">{user?.feedback.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Review</p>
                <p className="text-2xl font-bold text-green-600">
                  {user?.feedback.length ? user.feedback[user.feedback.length - 1].date : 'None'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit New Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Submit New Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={newFeedback.serviceType} onValueChange={(value) => setNewFeedback({ ...newFeedback, serviceType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {renderStars(newFeedback.rating, true, (rating) => setNewFeedback({ ...newFeedback, rating }))}
                <span className="text-sm text-muted-foreground">({newFeedback.rating}/5)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Feedback</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with our car wash service..."
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmitFeedback}
            disabled={!newFeedback.serviceType || !newFeedback.comment}
            className="bg-wash-blue hover:bg-wash-blue-dark"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Previous Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>My Previous Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.feedback && user.feedback.length > 0 ? (
            <div className="space-y-4">
              {user.feedback.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {renderStars(feedback.rating)}
                        <span className="text-sm font-medium">{feedback.serviceType}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{feedback.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No reviews yet</h3>
              <p className="text-muted-foreground">Share your first experience with our car wash service</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
