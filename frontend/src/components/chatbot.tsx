import React, { useState } from 'react';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInput,
  IonFooter,
} from '@ionic/react';
import { chatbubbleEllipses, close, send, person, logoAndroid } from 'ionicons/icons';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatbotComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user' as 'user' | 'bot', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'bot', content: 'Sorry, I encountered an error.' }]);
    }
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end">
        {!isOpen && (
          <IonFabButton onClick={() => setIsOpen(true)}>
            <IonIcon icon={chatbubbleEllipses} />
          </IonFabButton>
        )}
      </IonFab>

      {isOpen && (
        <div className="chatbot-popup" style={{
          position: 'fixed',
          bottom: '20px',
          right: '10px',
          width: '400px',
          height: '500px',
          backgroundColor: 'var(--ion-background-color)',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
        }}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Chatbot</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent >
            <IonList>
              {messages.map((message, index) => (
                <IonItem key={index} lines="none" className={message.role === 'user' ? 'ion-text-end' : ''}>
                  {message.role === 'bot' && (
                    <IonAvatar slot="start">
                      <IonIcon icon={logoAndroid} />
                    </IonAvatar>
                  )}
                  <IonLabel className="ion-text-wrap">
                    <p style={{
                      backgroundColor: message.role === 'user' ? 'var(--ion-color-primary)' : 'var(--ion-color-light)',
                      color: message.role === 'user' ? 'var(--ion-color-primary-contrast)' : 'var(--ion-color-dark)',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      display: 'inline-block',
                      maxWidth: '100%',
                    }}>
                      {message.content}
                    </p>
                  </IonLabel>
                  {message.role === 'user' && (
                    <IonAvatar slot="end">
                      <IonIcon icon={person} />
                    </IonAvatar>
                  )}
                </IonItem>
              ))}
            </IonList>
          </IonContent>

          <IonFooter >
            <IonToolbar>
              <IonInput className='ion-padding'
                value={input}
                placeholder="Type your message..."
                onIonChange={e => setInput(e.detail.value!)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
              />
              <IonButtons slot="end">
                <IonButton onClick={handleSend}>
                  <IonIcon icon={send} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonFooter>
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;