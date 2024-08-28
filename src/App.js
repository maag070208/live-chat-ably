import { useChannel } from "ably/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Validator from "yup";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const { channel } = useChannel("test-message", (message) => {
    const newMessage = message.data;
    console.log(newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  });

  const submitForm = (values) => {
    console.log(values);
    channel.publish("test-message", {
      ...values,
      from: localStorage.getItem("name"),
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === localStorage.getItem("name")
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.from === localStorage.getItem("name") ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                <div className="font-bold">{msg.from}</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={Validator.object({
          message: Validator.string()
            .required("El mensaje es requerido")
            .min(3, "El mínimo de caracteres es de 3")
            .max(25, "El máximo de caracteres es de 25"),
        })}
        onSubmit={submitForm}
      >
        {({ isValid }) => (
          <Form className="flex items-center p-4 bg-white border-t border-gray-300">
            <Field
              type="text"
              name="message"
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mr-2"
            />

            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              ENVIAR
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
