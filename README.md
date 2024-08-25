
Youtube Video:-https://youtu.be/ifMbmQUi_eY


![image](https://github.com/alok-mishra143/Dev-flow/assets/100504874/d0739e95-66ab-4a44-a3d5-034f9d0133c9)


## Overview

Welcome to **DevFlow**, the upgraded form of StackOverflow designed to enhance the development experience for developers worldwide. DevFlow is a collaborative platform that goes beyond traditional Q&A, fostering a community-driven ecosystem where developers can seamlessly share knowledge, collaborate on projects, and elevate their coding skills. 🌐🚀

## Features

### 1. Collaborative Knowledge Sharing

DevFlow encourages developers to share their expertise through detailed articles, tutorials, and best practices. The platform is not just limited to solving problems; it's a space to showcase and discuss innovative solutions and industry insights. 📚💡

### 2. Project Collaboration

Elevate your projects by collaborating with other developers on DevFlow. Create project spaces, share code snippets, and discuss implementation details to foster a culture of collaboration and knowledge exchange. 👥🤝

### 3. Advanced Search and Filtering

Effortlessly find the information you need with our advanced search and filtering capabilities. DevFlow allows you to search not only by keywords but also by technology, programming language, and other relevant criteria, ensuring you get the most accurate and valuable results. 🔍🎯

### 4. Upvote and Downvote System

DevFlow employs a voting system that allows the community to collectively curate content. Upvote valuable contributions to highlight their significance, and downvote misleading or irrelevant information to maintain the quality of the platform. 👍👎

### 5. Gamified Learning

Engage in a gamified learning experience on DevFlow. Earn badges and reputation points as you contribute to the community, motivating you to share your knowledge and participate actively. 🏆🎮

## Getting Started

To get started with DevFlow, follow these simple steps:

1. **Create an Account:** Sign up for a DevFlow account to unlock all the features and join the vibrant developer community. 🌟

2. **Explore Content:** Dive into the vast repository of articles, tutorials, and projects. Use the search and filtering options to find content relevant to your interests. 🔍📄

3. **Contribute:** Share your knowledge by creating articles, tutorials, or collaborating on projects. Don't forget to engage with the community by commenting and providing feedback. 💬✍️

4. **Earn Reputation:** Build your reputation on DevFlow by actively participating in discussions, helping others, and contributing valuable content. Watch your badges and reputation points grow as you become an integral part of the community. 📈👏

# Installation Guide

This document provides a step-by-step guide to installing and running the application locally.

## Prerequisites

Before getting started, ensure that you have the following accounts and keys set up:

- [Clerk Account](https://clerk.dev/) for Authentication and User Management.
- [MongoDB Database](https://www.mongodb.com/) for storing data.
- [TinyMCE Account](https://www.tiny.cloud/) for rich text editing.
- [Bard API  Account]() for utilizing the Bard  API.


## Configuration

1. Create a file named `.env` in the `server` folder of the project.
2. Set the following environment variables in the `.env` file:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
    CLERK_SECRET_KEY=<your-clerk-secret-key>
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    WEBHOOK_SECRET=<your-signing-secret>
    NEXT_PUBLIC_TINY_EDITOR_API=<your-tinymce-api-key>
    MONGODB_URL=<your-mongodb-url>
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000/
    BARD_API_KEY=<bard api key>
    ```

   Replace `<your-...>` with the actual values from your respective accounts.

## Clerk Webhook

1. Go to the Clerk Dashboard.
2. Click on the "Webhooks" tab.
3. Click "Add Endpoint."
4. For the Endpoint URL, enter `http://<PASTE-YOUR-LINK-HERE>/api/webhook/clerk`.
5. For events, select "user."
6. Click "Create" to generate the webhook.
7. Retrieve the signing secret and set it as `CLERK_WEBHOOK_SECRET` in the `.env` file.

## Clone and Run Locally

To clone and run DevFlow locally, follow these instructions:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/alok-mishra143/Dev-flow.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd devflow
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

   This will start the development server, and you can access DevFlow in your browser at `http://localhost:3000`.

## Tech Stack

DevFlow is built with Next.js 14 and TypeScript. Make sure you have Node.js and npm installed on your machine before following the installation steps. 🛠️💻

## Community Guidelines

To ensure a positive and collaborative environment, please adhere to our community guidelines:

- Be respectful and considerate of others' opinions.
- Provide constructive feedback and avoid unnecessary criticism.
- Refrain from spamming or engaging in any form of malicious activity.
- Ensure your contributions align with our content guidelines. 🤝🚀
- 
![image](https://github.com/user-attachments/assets/c19e229c-98d6-4538-90c1-0759e0d07289)


Happy coding on DevFlow! 🚀🌟
