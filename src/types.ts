export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface QuickTopic {
  id: string;
  label: string;
  query: string;
  category: string;
  icon: string;
}

export interface TripSection {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  details: string[];
  tips?: string;
  criticalAlert?: string;
}
