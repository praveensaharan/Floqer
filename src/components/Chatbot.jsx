import React, { useState, useEffect } from "react";
import { Input, Button, Layout, Typography, Spin } from "antd";
import axios from "axios";
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://floqer-backend-n5z1.onrender.com/demo"
      );
      setData(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://floqer-backend-n5z1.onrender.com/query",
        {
          question: input,
        }
      );
      const botMessage = { sender: "Bot", text: response.data.answer };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const botMessage = {
        sender: "Bot",
        text: "Sorry, something went wrong.",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Chatbot</h1>
      <Layout className="min-h-screen bg-white">
        <Content className="p-6 flex flex-col items-center">
          <Paragraph className="text-lg mb-8 text-center text-gray-600 font-medium">
            <span className="text-blue-500 font-bold">Use our bot</span> to get
            more insights about{" "}
            <span className="text-blue-500 font-bold">data or {data} </span>.
          </Paragraph>

          <div className="chat-box h-screen w-full max-w-2xl bg-blue-50 shadow-2xl rounded-lg p-6 overflow-y-auto border border-gray-300">
            {messages.length === 0 && (
              <div className="initial-content flex flex-col items-center justify-center h-full">
                {/* Your initial content here, such as text or logo */}
                <h2 className="text-black text-3xl font-bold mb-4">
                  Welcome to our chatbot!
                </h2>
                <p className="text-gray-400 text-lg">
                  Feel free to ask me anything.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-3 p-4 rounded-lg transition-transform transform ${
                  message.sender === "Bot"
                    ? "bg-gradient-to-r from-gray-100 to-gray-300 text-left shadow-sm mr-16"
                    : "bg-gradient-to-r from-blue-100 to-blue-300 text-right shadow-sm ml-16"
                }`}
              >
                <strong className="block font-semibold text-gray-800">
                  {message.sender}:
                </strong>
                <span className="block text-gray-700">{message.text}</span>
              </div>
            ))}
          </div>
          <div className="flex mt-6 w-full max-w-2xl">
            <Input
              className="flex-1 mr-2 shadow-inner border border-gray-300 rounded-lg bg-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={sendMessage}
              placeholder="Type your question..."
              disabled={loading}
              size="large"
            />
            <Button
              type="primary"
              onClick={sendMessage}
              disabled={loading}
              size="large"
              className="rounded-lg"
            >
              {loading ? <Spin /> : "Send"}
            </Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Chatbot;
