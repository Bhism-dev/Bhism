import React, { useState, useEffect, useRef } from "react";
import { IonFab, IonFabButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonList, IonItem, IonLabel, IonAvatar, IonInput, IonFooter, IonSkeletonText,
} from "@ionic/react";
import { chatbubbleEllipses, close, send, person, logoAndroid,
} from "ionicons/icons";
import "../theme/tailwind.css";

interface Message {
    role: "user" | "bot" | string;
    content: string;
}

const ChatbotComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLIonContentElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null); // New ref for the dummy div

    const handleSend = async () => {
        if (input.trim() === "") return;
    
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
    
        try {
          const response = await fetch("http://bhismchatbot.asdqe0avg6bbd3gx.centralindia.azurecontainer.io:5000/process-query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: input }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch response");
          }
    
          const data = await response.json();
          const botResponse = data.response || "Sorry, I encountered an error.";
    
          setMessages([...newMessages, { role: "bot", content: botResponse }]);
        } catch (error) {
          setMessages([
            ...newMessages,
            { role: "bot", content: "Sorry, I encountered an error." },
          ]);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
            {!isOpen && (
                <IonFabButton onClick={() => setIsOpen(true)}>
                  <IonIcon icon={chatbubbleEllipses} />
                </IonFabButton>
              )}
            </IonFab>

            {isOpen && (
                <div
                className="chatbot-popup"
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "10px",
                  width: "90%",
                  maxWidth: "400px",
                  height: "70vh",
                  maxHeight: "500px",
                  backgroundColor: "var(--ion-background-color)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 1000,
                }}
                >
                    <IonHeader>
                    <IonToolbar>
                    <IonTitle>SAHAAYAK</IonTitle>
                    <IonButtons slot="end">
                      <IonButton onClick={() => setIsOpen(false)}>
                        <IonIcon icon={close} />
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                    </IonHeader>

                    <IonContent ref={messagesEndRef}>
                    <IonList>
                    {messages.map((message, index) => (
                      <IonItem
                        key={index}
                        lines="none"
                        className={message.role === "user" ? "ion-text-end" : ""}
                      >
                        {message.role === "bot" && (
                          <IonAvatar slot="start">
                            <img alt="Sahaayak chatbot logo" src="/assets/cblogo.png" />
                          </IonAvatar>
                        )}
                        <IonLabel className="ion-text-wrap">
                          <p
                            style={{
                              backgroundColor:
                                message.role === "user"
                                  ? "var(--ion-color-primary)"
                                  : "var(--ion-color-light)",
                              color:
                                message.role === "user"
                                  ? "var(--ion-color-primary-contrast)"
                                  : "var(--ion-color-dark)",
                              padding: "10px 15px",
                              margin: "0",
                              borderRadius: "12px",
                              display: "inline-block",
                              maxWidth: "100%",
                            }}
                          >
                            {message.content}
                          </p>
                        </IonLabel>
                        {message.role === "user" && (
                          <IonAvatar slot="end">
                            <img alt="Silhouette of a person's head" src="/assets/person.png" />
                          </IonAvatar>
                        )}
                      </IonItem>
                    ))}
      
                    {loading && (
                      <IonItem lines="none">
                        <IonAvatar slot="start">
                          <IonSkeletonText animated style={{ width: "40px", height: "40px" }} />
                        </IonAvatar>
                        <IonLabel>
                          <IonSkeletonText animated style={{ width: "80%" }} />
                          <IonSkeletonText animated style={{ width: "60%" }} />
                        </IonLabel>
                      </IonItem>
                    )}
                  </IonList>
                        <div ref={bottomRef} /> {/* Dummy div to scroll into view */}
                    </IonContent>

                    <IonFooter>
                    <IonToolbar>
                      <IonInput
                        className="ion-padding"
                        value={input}
                        placeholder="Type your message..."
                        onIonInput={(e) => setInput(e.detail.value!)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
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