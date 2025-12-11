import React from 'react';
import Accordion from './components/accordion';

function app() {
  const items = [
    {
      title: "Who did this accordion?",
      content: "Elizaveta Darsalia did it."
    },
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces, particularly web applications. It allows developers to create reusable UI components and manage state efficiently."
    },
    {
      title: "What's AWS?",
      content: "AWS, or Amazon Web Services, is a cloud computing platform that provides on-demand IT resources like compute power, storage, and databases over the internet on a pay-as-you-go basis."
    },
    {
      title: "What's free-fall?",
      content: "downward movement under the force of gravity only."
    },
    {
      title: "How can calculus help us?",
      content: "Calculus is applied in many areas of life. It can be used to model systems where there is change. Examples of the applications of calculus in scientific fields are space exploration, telecommunications systems, computer science, engineering, medicine, pharmacology, business, meteorology, and music. "
    },
     {
      title: "what if gravity wasnt 9,83 m/s²?",
      content: "If Earth's gravity was not 9.83 m/s², the consequences would depend on whether the value was higher or lower. A higher gravity would make everything heavier, causing structures to collapse and increasing the risk of being crushed. A lower gravity would cause the atmosphere to drift into space, leading to an inability to breathe, and all liquid to boil away, while a higher gravity would make everything heavier.  "
    }
  ];
  return (
      <main>
        <Accordion items={items} />
      </main>
  );
}
export default app;