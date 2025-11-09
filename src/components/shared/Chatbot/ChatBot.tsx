import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
} from '@mui/material';

type Role = 'user' | 'bot';

interface Message {
  role: Role;
  text: string;
}

interface GeminiServerResponse {
  text: string;
}

interface ChatbotProps {
  className?: string;
}

const ChatBot: React.FC<ChatbotProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Meow! I'm CatBot. Ask me anything about cats!" },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', text: userMessage },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post<GeminiServerResponse>(
        `${API_URL}/api/gemini`,
        { prompt: userMessage },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessages([...newMessages, { role: 'bot', text: response.data.text }]);
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? (err.response?.data as { error?: string })?.error || err.message
        : 'Oops, something went wrong...';

      setMessages([...newMessages, { role: 'bot', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setInput(e.target.value);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 600,
        m: '20px auto',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,

        background: 'transparent',
        color: '#fff',
        boxShadow:
          '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px rgba(160, 157, 157, 1), 0 0 40px rgba(139, 0, 0, 0.25),0 0 80px rgba(139, 0, 0, 0.15)',
      }}
      className={className}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <img src="/avatar.png" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          CatBot
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          mb: 2,
          pr: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              display: 'flex',
              gap: 1,
              alignItems: 'flex-end',
            }}
          >
            {msg.role === 'bot' && (
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.400' }}>
                🐾
              </Avatar>
            )}
            <Box
              sx={{
                bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                color: msg.role === 'user' ? 'white' : 'text.primary',
                px: 2,
                py: 1.5,
                borderRadius: 2,
                borderTopLeftRadius: msg.role === 'bot' ? 0 : 16,
                borderTopRightRadius: msg.role === 'user' ? 0 : 16,
                whiteSpace: 'pre-line',
                fontSize: '0.95rem',
              }}
            >
              {msg.text}
            </Box>
            {msg.role === 'user' && (
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                <img src="/people.png" />
              </Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Ask me anything..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          multiline
          maxRows={3}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              color: 'white',
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 1,
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
                borderWidth: 2,
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          sx={{
            minWidth: 100,
            height: 40,
            borderColor: 'white',
            color: 'white',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:disabled': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiCircularProgress-root': {
              color: 'white',
            },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Send'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBot;
