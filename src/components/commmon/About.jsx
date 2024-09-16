import React from "react";

const About = () => {
  return (
    <section className="w-[33rem] md:w-[70rem] lg:w-[90%] h-screen mx-auto   ">
      <div className=" w-full h-[25rem] relative bg-gradient-to-t from-black/40 to-white/40 ">
        <img src="/about.jpg" alt="aboutimage" className=" w-full h-full  absolute mix-blend-overlay" />
        <div className="p-10 sm:p-24  text-white ">
        <h1 className="text-4xl sm:text-6xl font-bold ">Writeup Project</h1>
        <h3 className="text-4xl font-semibold mt-[2rem] sm:mt-[3rem]">Overview</h3>
        <p className="text-lg font-light mt-[1rem]">
          Our Blog project is a dynamic and interactive platform built using
          modern web technologies. It allows users to create, read, share, save,
          delete, and comment on blog posts. Additionally, users can like
          others’ blogs, fostering a community of engagement and interaction.
        </p>
      </div>
      </div>
     
      <div className="p-7">
        <h3 className="text-2xl font-semibold mt-[3rem]">Technologies Used</h3>
        <ul className="text-lg font-normal mt-[1rem]">
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">ReactJs:</span>The core
            framework for building the user interface, providing a seamless and
            responsive experience.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">TailwindCSS:</span>Utilized
            for styling, TailwindCSS offers a utility-first approach, making it
            easy to create a visually appealing and consistent design.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Firebase:</span> Employed for
            backend services, including authentication, database management, and
            storage.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Context API:</span> Used for state
            management, ensuring efficient and scalable handling of application
            state.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Framer Motion:</span>{" "}
            Integrated for animations, adding smooth and engaging transitions to
            enhance user experience.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">React-Hot-Toast:</span>{" "}
            Provides notifications for user actions, such as saving or deleting
            posts, ensuring users are informed of their interactions.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">React Router DOM:</span>{" "}
            Manages routing within the application, enabling seamless navigation
            between different pages.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">React-TagsInput:</span> Allows
            users to add and manage tags for their blog posts, enhancing content
            organization and discoverability.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">React-Icons:</span> Offers a
            wide range of icons to enhance the visual appeal and usability of
            the application.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Moment:</span> Used for date
            and time formatting, ensuring consistency and readability across the
            platform.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">React-Share:</span> Enables
            users to share blog posts on various social media platforms,
            increasing the reach and visibility of content.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-[3rem]">Features</h3>
        <ul className="text-lg font-normal ">
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Create Posts:</span> Users can
            write and publish their own blog posts, sharing their thoughts and
            ideas with the community.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Read Posts:</span> Browse and
            read blog posts from other users, discovering new content and
            perspectives.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Share Posts:</span> Easily
            share blog posts on social media platforms, expanding the audience
            and engagement.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Save Posts:</span> Save
            favorite posts for later reading, creating a personalized collection
            of content.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Delete Posts:</span> Remove
            posts that are no longer relevant or desired.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Comment on Posts:</span>{" "}
            Engage with other users by commenting on their blog posts, fostering
            discussions and connections.
          </li>
          <li className="mt-[1rem]">
            <span className="font-medium text-xl">Like Posts:</span> Show
            appreciation for others’ content by liking their blog posts,
            encouraging quality contributions.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-[3rem]">Conclusion</h3>
        <p className="text-lg font-normal mt-[2rem] ">
          This Writeup project leverages a robust stack of technologies to
          deliver a feature-rich and user-friendly platform. By combining the
          power of ReactJS, TailwindCSS, Firebase, and other libraries, I have
          created a space where users can express themselves, connect with
          others, and engage with a diverse range of content.
        </p>
      </div>
    </section>
  );
};

export default About;
