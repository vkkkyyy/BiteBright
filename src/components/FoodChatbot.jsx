import React, { useState } from "react";
import "../css/FoodChatbot.css";

const FoodChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! Welcome 🍽️ Ask about appetizers, drinks, desserts, main course or specials.", sender: "bot" }
  ]);

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");
  
  
  const clearChat = () => {
  setMessages([
    {
      text: "Hi! Welcome 🍽️ Ask about appetizers, drinks, desserts, main course or specials.",
      sender: "bot",
    },
  ]);
};

  // rules
  const rules = [

    // GENERAL (10)
    { keywords: ["hello", "hi"], response: "Hello! Welcome to our restaurant 🍴" },
    { keywords: ["menu"], response: "We have appetizers, drinks, desserts, main course and specials." },
    { keywords: ["categories"], response: "Our menu includes appetizers, drinks, desserts, main course and specials." },
    { keywords: ["hours"], response: "We are open from 8 AM to 10 PM daily." },
    { keywords: ["location"], response: "We are located in Nairobi CBD." },
    { keywords: ["delivery"], response: "Yes! We offer delivery services 🚚." },
    { keywords: ["payment"], response: "We accept M-Pesa payments." },
    { keywords: ["order"], response: "You can place orders directly from our menu." },
    { keywords: ["thanks"], response: "You're welcome 😊." },
    { keywords: ["bye"], response: "Goodbye! Enjoy your meal 🍽️." },

    // APPETIZERS (15)
    { keywords: ["appetizer"], response: "Our appetizers include fries, wings, samosas and spring rolls." },
    { keywords: ["fries"], response: "We serve crispy french fries 🍟." },
    { keywords: ["wings"], response: "Our chicken wings are very popular 🍗." },
    { keywords: ["samosa"], response: "We have beef and chicken samosas." },
    { keywords: ["spring roll"], response: "Vegetable spring rolls are available." },
    { keywords: ["nachos"], response: "Cheesy nachos are available." },
    { keywords: ["garlic bread"], response: "Fresh garlic bread is available." },
    { keywords: ["onion rings"], response: "Crispy onion rings are served hot." },
    { keywords: ["mozzarella"], response: "Mozzarella sticks are available." },
    { keywords: ["starter"], response: "Try fries or samosas as starters." },
    { keywords: ["small bites"], response: "We offer small bites like wings and fries." },
    { keywords: ["quick snack"], response: "Try fries or spring rolls." },
    { keywords: ["light meal"], response: "Our appetizers are perfect light meals." },
    { keywords: ["crispy"], response: "Most appetizers are crispy and freshly made." },
    { keywords: ["finger food"], response: "We serve great finger foods like wings and fries." },

    // DRINKS (15)
    { keywords: ["drink"], response: "We serve juices, sodas, coffee and milkshakes." },
    { keywords: ["juice"], response: "We have mango, passion and orange juice 🧃." },
    { keywords: ["soda"], response: "Cold sodas are available." },
    { keywords: ["water"], response: "We sell bottled water." },
    { keywords: ["coffee"], response: "Hot coffee is available ☕." },
    { keywords: ["tea"], response: "We serve tea and chai." },
    { keywords: ["milkshake"], response: "We offer vanilla, chocolate and strawberry milkshakes." },
    { keywords: ["smoothie"], response: "Fresh fruit smoothies are available." },
    { keywords: ["cold drink"], response: "We have a variety of cold drinks." },
    { keywords: ["hot drink"], response: "Hot drinks include tea and coffee." },
    { keywords: ["fresh juice"], response: "Our fresh juices are made daily." },
    { keywords: ["energy drink"], response: "Energy drinks are available." },
    { keywords: ["iced tea"], response: "Refreshing iced tea is available." },
    { keywords: ["lemonade"], response: "Fresh lemonade is available 🍋." },
    { keywords: ["drink options"], response: "We have hot and cold drink options." },

    // DESSERTS (15)
    { keywords: ["dessert"], response: "We offer cakes, ice cream and donuts 🍩." },
    { keywords: ["cake"], response: "Chocolate and vanilla cakes are available 🎂." },
    { keywords: ["ice cream"], response: "We have different ice cream flavors 🍦." },
    { keywords: ["donut"], response: "Sweet donuts are available." },
    { keywords: ["brownie"], response: "Chocolate brownies are available." },
    { keywords: ["cupcake"], response: "Fresh cupcakes are available." },
    { keywords: ["sweet"], response: "Try our desserts for sweet treats." },
    { keywords: ["chocolate"], response: "We have chocolate desserts available." },
    { keywords: ["vanilla"], response: "Vanilla flavored desserts are available." },
    { keywords: ["pudding"], response: "Creamy pudding is available." },
    { keywords: ["cookie"], response: "Fresh cookies are available." },
    { keywords: ["pastry"], response: "Fresh pastries are available." },
    { keywords: ["treat"], response: "Try our sweet dessert treats." },
    { keywords: ["after meal"], response: "Desserts are perfect after meals." },
    { keywords: ["sweet tooth"], response: "Our desserts will satisfy your sweet tooth." },

    // MAIN COURSE (15)
    { keywords: ["main course"], response: "Main meals include chicken, rice, pasta and beef." },
    { keywords: ["chicken"], response: "We serve fried and grilled chicken 🍗." },
    { keywords: ["beef"], response: "Beef stew and beef fry are available." },
    { keywords: ["rice"], response: "We serve fried rice and biryani." },
    { keywords: ["biryani"], response: "Chicken biryani is very popular." },
    { keywords: ["pasta"], response: "Creamy pasta is available." },
    { keywords: ["spaghetti"], response: "Spaghetti with sauce is available." },
    { keywords: ["ugali"], response: "Ugali with beef or chicken stew is available." },
    { keywords: ["chapati"], response: "Fresh chapati is available." },
    { keywords: ["fish"], response: "We serve fried and grilled fish." },
    { keywords: ["nyama"], response: "Nyama choma is available 🔥." },
    { keywords: ["lunch"], response: "Main meals are perfect for lunch." },
    { keywords: ["dinner"], response: "We offer full dinner meals." },
    { keywords: ["heavy meal"], response: "Main courses are filling meals." },
    { keywords: ["full meal"], response: "Try chicken, rice or beef meals." },

    // SPECIALS (10)
    { keywords: ["special"], response: "Ask about today's special meal." },
    { keywords: ["today special"], response: "Today's special is grilled chicken and fries." },
    { keywords: ["weekend"], response: "Weekend specials are available." },
    { keywords: ["discount"], response: "Special discounts are available." },
    { keywords: ["offer"], response: "We have limited-time offers." },
    { keywords: ["combo"], response: "Combo meals include food and drinks." },
    { keywords: ["family"], response: "Family meal specials are available." },
    { keywords: ["party"], response: "We offer party meal specials." },
    { keywords: ["event"], response: "Special catering is available for events." },
    { keywords: ["deal"], response: "Check our daily meal deals." }

  ];

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();

    for (let rule of rules) {
      for (let keyword of rule.keywords) {
        if (text.includes(keyword)) {
          return rule.response;
        }
      }
    }

    return "Sorry, I didn't understand. Ask about appetizers, drinks, desserts, main course or specials.";
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      sender: "user"
    };

    const botReply = {
      text: getBotResponse(input),
      sender: "bot"
    };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (<>
      {/* Floating button */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat window */}
      {open && (
        <div className="chatbot-container">

          <div className="chat-header">
            🍽️ BiteBright Assistant

            <button className="clear-btn" onClick={clearChat}> Clear</button>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleSend}>Send</button>
          </div>

        </div>
      )}
    </>
  );
};

export default FoodChatbot;